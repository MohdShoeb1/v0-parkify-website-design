import { MockDB } from "@/lib/mock-db"
import { hashPassword, makeToken, toPublicUser } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as { email?: string; password?: string }
    if (!email || !password) {
      return Response.json({ error: "Missing credentials" }, { status: 400 })
    }

    const candidate = Array.from(MockDB.users.values()).find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!candidate) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const match = (await hashPassword(password)) === candidate.passwordHash
    if (!match) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const token = makeToken()
    MockDB.sessions.set(token, { token, userId: candidate.id, createdAt: new Date().toISOString() })

    return Response.json({ user: toPublicUser(candidate), token }, { status: 200 })
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 })
  }
}
