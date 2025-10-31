"use client"

import { Building, Brain, Landmark } from "lucide-react"

const plans = [
  { icon: Building, title: "100+ Cities", desc: "Rapid expansion worldwide." },
  { icon: Brain, title: "Dynamic Pricing", desc: "AI-driven surge & savings." },
  { icon: Landmark, title: "Govt & Events", desc: "Seamless partnerships." },
]

export function FuturePlans() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
        Future Plans
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {plans.map(({ icon: Icon, title, desc }) => (
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
