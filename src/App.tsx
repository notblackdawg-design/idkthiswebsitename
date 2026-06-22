import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/hooks/use-auth"
import { HomePage } from "@/pages/HomePage"
import { PostDetailPage } from "@/pages/PostDetailPage"
import { SubmitPage } from "@/pages/SubmitPage"
import { AuthPage } from "@/pages/AuthPage"
import { ProfilePage } from "@/pages/ProfilePage"
import { AboutPage } from "@/pages/AboutPage"
import { SettingsPage } from "@/pages/SettingsPage"

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
