import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export function TermsPage() {
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

        <h1 className="text-2xl font-semibold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2024</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2 className="text-lg font-medium text-foreground">1. Acceptance of Terms</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            By accessing or using BuildBoard, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2 className="text-lg font-medium text-foreground">2. Use License</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Permission is granted to temporarily access the materials on BuildBoard for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on BuildBoard</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2 className="text-lg font-medium text-foreground">3. User Content</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            You retain ownership of content you submit to BuildBoard. By posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content on our platform. You are responsible for ensuring your content does not violate any laws or the rights of others.
          </p>

          <h2 className="text-lg font-medium text-foreground">4. Prohibited Activities</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            You may not use BuildBoard to:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>Distribute harmful, illegal, or offensive content</li>
            <li>Harass, abuse, or stalk other users</li>
            <li>Impersonate others or misrepresent your identity</li>
            <li>Spam or distribute unsolicited advertisements</li>
            <li>Violate any local, state, national, or international law</li>
          </ul>

          <h2 className="text-lg font-medium text-foreground">5. Content Moderation</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We reserve the right to monitor, edit, or remove any content that violates these terms or our community guidelines. Content flagged by our automated systems or reported by users may be reviewed and removed without notice.
          </p>

          <h2 className="text-lg font-medium text-foreground">6. Account Termination</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We may terminate or suspend your account at our sole discretion, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
          </p>

          <h2 className="text-lg font-medium text-foreground">7. Disclaimer</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            The materials on BuildBoard are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>

          <h2 className="text-lg font-medium text-foreground">8. Limitations</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            In no event shall BuildBoard or its suppliers be liable for any damages arising out of the use or inability to use the materials on BuildBoard, even if we have been notified of the possibility of such damage.
          </p>

          <h2 className="text-lg font-medium text-foreground">9. Revisions</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            The materials appearing on BuildBoard may include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current. We may make changes to the materials at any time without notice.
          </p>

          <h2 className="text-lg font-medium text-foreground">10. Governing Law</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
