import { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PostCard } from "@/components/PostCard"
import { supabase, TAGS, type Post, type Tag } from "@/lib/supabase"
import { TAG_COLORS } from "@/lib/tag-colors"
import { cn } from "@/lib/utils"

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState<Tag | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchPosts = useCallback(async () => {
    let query = supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (activeTag) {
      query = query.eq("tag", activeTag)
    }

    const { data: postsData, error } = await query

    if (error || !postsData) return

    const postIds = postsData.map((p) => p.id)
    const { data: commentCounts } = await supabase
      .from("comments")
      .select("post_id")
      .in("post_id", postIds)

    const countMap: Record<string, number> = {}
    commentCounts?.forEach((c) => {
      countMap[c.post_id] = (countMap[c.post_id] ?? 0) + 1
    })

    setPosts(
      postsData.map((p) => ({
        ...p,
        comment_count: countMap[p.id] ?? 0,
      }))
    )
    setLastRefresh(new Date())
    setLoading(false)
  }, [activeTag])

  useEffect(() => {
    setLoading(true)
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPosts()
    }, 30_000)
    return () => clearInterval(interval)
  }, [fetchPosts])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl font-semibold tracking-tight">Live Feed</h1>
            <button
              onClick={fetchPosts}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="size-3" />
              <span>
                {lastRefresh.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Builders and creators sharing what they're working on.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-6">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
              activeTag === null
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                activeTag === tag
                  ? `${TAG_COLORS[tag]} ring-1 ring-current/20`
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border border-border rounded-lg p-5 space-y-3">
                <Skeleton className="h-3 w-16 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex gap-3 pt-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">No posts yet.</p>
            <Link to="/submit">
              <Button variant="outline" size="sm" className="mt-4">
                Be the first to share
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
