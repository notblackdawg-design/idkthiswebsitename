import { Link } from "react-router-dom"
import { Plus, User, LogOut, LayoutGrid, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"

export function Header() {
  const { user, displayName, signOut } = useAuth()

  const initials = displayName
    ? displayName.slice(0, 2).toUpperCase()
    : "?"

  return (
    <header className="border-b border-border/50 sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-tight text-foreground">
          makra
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/submit">
            <Button size="sm" className="gap-1.5 h-7 text-xs">
              <Plus className="size-3" />
              Share
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="size-7 rounded-full bg-muted border border-border/60 flex items-center justify-center text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                  {initials}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <div className="px-2 py-1.5">
                  <p className="text-xs font-medium text-foreground truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <LayoutGrid className="size-3.5" />
                    My posts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="size-3.5" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={signOut}
                  className="flex items-center gap-2 text-muted-foreground cursor-pointer"
                >
                  <LogOut className="size-3.5" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground gap-1.5">
                <User className="size-3" />
                Log in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
