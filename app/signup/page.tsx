"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { setToken } from "@/lib/auth-client"
import { useState } from "react"
import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Signup failed. Please try again.")
      }
      if (data?.token) {
        setToken(data.token)
        router.replace("/dashboard")
      }
    } catch (e: any) {
      setError(e?.message || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[80vh]">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <AuthCard title="Create your account" subtitle="Join Parkify in seconds">
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-secondary"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="bg-secondary"
                  autoComplete="new-password"
                  required
                />
              </div>

              {error ? (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 bg-primary text-primary-foreground hover:shadow-[0_0_12px] hover:shadow-primary/60"
              >
                {loading ? "Creating..." : "Create account"}
              </Button>

              <div className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </AuthCard>
        </div>
      </div>
    </main>
  )
}
