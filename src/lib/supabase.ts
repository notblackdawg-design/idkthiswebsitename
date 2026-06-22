import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tag = "Code" | "Design" | "Music" | "Art" | "Writing" | "Game" | "Other"

export const TAGS: Tag[] = ["Code", "Design", "Music", "Art", "Writing", "Game", "Other"]

export interface Post {
  id: string
  title: string
  description: string | null
  media_url: string | null
  tag: Tag
  author_name: string | null
  user_id: string | null
  created_at: string
  comment_count?: number
}

export interface Comment {
  id: string
  post_id: string
  content: string
  author_name: string | null
  user_id: string | null
  created_at: string
}
