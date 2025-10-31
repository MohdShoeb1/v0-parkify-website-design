"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-3" aria-label="Primary">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="Parkify home">
              <span className="text-primary">●</span>
              <span style={{ fontFamily: "var(--font-heading)" }}>Parkify</span>
            </Link>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </a>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:shadow-[0_0_12px] hover:shadow-primary/60"
              >
                Find Parking Now
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </div>

      {open ? (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            <Link href="/" onClick={() => setOpen(false)} className="text-sm">
              Home
            </Link>
            <a href="#features" onClick={() => setOpen(false)} className="text-sm">
              Features
            </a>
            <Link href="/contact" onClick={() => setOpen(false)} className="text-sm">
              Contact
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login" onClick={() => setOpen(false)} className="text-sm">
                Login
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)}>
                <Button className="bg-primary text-primary-foreground hover:shadow-[0_0_12px] hover:shadow-primary/60">
                  Find Parking Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default SiteHeader
