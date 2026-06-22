import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="border-t border-border/30 mt-16">
      <div className="max-w-2xl mx-auto px-4 py-6 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-muted-foreground/60">Makra — built for builders</p>
        <div className="flex items-center gap-4">
          <Link to="/about" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}
