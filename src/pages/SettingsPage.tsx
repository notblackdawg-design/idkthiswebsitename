import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "@/components/theme-provider"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

const THEMES = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
]

export function SettingsPage() {
  const { user, displayName, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const [displayNameValue, setDisplayNameValue] = useState("")
  const [savingName, setSavingName] = useState(false)
  const [nameSuccess, setNameSuccess] = useState(false)
  const [nameError, setNameError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth")
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (displayName) setDisplayNameValue(displayName)
  }, [displayName])

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setSavingName(true)
    setNameError(null)
    setNameSuccess(false)

    const { error } = await supabase.auth.updateUser({
      data: { full_name: displayNameValue.trim() },
    })

    if (error) {
      setNameError("Failed to update display name.")
    } else {
      setNameSuccess(true)
      setTimeout(() => setNameSuccess(false), 2500)
    }
    setSavingName(false)
  }

  if (authLoading || !user) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8 flex-1 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-3" />
          Feed
        </Link>

        <div className="mb-7">
          <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences.</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Appearance
            </h2>
            <div className="flex gap-2">
              {THEMES.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-2 rounded-lg border px-3 py-3 text-xs font-medium transition-all",
                    theme === value
                      ? "border-foreground/30 bg-muted text-foreground"
                      : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
          </section>

          <Separator className="bg-border/50" />

          <section>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Account
            </h2>
            <div className="space-y-1.5 mb-4">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground/70">{user.email}</p>
            </div>
            <form onSubmit={handleSaveName} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="display-name" className="text-xs text-muted-foreground">
                  Display name
                </Label>
                <Input
                  id="display-name"
                  value={displayNameValue}
                  onChange={(e) => setDisplayNameValue(e.target.value)}
                  className="bg-transparent h-9 text-sm max-w-xs"
                  maxLength={64}
                  placeholder="Your name"
                />
              </div>
              {nameError && <p className="text-xs text-destructive">{nameError}</p>}
              {nameSuccess && <p className="text-xs text-green-500">Display name updated.</p>}
              <Button
                type="submit"
                size="sm"
                disabled={savingName || !displayNameValue.trim()}
                className="h-8 text-xs"
              >
                {savingName ? "Saving..." : "Save name"}
              </Button>
            </form>
          </section>

          <Separator className="bg-border/50" />

          <section>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Danger zone
            </h2>
            <p className="text-xs text-muted-foreground mb-3">
              More security and privacy settings coming soon.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
