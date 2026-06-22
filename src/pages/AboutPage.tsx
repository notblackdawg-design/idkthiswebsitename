import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-12 flex-1 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="size-3" />
          Feed
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-4">About Makra</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Makra is a live public feed for builders and creators to share what they're
              working on — no polish required. Post a title, a tag, and a description of
              your project at any stage, and let others see what you're making in real time.
            </p>
          </div>

          <div className="border-t border-border/50 pt-8">
            <h2 className="text-sm font-semibold mb-3 text-foreground">How it works</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Post what you're building, no account needed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Tag it by category to help others find it
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Get an AI-powered plain English explanation of any post
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Leave comments and connect with other builders
              </li>
            </ul>
          </div>

          <div className="border-t border-border/50 pt-8">
            <p className="text-xs text-muted-foreground/60">Built for builders, by builders.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
