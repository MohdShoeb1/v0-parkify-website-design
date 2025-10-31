import { MockDB } from "@/lib/mock-db"
import { getAuthToken, getUserByToken } from "@/lib/auth"
import type { Booking } from "@/lib/types"

function computePrice(hourly: number, hours: number) {
  const base = hourly * Math.max(1, hours)
  const fees = Math.max(0.5, base * 0.08)
  return Number((base + fees).toFixed(2))
}

export async function GET(req: Request) {
  const user = getUserByToken(getAuthToken(req))
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const list = Array.from(MockDB.bookings.values()).filter((b) => b.userId === user.id)
  return Response.json({ bookings: list }, { status: 200 })
}

export async function POST(req: Request) {
  const user = getUserByToken(getAuthToken(req))
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { spotId, startISO, hours } = (await req.json()) as {
      spotId?: string
      startISO?: string
      hours?: number
    }
    if (!spotId || !startISO || !hours) {
      return Response.json({ error: "Missing fields" }, { status: 400 })
    }
    const spot = MockDB.spots.find((s) => s.id === spotId)
    if (!spot || !spot.available) {
      return Response.json({ error: "Spot unavailable" }, { status: 409 })
    }

    const price = computePrice(spot.pricePerHour, hours)
    const booking: Booking = {
      id: crypto.randomUUID(),
      userId: user.id,
      spotId: spot.id,
      startISO,
      hours,
      price,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    }
    MockDB.bookings.set(booking.id, booking)

    // naive "hold" — mark spot unavailable until other actions exist
    spot.available = false

    return Response.json({ booking }, { status: 201 })
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 })
  }
}
