"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { setToken } from "@/lib/auth-client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Login failed. Please try again.")
      }
      if (data?.token) {
        setToken(data.token)
        router.replace("/dashboard")
      }
    } catch (e: any) {
      setError(e?.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[80vh]">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <AuthCard title="Welcome back" subtitle="Sign in to Parkify">
            <form onSubmit={onSubmit} className="grid gap-4">
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
                  autoComplete="current-password"
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
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-sm text-muted-foreground">
                {"Don't have an account? "}
                <Link href="/signup" className="text-primary hover:underline underline-offset-4">
                  Create one
                </Link>
              </div>
            </form>
          </AuthCard>
        </div>
      </div>
    </main>
  )
}
