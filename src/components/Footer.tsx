import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="border-t border-border/30 mt-16">
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-muted-foreground/60">BuildBoard — built for builders</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              About
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
        <p className="text-xs text-muted-foreground/50">
          By using BuildBoard in any way, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-muted-foreground">Terms of Service</Link>,{" "}
          <Link to="/privacy" className="underline hover:text-muted-foreground">Privacy Policy</Link>, and{" "}
          <Link to="/cookies" className="underline hover:text-muted-foreground">Cookie Policy</Link>.
        </p>
      </div>
    </footer>
  )
}
