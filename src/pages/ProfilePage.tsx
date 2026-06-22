import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { supabase, type Post } from "@/lib/supabase"
import { TAG_COLORS } from "@/lib/tag-colors"
import { useAuth } from "@/hooks/use-auth"

export function ProfilePage() {
  const { user, displayName, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth")
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (!user) return

    async function load() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })

      setPosts(data ?? [])
      setLoading(false)
    }

    load()
  }, [user])

  async function deletePost(postId: string) {
    await supabase.from("posts").delete().eq("id", postId)
    setPosts((prev) => prev.filter((p) => p.id !== postId))
  }

  if (authLoading || !user) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="mb-7">
          <h1 className="text-xl font-semibold tracking-tight">{displayName || "Your posts"}</h1>
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border border-border rounded-lg p-5 space-y-3">
                <Skeleton className="h-3 w-16 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm mb-4">You haven't posted anything yet.</p>
            <Link to="/submit">
              <Button variant="outline" size="sm">Share your first post</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group border border-border rounded-lg px-5 py-4 bg-card hover:bg-card/80 transition-all duration-150"
              >
                <div className="flex items-start justify-between gap-3">
                  <Link to={`/post/${post.id}`} className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium border-0 px-2 py-0.5 ${TAG_COLORS[post.tag]}`}
                      >
                        {post.tag}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </p>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity size-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 mt-0.5">
                        <Trash2 className="size-3.5" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete post?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the post and all its comments.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => deletePost(post.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
