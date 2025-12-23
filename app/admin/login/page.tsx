"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, User, Loader2 } from "lucide-react"

export default function AdminLoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        // Simulate network delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Check credentials
        if (formData.username === "admin" && formData.password === "Sareesansar@1234") {
            // Set session cookie
            document.cookie = "admin_session=authenticated; path=/; max-age=86400" // 24 hours
            localStorage.setItem("admin_logged_in", "true")
            router.push("/admin")
            router.refresh()
        } else {
            setError("Invalid username or password")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Beautiful Maroon/Gold Gradient Background matching Logo colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#800020] via-[#9B1B30] to-[#C9A227]">
                {/* Floating Decorative Orbs */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-[#C9A227]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#800020]/30 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-[#FFD700]/10 rounded-full blur-2xl animate-pulse delay-500" />
                <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-white/5 rounded-full blur-3xl" />

                {/* Traditional Indian Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.6'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Decorative side elements */}
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-[#C9A227] via-[#FFD700] to-[#C9A227]" />
            <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-[#C9A227] via-[#FFD700] to-[#C9A227]" />

            {/* Login Card */}
            <Card className="w-full max-w-md mx-4 relative z-10 bg-white/98 backdrop-blur-xl shadow-2xl border-0 overflow-hidden">
                {/* Gold accent bar at top */}
                <div className="h-2 bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#C9A227]" />

                <CardHeader className="text-center space-y-6 pb-2 pt-8">
                    {/* Actual Logo */}
                    <div className="mx-auto w-28 h-28 rounded-full overflow-hidden shadow-xl border-4 border-[#C9A227]/30 transition-transform duration-300 hover:scale-105">
                        <img
                            src="/logo.png"
                            alt="Saree Sansar Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <CardTitle className="text-3xl font-serif text-[#800020]">
                            Saree Sansar
                        </CardTitle>
                        <p className="text-sm text-[#C9A227] font-semibold mt-1">The Women's World</p>
                        <CardDescription className="text-base mt-3 text-gray-600">
                            Admin Dashboard
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="pt-6 pb-8 px-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center animate-shake">
                                {error}
                            </div>
                        )}

                        {/* Username Field */}
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-gray-700 font-medium">
                                Username
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C9A227]" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="pl-11 h-12 border-gray-200 focus:border-[#800020] focus:ring-[#800020]/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C9A227]" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="pl-11 pr-11 h-12 border-gray-200 focus:border-[#800020] focus:ring-[#800020]/20 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#800020] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-gradient-to-r from-[#800020] to-[#9B1B30] hover:from-[#600018] hover:to-[#800020] text-white font-semibold text-base shadow-lg shadow-[#800020]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#800020]/40 hover:-translate-y-0.5"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In to Dashboard"
                            )}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <p className="text-center text-sm text-gray-500">
                            🔒 Secure admin access only
                        </p>
                        <p className="text-center text-xs text-[#C9A227] mt-2 font-medium">
                            Since 2000 - Trusted Quality
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Custom Animation Styles */}
            <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
        </div>
    )
}
