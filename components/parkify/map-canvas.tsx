"use client"

import Image from "next/image"
import type { Spot } from "./types"

export function MapCanvas({
  spots,
  selectedId,
  onSelect,
}: {
  spots: Spot[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <figure className="relative aspect-[16/10] overflow-hidden rounded-lg">
      {/* Decorative map placeholder */}
      <Image
        src={
          "/placeholder.svg?height=720&width=1152&query=dark city map with streets and blocks for parking visualization"
        }
        alt="City map with parking spots"
        fill
        className="object-cover"
        priority
      />
      <figcaption className="sr-only">Interactive map showing available parking spots.</figcaption>

      {/* Pins */}
      <div className="pointer-events-none absolute inset-0">
        {spots.map((s) => {
          const isSelected = s.id === selectedId
          return (
            <button
              key={s.id}
              type="button"
              aria-label={`Select ${s.name}`}
              title={`${s.name} • ${s.distanceMin} min • $${s.pricePerHour.toFixed(2)}/hr`}
              onClick={(e) => {
                e.preventDefault()
                onSelect(s.id)
              }}
              className={[
                "pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border p-2 transition-transform",
                isSelected ? "scale-110 bg-primary text-primary-foreground" : "bg-background/80 backdrop-blur",
                "border-border shadow-sm hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              ].join(" ")}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
              }}
            >
              <span className="block h-2 w-2 rounded-full bg-primary-foreground" />
            </button>
          )
        })}
      </div>
    </figure>
  )
}
