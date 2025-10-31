export type User = {
  id: string
  name: string
  email: string
  // hashed for mock storage; never returned to client
  passwordHash: string
  createdAt: string
}

export type PublicUser = Omit<User, "passwordHash">

export type Session = {
  token: string
  userId: string
  createdAt: string
}

export type Booking = {
  id: string
  userId: string
  spotId: string
  startISO: string
  hours: number
  price: number
  createdAt: string
  status: "confirmed" | "canceled" | "completed"
}
