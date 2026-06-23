import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const LIMITS: Record<string, { max: number; windowMs: number }> = {
  post: { max: 5, windowMs: 60 * 60 * 1000 },
  comment: { max: 20, windowMs: 60 * 60 * 1000 },
  ai_explain: { max: 10, windowMs: 60 * 60 * 1000 },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { action, identifier } = await req.json();

    if (!action || !LIMITS[action]) {
      return new Response(JSON.stringify({ error: "Invalid action type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!identifier) {
      return new Response(JSON.stringify({ error: "Identifier required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const limit = LIMITS[action];
    const now = new Date();
    const windowStart = new Date(now.getTime() - limit.windowMs);

    // Clean up old entries
    await supabase
      .from("rate_limits")
      .delete()
      .lt("window_start", windowStart.toISOString());

    // Get current count
    const { data: existing } = await supabase
      .from("rate_limits")
      .select("id, request_count, window_start")
      .eq("identifier", identifier)
      .eq("action_type", action)
      .gte("window_start", windowStart.toISOString())
      .order("window_start", { ascending: false })
      .limit(1)
      .maybeSingle();

    let count = existing?.request_count || 0;
    let resetAt: string;

    if (existing) {
      count = existing.request_count;
      resetAt = new Date(
        new Date(existing.window_start).getTime() + limit.windowMs
      ).toISOString();
    } else {
      resetAt = new Date(now.getTime() + limit.windowMs).toISOString();
    }

    const allowed = count < limit.max;

    // If allowed, increment the counter
    if (allowed) {
      if (existing) {
        await supabase
          .from("rate_limits")
          .update({ request_count: count + 1 })
          .eq("id", existing.id);
        count++;
      } else {
        await supabase.from("rate_limits").insert({
          identifier,
          action_type: action,
          request_count: 1,
          window_start: now.toISOString(),
        });
        count = 1;
      }
    }

    return new Response(
      JSON.stringify({
        allowed,
        count,
        max: limit.max,
        remaining: Math.max(0, limit.max - count),
        resetAt,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
