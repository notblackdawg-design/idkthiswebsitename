import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export function CookiesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8 flex-1 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-3" />
          Back to feed
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight mb-2">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2024</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2 className="text-lg font-medium text-foreground">What Are Cookies?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and provide a better user experience.
          </p>

          <h2 className="text-lg font-medium text-foreground">How We Use Cookies</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            BuildBoard uses cookies and similar technologies for the following purposes:
          </p>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Essential Cookies</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            These cookies are necessary for the website to function properly. They enable basic features like:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>User authentication and session management</li>
            <li>Security and fraud prevention</li>
            <li>Remembering your preferences</li>
          </ul>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Functional Cookies</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            These cookies enhance your experience by remembering choices you make:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>Theme preference (light/dark mode)</li>
            <li>Language settings</li>
            <li>Guest user identifiers</li>
          </ul>

          <h3 className="text-base font-medium text-foreground mt-4 mb-2">Analytics Cookies</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We may use analytics services to understand how users interact with our platform. This helps us improve our services and fix issues.
          </p>

          <h2 className="text-lg font-medium text-foreground">Local Storage</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            In addition to cookies, we use local storage to store:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>Guest user identifiers (for anonymous posting)</li>
            <li>Last activity timestamps (for session management)</li>
            <li>User interface preferences</li>
          </ul>

          <h2 className="text-lg font-medium text-foreground">Third-Party Cookies</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Some cookies may be set by third-party services we use, such as:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>Authentication providers</li>
            <li>Content delivery networks</li>
            <li>Analytics platforms</li>
          </ul>

          <h2 className="text-lg font-medium text-foreground">Managing Cookies</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            You can control cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>View and delete cookies</li>
            <li>Block cookies from specific sites</li>
            <li>Block all third-party cookies</li>
            <li>Block all cookies entirely</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Please note that blocking or deleting cookies may affect the functionality of BuildBoard and limit your ability to use certain features.
          </p>

          <h2 className="text-lg font-medium text-foreground">Session Cookies vs. Persistent Cookies</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            <strong>Session cookies</strong> are temporary and expire when you close your browser. We use these for active session management.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            <strong>Persistent cookies</strong> remain on your device for a set period or until manually deleted. We use these for remembering preferences across sessions.
          </p>

          <h2 className="text-lg font-medium text-foreground">Security</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We implement appropriate security measures to protect against unauthorized access to cookies and local storage data. All authentication cookies are transmitted over secure HTTPS connections.
          </p>

          <h2 className="text-lg font-medium text-foreground">Updates to This Policy</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>

          <h2 className="text-lg font-medium text-foreground">Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you have questions about our use of cookies, please contact us through our platform.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
