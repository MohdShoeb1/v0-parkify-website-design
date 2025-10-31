"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Bot, Wallet, Headphones, Home, BatteryCharging } from "lucide-react"

const features = [
  { icon: MapPin, title: "Real-time GPS", desc: "Find open spots instantly." },
  { icon: Bot, title: "AI Recommendations", desc: "Best spots for your route." },
  { icon: Wallet, title: "Web3 Payments", desc: "Secure and fast checkout." },
  { icon: Headphones, title: "24/7 Support", desc: "Chatbot + human handoff." },
  { icon: Home, title: "Rent Spaces", desc: "List unused driveways." },
  { icon: BatteryCharging, title: "EV Integration", desc: "Charge while you park." },
]

export function FeaturesGrid() {
  return (
    <div id="features" className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold text-balance" style={{ fontFamily: "var(--font-heading)" }}>
        Key Features
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <Card
            key={title}
            className="border-border/60 bg-card/60 transition hover:shadow-[0_0_20px] hover:shadow-primary/30"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <CardTitle className="text-lg">{title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">{desc}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
