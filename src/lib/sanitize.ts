/**
 * Strip HTML tags and sanitize text input to prevent XSS
 */
export function sanitizeText(text: string): string {
  return text
    // Strip HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script-related content
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, '')
    // Remove control characters
    .replace(/[\x00-\x1F\x7F]/g, '')
    // Normalize whitespace
    .trim()
}

/**
 * Validate and sanitize post title
 */
export function sanitizeTitle(title: string): { valid: boolean; value: string; error?: string } {
  const sanitized = sanitizeText(title)
  const trimmed = sanitized.trim()

  if (!trimmed) {
    return { valid: false, value: '', error: 'Title is required' }
  }

  if (trimmed.length > 100) {
    return { valid: false, value: trimmed, error: 'Title must be 100 characters or less' }
  }

  return { valid: true, value: trimmed }
}

/**
 * Validate and sanitize post description
 */
export function sanitizeDescription(desc: string | null): { valid: boolean; value: string | null; error?: string } {
  if (!desc) {
    return { valid: true, value: null }
  }

  const sanitized = sanitizeText(desc)
  const trimmed = sanitized.trim()

  if (!trimmed) {
    return { valid: true, value: null }
  }

  if (trimmed.length > 1000) {
    return { valid: false, value: trimmed, error: 'Description must be 1000 characters or less' }
  }

  return { valid: true, value: trimmed }
}

/**
 * Validate and sanitize comment content
 */
export function sanitizeComment(content: string): { valid: boolean; value: string; error?: string } {
  const sanitized = sanitizeText(content)
  const trimmed = sanitized.trim()

  if (!trimmed) {
    return { valid: false, value: '', error: 'Comment is required' }
  }

  if (trimmed.length > 500) {
    return { valid: false, value: trimmed, error: 'Comment must be 500 characters or less' }
  }

  return { valid: true, value: trimmed }
}

/**
 * Validate display name: 3-20 chars, letters, numbers, underscores only
 */
export function validateDisplayName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim()

  if (!trimmed) {
    return { valid: false, error: 'Display name is required' }
  }

  if (trimmed.length < 3) {
    return { valid: false, error: 'Display name must be at least 3 characters' }
  }

  if (trimmed.length > 20) {
    return { valid: false, error: 'Display name must be 20 characters or less' }
  }

  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return { valid: false, error: 'Display name can only contain letters, numbers, and underscores' }
  }

  return { valid: true }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim().toLowerCase()

  if (!trimmed) {
    return { valid: false, error: 'Email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address' }
  }

  return { valid: true }
}

/**
 * Password strength requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character
 */
export function validatePassword(password: string): { valid: boolean; error?: string; strength: 'weak' | 'medium' | 'strong' } {
  if (!password) {
    return { valid: false, error: 'Password is required', strength: 'weak' }
  }

  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters', strength: 'weak' }
  }

  let score = 0

  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++

  const strength = score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong'

  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!hasUpper || !hasNumber || !hasSpecial) {
    const missing: string[] = []
    if (!hasUpper) missing.push('an uppercase letter')
    if (!hasNumber) missing.push('a number')
    if (!hasSpecial) missing.push('a special character')
    return { valid: false, error: `Password must include ${missing.join(', ')}`, strength }
  }

  return { valid: true, strength }
}

/**
 * Get password strength color for UI
 */
export function getPasswordStrengthColor(strength: 'weak' | 'medium' | 'strong'): string {
  switch (strength) {
    case 'weak':
      return 'bg-red-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'strong':
      return 'bg-green-500'
  }
}

/**
 * Get password strength label
 */
export function getPasswordStrengthLabel(strength: 'weak' | 'medium' | 'strong'): string {
  return strength.charAt(0).toUpperCase() + strength.slice(1)
}

/**
 * Sanitize bio text
 */
export function sanitizeBio(bio: string | null): { valid: boolean; value: string | null; error?: string } {
  if (!bio) {
    return { valid: true, value: null }
  }

  const sanitized = sanitizeText(bio)
  const trimmed = sanitized.trim()

  if (!trimmed) {
    return { valid: true, value: null }
  }

  if (trimmed.length > 150) {
    return { valid: false, value: trimmed, error: 'Bio must be 150 characters or less' }
  }

  return { valid: true, value: trimmed }
}
