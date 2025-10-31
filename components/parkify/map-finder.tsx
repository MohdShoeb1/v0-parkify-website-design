"use client"

import { useMemo, useState } from "react"
import { MapCanvas } from "./map-canvas"
import { BookingDrawer } from "./booking-drawer"
import type { Spot } from "./types"
import { Button } from "@/components/ui/button"

export default function MapFinder({ spots }: { spots: Spot[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const selected = useMemo(() => spots.find((s) => s.id === selectedId) ?? null, [selectedId, spots])

  function handleSelect(id: string) {
    setSelectedId(id)
    setDrawerOpen(true)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 rounded-lg border border-border bg-card">
        <MapCanvas spots={spots} selectedId={selectedId} onSelect={handleSelect} />
      </div>

      <aside className="lg:col-span-2 rounded-lg border border-border bg-card p-4">
        <h2 className="text-lg font-medium">Available Spots</h2>
        <ul className="mt-3 grid gap-3">
          {spots.map((s) => (
            <li key={s.id} className="rounded-md border border-border p-3 hover:bg-muted/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {s.distanceMin} min walk • ${s.pricePerHour.toFixed(2)}/hr
                  </p>
                </div>
                <Button
                  variant={s.id === selectedId ? "default" : "secondary"}
                  onClick={() => handleSelect(s.id)}
                  aria-label={`View ${s.name} on map`}
                >
                  {s.id === selectedId ? "Selected" : "View"}
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedId(null)
              setDrawerOpen(false)
            }}
          >
            Clear
          </Button>
          <Button onClick={() => selected && setDrawerOpen(true)} disabled={!selected}>
            Book Selected
          </Button>
        </div>
      </aside>

      <BookingDrawer
        spot={selected}
        open={drawerOpen && !!selected}
        onClose={() => setDrawerOpen(false)}
        onConfirmed={() => {
          // In the API task we will create the booking and then navigate or show a ticket.
          setDrawerOpen(false)
        }}
      />
    </div>
  )
}
