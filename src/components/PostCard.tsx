import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, Sparkles, Loader as Loader2, MoveVertical as MoreVertical } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProfileModal } from "@/components/ProfileModal"
import { ReportModal } from "@/components/ReportModal"
import type { Post, Profile } from "@/lib/supabase"
import { TAG_COLORS } from "@/lib/tag-colors"
import { supabase } from "@/lib/supabase"
import { getSignedUrl } from "@/lib/media-upload"
import { useAuth } from "@/hooks/use-auth"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth()
  const author = post.show_anonymous ? "Anonymous" : (post.author_name?.trim() || "Anonymous")
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [explaining, setExplaining] = useState(false)
  const [explainError, setExplainError] = useState<string | null>(null)

  const [signedMediaUrl, setSignedMediaUrl] = useState<string | null>(null)

  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [authorProfile, setAuthorProfile] = useState<Profile | null>(null)

  const [reportOpen, setReportOpen] = useState(false)
  const [hasBlocked, setHasBlocked] = useState(false)

  // Get signed URL for private media
  useEffect(() => {
    if (post.media_url && !post.media_url.startsWith("http")) {
      getSignedUrl(post.media_url).then((url) => {
        if (url) setSignedMediaUrl(url)
      })
    }
  }, [post.media_url])

  async function fetchExplanation() {
    setExplaining(true)
    setExplainError(null)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/explain-post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token ?? import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            "Apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ title: post.title, description: post.description }),
        }
      )
      const json = await res.json()
      if (!res.ok || json.error) {
        setExplainError(json.error ?? "Failed to explain. Try again.")
      } else {
        setExplanation(json.explanation)
      }
    } catch {
      setExplainError("Network error. Please try again.")
    } finally {
      setExplaining(false)
    }
  }

  function handleExplain(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDialogOpen(true)
    if (!explanation) fetchExplanation()
  }

  async function handleAuthorClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!post.user_id || post.show_anonymous) return

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", post.user_id)
      .maybeSingle()

    if (profile) {
      setAuthorProfile(profile)
      setProfileModalOpen(true)
    }
  }

  async function handleBlock() {
    if (!user || !post.user_id) return

    await supabase.from("blocks").insert({
      blocker_id: user.id,
      blocked_id: post.user_id,
    })
    setHasBlocked(true)
  }

  const mediaUrl = signedMediaUrl || post.media_url
  const isVideo = post.media_url?.match(/\.(mp4|webm|ogg)$/i)

  return (
    <>
      <article className="border border-border rounded-lg px-5 py-4 bg-card hover:bg-card/80 hover:border-border/80 transition-all duration-150">
        <Link to={`/post/${post.id}`} className="block group">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className={`text-xs font-medium border-0 px-2 py-0.5 ${TAG_COLORS[post.tag]}`}
            >
              {post.tag}
            </Badge>
          </div>
          <h2 className="text-sm font-medium text-foreground leading-snug group-hover:text-foreground/90 line-clamp-2">
            {post.title}
          </h2>
          {post.description && (
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {post.description}
            </p>
          )}
          {mediaUrl && (
            <div className="mt-3 rounded-md overflow-hidden border border-border/50 max-h-48">
              {isVideo ? (
                <video
                  src={mediaUrl}
                  className="w-full max-h-48 object-cover"
                  muted
                  preload="metadata"
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt={post.title}
                  className="w-full max-h-48 object-cover"
                  loading="lazy"
                />
              )}
            </div>
          )}
        </Link>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <button
              onClick={handleAuthorClick}
              className={`font-medium ${post.user_id && !post.show_anonymous ? "hover:text-foreground hover:underline cursor-pointer" : "cursor-default"}`}
            >
              {author}
            </button>
            <span className="text-muted-foreground/50">·</span>
            <span>{timeAgo}</span>
            <span className="text-muted-foreground/50">·</span>
            <Link to={`/post/${post.id}`} className="flex items-center gap-1 hover:text-foreground transition-colors">
              <MessageSquare className="size-3" />
              {post.comment_count ?? 0}
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExplain}
              className="h-6 px-2 text-xs text-muted-foreground/70 hover:text-foreground gap-1 shrink-0"
            >
              <Sparkles className="size-3" />
              Explain
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-muted-foreground/70 hover:text-foreground shrink-0"
                >
                  <MoreVertical className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setReportOpen(true)
                  }}
                  className="text-xs cursor-pointer"
                >
                  Report post
                </DropdownMenuItem>
                {user && post.user_id && user.id !== post.user_id && !post.show_anonymous && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleBlock()
                    }}
                    className="text-xs cursor-pointer"
                  >
                    {hasBlocked ? "User blocked" : "Block user"}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </article>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm">
              <Sparkles className="size-4 text-muted-foreground" />
              Plain English
            </DialogTitle>
          </DialogHeader>
          <div className="pt-1">
            <p className="text-xs text-muted-foreground mb-3 line-clamp-1 font-medium">{post.title}</p>
            {explaining ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-3">
                <Loader2 className="size-4 animate-spin" />
                Generating explanation...
              </div>
            ) : explainError ? (
              <div className="space-y-3">
                <p className="text-sm text-destructive">{explainError}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => { setExplanation(null); fetchExplanation() }}
                >
                  Try again
                </Button>
              </div>
            ) : explanation ? (
              <p className="text-sm text-foreground leading-relaxed">{explanation}</p>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <ProfileModal
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
        profile={authorProfile}
      />

      <ReportModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        contentType="post"
        contentId={post.id}
        reportedUserId={post.user_id ?? undefined}
      />
    </>
  )
}
