"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import type { Spot } from "./types"

const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" })

export function BookingDrawer({
  spot,
  open,
  onClose,
  onConfirmed,
}: {
  spot: Spot | null
  open: boolean
  onClose: () => void
  onConfirmed: () => void
}) {
  const [start, setStart] = useState<string>("")
  const [hours, setHours] = useState<number>(1)

  const price = useMemo(() => {
    if (!spot) return 0
    const base = spot.pricePerHour * Math.max(1, hours)
    const fees = Math.max(0.5, base * 0.08) // simple service fee
    return base + fees
  }, [hours, spot])

  if (!open || !spot) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Booking drawer"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl rounded-t-xl border border-border bg-card p-4 shadow-xl md:bottom-6 md:rounded-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{spot.name}</h3>
          <p className="text-sm text-muted-foreground">
            {spot.distanceMin} min walk • {currency.format(spot.pricePerHour)}/hr
          </p>
        </div>
        <Button variant="ghost" onClick={onClose} aria-label="Close booking drawer">
          Close
        </Button>
      </div>

      <form
        className="mt-4 grid gap-4 md:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault()
          onConfirmed()
        }}
      >
        <label className="grid gap-2">
          <span className="text-sm">Start</span>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="h-10 rounded-md border border-border bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-primary"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm">Duration (hours)</span>
          <input
            type="number"
            min={1}
            max={24}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="h-10 rounded-md border border-border bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-primary"
            required
          />
        </label>

        <div className="grid content-end gap-2">
          <div className="flex items-center justify-between rounded-md border border-border bg-muted/40 px-3 py-2">
            <span className="text-sm">Estimated total</span>
            <span className="font-medium">{currency.format(price)}</span>
          </div>
        </div>

        <div className="md:col-span-3 flex items-center justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Confirm Booking</Button>
        </div>
      </form>
    </div>
  )
}
