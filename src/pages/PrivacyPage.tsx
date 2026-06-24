import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export function PrivacyPage() {
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

        <h1 className="text-2xl font-semibold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2024</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2 className="text-lg font-medium text-foreground">1. Information We Collect</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We collect information you provide directly to us, such as when you create an account, post content, or contact us. This includes:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>Account information (email address, username, password)</li>
            <li>Profile information (display name, bio, avatar, social links)</li>
            <li>Content you post (posts, comments, media)</li>
            <li>Communications with us</li>
          </ul>

          <h2 className="text-lg font-medium text-foreground">2. Automatically Collected Information</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            When you use BuildBoard, we may automatically collect:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>Device information (browser type, operating system)</li>
            <li>Log data (IP address, access times, pages viewed)</li>
            <li>Cookies and similar tracking technologies</li>
            <li>Anonymous identifiers for guest users</li>
          </ul>

          <h2 className="text-lg font-medium text-foreground">3. How We Use Your Information</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>Provide, maintain, and improve our services</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect and prevent fraud, abuse, and security issues</li>
          </ul>

          <h2 className="text-lg font-medium text-foreground">4. Information Sharing</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We do not sell your personal information. We may share your information in the following situations:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>With your consent</li>
            <li>With service providers who assist in operating our platform</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights, privacy, safety, or property</li>
          </ul>

          <h2 className="text-lg font-medium text-foreground">5. Data Retention</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data through your account settings.
          </p>

          <h2 className="text-lg font-medium text-foreground">6. Your Privacy Controls</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            You have control over your privacy on BuildBoard:
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
            <li>Make your profile public or private</li>
            <li>Post anonymously</li>
            <li>Choose whether to display your real name</li>
            <li>Block other users from viewing your content</li>
            <li>Download or delete your data</li>
          </ul>

          <h2 className="text-lg font-medium text-foreground">7. Data Security</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-lg font-medium text-foreground">8. Third-Party Services</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
          </p>

          <h2 className="text-lg font-medium text-foreground">9. Children's Privacy</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            BuildBoard is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us.
          </p>

          <h2 className="text-lg font-medium text-foreground">10. Changes to This Policy</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-lg font-medium text-foreground">11. Contact Us</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you have questions about this Privacy Policy, please contact us through our platform.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
