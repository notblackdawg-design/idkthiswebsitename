import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"

export function AuthPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [signInError, setSignInError] = useState<string | null>(null)
  const [signInLoading, setSignInLoading] = useState(false)

  const [signUpName, setSignUpName] = useState("")
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [signUpError, setSignUpError] = useState<string | null>(null)
  const [signUpLoading, setSignUpLoading] = useState(false)
  const [signUpSuccess, setSignUpSuccess] = useState(false)

  useEffect(() => {
    if (user) navigate("/")
  }, [user, navigate])

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setSignInLoading(true)
    setSignInError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email: signInEmail.trim(),
      password: signInPassword,
    })

    if (error) {
      setSignInError(error.message)
      setSignInLoading(false)
      return
    }

    navigate("/")
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setSignUpLoading(true)
    setSignUpError(null)

    const { error } = await supabase.auth.signUp({
      email: signUpEmail.trim(),
      password: signUpPassword,
      options: {
        data: { full_name: signUpName.trim() || signUpEmail.split("@")[0] },
        emailRedirectTo: window.location.origin,
      },
    })

    if (error) {
      setSignUpError(error.message)
      setSignUpLoading(false)
      return
    }

    setSignUpSuccess(true)
    setSignUpLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <Link to="/" className="text-sm font-semibold tracking-tight text-foreground">
            makra
          </Link>
        </div>
      </header>

      <main className="max-w-sm mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-3" />
          Back to feed
        </Link>

        <Tabs defaultValue="signin">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="signin" className="flex-1">Sign in</TabsTrigger>
            <TabsTrigger value="signup" className="flex-1">Create account</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="signin-email" className="text-xs text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="you@example.com"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  className="bg-transparent h-9 text-sm"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signin-password" className="text-xs text-muted-foreground">
                  Password
                </Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="bg-transparent h-9 text-sm"
                  required
                  autoComplete="current-password"
                />
              </div>
              {signInError && (
                <p className="text-xs text-destructive">{signInError}</p>
              )}
              <Button
                type="submit"
                className="w-full h-9 text-sm"
                disabled={signInLoading}
              >
                {signInLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            {signUpSuccess ? (
              <div className="text-center py-6 space-y-2">
                <p className="text-sm font-medium text-foreground">Check your email</p>
                <p className="text-xs text-muted-foreground">
                  We sent a confirmation link to{" "}
                  <span className="text-foreground">{signUpEmail}</span>.
                  Click it to activate your account.
                </p>
                <Link to="/" className="block mt-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    Back to feed
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-name" className="text-xs text-muted-foreground">
                    Display name (optional)
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Your name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="bg-transparent h-9 text-sm"
                    maxLength={64}
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-email" className="text-xs text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="bg-transparent h-9 text-sm"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-password" className="text-xs text-muted-foreground">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Min. 6 characters"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="bg-transparent h-9 text-sm"
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>
                {signUpError && (
                  <p className="text-xs text-destructive">{signUpError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full h-9 text-sm"
                  disabled={signUpLoading}
                >
                  {signUpLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
