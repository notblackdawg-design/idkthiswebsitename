import * as React from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

type AuthContextValue = {
  user: User | null
  loading: boolean
  displayName: string
  signOut: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  loading: true,
  displayName: "",
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const signOut = React.useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? ""

  const value = React.useMemo(
    () => ({ user, loading, displayName, signOut }),
    [user, loading, displayName, signOut]
  )

  return React.createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  return React.useContext(AuthContext)
}
