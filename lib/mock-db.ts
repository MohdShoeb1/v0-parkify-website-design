import { demoSpots } from "@/lib/parking-data"
import type { Booking, Session, User } from "./types"

const users = new Map<string, User>()
const sessions = new Map<string, Session>()
const bookings = new Map<string, Booking>()

export const MockDB = {
  users,
  sessions,
  bookings,
  spots: demoSpots,
}
