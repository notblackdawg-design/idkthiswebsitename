import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

type RateLimitAction = 'post' | 'comment' | 'ai_explain'

interface RateLimitState {
  limited: boolean
  remaining: number
  resetAt: Date | null
  loading: boolean
}

interface RateLimitResult {
  allowed: boolean
  remaining?: number
  resetAt?: Date
  error?: string
}

const LIMITS: Record<RateLimitAction, { max: number; windowMs: number }> = {
  post: { max: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour
  comment: { max: 20, windowMs: 60 * 60 * 1000 }, // 20 per hour
  ai_explain: { max: 10, windowMs: 60 * 60 * 1000 }, // 10 per hour
}

export function useRateLimit() {
  const [state, setState] = useState<RateLimitState>({
    limited: false,
    remaining: 0,
    resetAt: null,
    loading: false,
  })

  const checkRateLimit = useCallback(async (action: RateLimitAction): Promise<RateLimitResult> => {
    setState((prev) => ({ ...prev, loading: true }))

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const identifier = session?.user?.id || 'anonymous'

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rate-limit-check`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token ?? import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ action, identifier }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        const error = data.error || 'Rate limit check failed'
        setState((prev) => ({ ...prev, loading: false }))
        return { allowed: false, error }
      }

      const limit = LIMITS[action]
      const remaining = Math.max(0, limit.max - (data.count || 0))
      const resetAt = data.resetAt ? new Date(data.resetAt) : null
      const limited = remaining === 0

      setState({
        limited,
        remaining,
        resetAt,
        loading: false,
      })

      return {
        allowed: !limited,
        remaining,
        resetAt,
      }
    } catch {
      setState((prev) => ({ ...prev, loading: false }))
      return { allowed: true } // Fail open
    }
  }, [])

  const getTimeUntilReset = useCallback((): string | null => {
    if (!state.resetAt) return null

    const now = new Date()
    const diff = state.resetAt.getTime() - now.getTime()

    if (diff <= 0) return null

    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)

    if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? '' : 's'}`
    }
    return `${seconds} seconds`
  }, [state.resetAt])

  return {
    ...state,
    checkRateLimit,
    getTimeUntilReset,
  }
}

export function formatRateLimitMessage(action: RateLimitAction, timeUntilReset: string | null): string {
  const actionName = action === 'ai_explain' ? 'AI explanations' : `${action}s`
  const time = timeUntilReset || 'a while'
  return `You've reached the limit for ${actionName}. Please wait ${time} before trying again.`
}
