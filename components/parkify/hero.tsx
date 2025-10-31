"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CityGridBackground } from "./city-grid-background"
import { MapPin } from "lucide-react"

export function Hero() {
  return (
    <header className="relative">
      <CityGridBackground />
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-xs text-secondary-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            Live in 20+ cities
          </span>
          <h1
            className="mt-4 text-pretty text-4xl md:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {"Simple, Safe & Smart Parking for Everyone"}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Real-time spots, AI picks, secure Web3 payments, and EV-ready.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:shadow-[0_0_20px] hover:shadow-primary transition-shadow"
              >
                Find Parking Now
              </Button>
            </Link>
            <a href="#features" className="text-sm text-primary hover:underline underline-offset-4">
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
