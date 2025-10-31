"use client"

import { Search, CalendarCheck, CreditCard, Car, MessageSquare } from "lucide-react"

const steps = [
  { icon: Search, title: "Search" },
  { icon: CalendarCheck, title: "Book" },
  { icon: CreditCard, title: "Pay" },
  { icon: Car, title: "Park" },
  { icon: MessageSquare, title: "Feedback" },
]

export function HowItWorks() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
        How It Works
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-5">
        {steps.map(({ icon: Icon, title }, idx) => (
          <div
            key={title}
            className="group flex flex-col items-center rounded-xl bg-card/60 p-6 transition hover:shadow-[0_0_16px] hover:shadow-primary/30"
          >
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Icon className="h-6 w-6 text-primary" />
            </span>
            <p className="font-medium">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">Step {idx + 1}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
