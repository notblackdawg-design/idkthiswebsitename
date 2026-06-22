import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { supabase, TAGS, type Tag } from "@/lib/supabase"
import { TAG_COLORS } from "@/lib/tag-colors"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

export function SubmitPage() {
  const navigate = useNavigate()
  const { user, displayName } = useAuth()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tag, setTag] = useState<Tag>("Code")
  const [authorName, setAuthorName] = useState("")
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (displayName) setAuthorName(displayName)
  }, [displayName])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Max size is 10MB.")
      return
    }

    setMediaFile(file)
    setMediaPreview(URL.createObjectURL(file))
    setError(null)
  }

  function removeMedia() {
    setMediaFile(null)
    if (mediaPreview) URL.revokeObjectURL(mediaPreview)
    setMediaPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    setSubmitting(true)
    setError(null)

    let mediaUrl: string | null = null

    if (mediaFile) {
      const ext = mediaFile.name.split(".").pop()
      const fileName = `${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(fileName, mediaFile)

      if (uploadError) {
        setError("Failed to upload media. Please try again.")
        setSubmitting(false)
        return
      }

      const { data: urlData } = supabase.storage.from("media").getPublicUrl(fileName)
      mediaUrl = urlData.publicUrl
    }

    const { data, error: insertError } = await supabase
      .from("posts")
      .insert({
        title: title.trim(),
        description: description.trim() || null,
        media_url: mediaUrl,
        tag,
        author_name: authorName.trim() || null,
        user_id: user?.id ?? null,
      })
      .select()
      .single()

    if (insertError || !data) {
      setError("Failed to submit. Please try again.")
      setSubmitting(false)
      return
    }

    navigate(`/post/${data.id}`)
  }

  const isVideo = mediaFile?.type.startsWith("video/")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8 flex-1 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-3" />
          Feed
        </Link>

        <div className="mb-7">
          <h1 className="text-xl font-semibold tracking-tight">Share what you're building</h1>
          <p className="text-sm text-muted-foreground mt-1">
            No account needed. Just share your work.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="title" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                What are you working on? <span className="text-destructive">*</span>
              </Label>
              <span className={`text-xs tabular-nums transition-colors ${title.length >= 90 ? "text-destructive" : "text-muted-foreground/40"}`}>
                {title.length}/100
              </span>
            </div>
            <Input
              id="title"
              placeholder="e.g. Building a Rust compiler frontend"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent h-10 text-sm"
              maxLength={100}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              More detail (optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Share more about what you're making, what stage you're at, or what's interesting about it..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-transparent text-sm resize-none min-h-24"
              maxLength={2000}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Tag <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                    tag === t
                      ? `${TAG_COLORS[t]} border-current/20 ring-1 ring-current/20`
                      : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Media (optional)
            </Label>
            {mediaPreview ? (
              <div className="relative rounded-lg overflow-hidden border border-border/50">
                {isVideo ? (
                  <video src={mediaPreview} className="w-full max-h-64 object-contain bg-black" controls />
                ) : (
                  <img src={mediaPreview} alt="Preview" className="w-full max-h-64 object-contain" />
                )}
                <button
                  type="button"
                  onClick={removeMedia}
                  className="absolute top-2 right-2 size-6 rounded-full bg-background/80 border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X className="size-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border border-dashed border-border/60 rounded-lg py-8 flex flex-col items-center gap-2 text-muted-foreground hover:border-border hover:text-foreground transition-colors"
              >
                <ImageIcon className="size-5" />
                <span className="text-xs">Click to upload image or video</span>
                <span className="text-xs text-muted-foreground/60">Max 10MB</span>
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Your name (optional)
            </Label>
            <Input
              id="author"
              placeholder="Anonymous"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="bg-transparent h-10 text-sm"
              maxLength={64}
              readOnly={!!user}
            />
            {user && (
              <p className="text-xs text-muted-foreground">Posting as your account</p>
            )}
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={submitting || !title.trim()} className="h-9 text-sm">
              {submitting ? "Publishing..." : "Publish to feed"}
            </Button>
            <Link to="/">
              <Button type="button" variant="ghost" size="sm" className="h-9 text-sm text-muted-foreground">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
