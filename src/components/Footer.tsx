import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="border-t border-border/30 mt-16">
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-muted-foreground/60">BuildBoard — built for builders</p>
          <div className="flex items-center gap-3 flex-wrap">
            <Link to="/terms" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Cookie Policy
            </Link>
            <Link to="/guidelines" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Community Guidelines
            </Link>
            <Link to="/copyright" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Copyright Policy
            </Link>
            <Link to="/aup" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Acceptable Use Policy
            </Link>
            <Link to="/about" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              About
            </Link>
          </div>
        </div>
        <p className="text-xs text-muted-foreground/50 text-center">
          By using BuildBoard in any way, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-muted-foreground">Terms of Service</Link>,{" "}
          <Link to="/privacy" className="underline hover:text-muted-foreground">Privacy Policy</Link>,{" "}
          <Link to="/cookies" className="underline hover:text-muted-foreground">Cookie Policy</Link>,{" "}
          <Link to="/guidelines" className="underline hover:text-muted-foreground">Community Guidelines</Link>,{" "}
          <Link to="/copyright" className="underline hover:text-muted-foreground">Copyright Policy</Link>, and{" "}
          <Link to="/aup" className="underline hover:text-muted-foreground">Acceptable Use Policy</Link>.
        </p>
      </div>
    </footer>
  )
}
