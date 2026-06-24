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
            <h1 className="text-2xl font-semibold tracking-tight mb-4">About BuildBoard</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              BuildBoard is a live public feed where builders and creators share what they're
              working on — no polish required. Share your project at any stage, connect with
              fellow creators, and discover what others are building in real time.
            </p>
          </div>

          <div className="border-t border-border/50 pt-8">
            <h2 className="text-sm font-semibold mb-3 text-foreground">What makes BuildBoard different</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Share your work in progress, finished projects, or just ideas
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                No account required to post or comment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                AI-powered plain English explanations for technical posts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Organize your posts with tags: Code, Design, Music, Art, Writing, Game, Other
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Create a public profile to showcase your work
              </li>
            </ul>
          </div>

          <div className="border-t border-border/50 pt-8">
            <h2 className="text-sm font-semibold mb-3 text-foreground">For thecommunity</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              BuildBoard is built for anyone who creates — developers, designers, musicians,
              artists, writers, game developers, and everyone in between. Whether you're
              building a side project, working on your craft, or just sharing something
              cool, this is your space to connect.
            </p>
          </div>

          <div className="border-t border-border/50 pt-8">
            <h2 className="text-sm font-semibold mb-3 text-foreground">Privacy & Safety</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Post anonymously or with your identity
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Control your profile visibility and privacy settings
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Block and report users who violate our community standards
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 shrink-0 mt-0.5">—</span>
                Automated content moderation to keep the feed clean
              </li>
            </ul>
          </div>

          <div className="border-t border-border/50 pt-8">
            <h2 className="text-sm font-semibold mb-3 text-foreground">Open & Accessible</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We believe the best communities are open to everyone. That's why you can
              browse, post, and comment without creating an account. Sign up only if you
              want a persistent identity and profile.
            </p>
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
