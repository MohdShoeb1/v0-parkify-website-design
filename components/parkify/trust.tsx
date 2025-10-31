"use client"

import { ShieldCheck, QrCode, BadgeCheck } from "lucide-react"

const items = [
  { icon: QrCode, title: "QR Entry/Exit", desc: "Fast, secure gate verification." },
  { icon: BadgeCheck, title: "Verified Spots", desc: "Hosts and locations are vetted." },
  { icon: ShieldCheck, title: "Safe & Insured", desc: "Your vehicle is protected." },
]

export function Trust() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
        Security & Trust
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
