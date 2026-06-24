import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const REJECT_THRESHOLD = 0.85;
const FLAG_THRESHOLD = 0.70;

interface ModerationResult {
  allowed: boolean;
  flagged: boolean;
  reason?: string;
  scores?: Record<string, number>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { content } = await req.json();

    if (!content?.trim()) {
      return new Response(JSON.stringify({
        error: "Content is required"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check banned words first (lower priority, no API cost)
    const { data: bannedWords } = await supabase
      .from("banned_words")
      .select("word")
      .eq("is_active", true);

    if (bannedWords && bannedWords.length > 0) {
      const lowerContent = content.toLowerCase();
      const matchedWord = bannedWords.find((w) =>
        lowerContent.includes(w.word.toLowerCase())
      );

      if (matchedWord) {
        return new Response(JSON.stringify({
          allowed: false,
          flagged: false,
          reason: "Content contains prohibited language"
        } as ModerationResult), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Check Perspective API if configured
    const perspectiveKey = Deno.env.get("PERSPECTIVE_API_KEY");
    if (!perspectiveKey) {
      // No API key, allow content
      return new Response(JSON.stringify({
        allowed: true,
        flagged: false
      } as ModerationResult), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Call Perspective API
    const perspectiveRes = await fetch(
      `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${perspectiveKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: { text: content },
          requestedAttributes: {
            TOXICITY: {},
            SEVERE_TOXICITY: {},
            IDENTITY_ATTACK: {},
            INSULT: {},
            THREAT: {},
          },
          languages: ["en"],
        }),
      }
    );

    if (!perspectiveRes.ok) {
      console.error("Perspective API error:", await perspectiveRes.text());
      // Fail open - allow content if API unavailable
      return new Response(JSON.stringify({
        allowed: true,
        flagged: false
      } as ModerationResult), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const perspectiveData = await perspectiveRes.json();
    const scores: Record<string, number> = {};

    for (const [attr, data] of Object.entries(perspectiveData.attributeScores || {})) {
      scores[attr] = (data as any)?.summaryScore?.value || 0;
    }

    const maxScore = Math.max(...Object.values(scores), 0);

    if (maxScore >= REJECT_THRESHOLD) {
      return new Response(JSON.stringify({
        allowed: false,
        flagged: false,
        reason: "Content appears to violate our guidelines",
        scores
      } as ModerationResult), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (maxScore >= FLAG_THRESHOLD) {
      return new Response(JSON.stringify({
        allowed: true,
        flagged: true,
        scores
      } as ModerationResult), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      allowed: true,
      flagged: false,
      scores
    } as ModerationResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Moderation error:", error);
    return new Response(JSON.stringify({
      error: "Moderation check failed"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
