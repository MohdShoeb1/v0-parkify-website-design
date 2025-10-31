"use client"

import { Leaf, Gauge, Footprints } from "lucide-react"

const items = [
  { icon: Leaf, title: "EV-friendly Spots", desc: "Charge while you are parked." },
  { icon: Gauge, title: "Fuel Saved", desc: "Reduce traffic and cruising time." },
  { icon: Footprints, title: "Carbon Tracker", desc: "Know your footprint impact." },
]

export function Sustainability() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
        Sustainability
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-xl bg-card/60 p-6 transition hover:shadow-[0_0_16px] hover:shadow-primary/30"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
