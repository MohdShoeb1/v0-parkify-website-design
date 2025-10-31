import { MockDB } from "@/lib/mock-db"
import { hashPassword, makeToken, toPublicUser } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name?: string
      email?: string
      password?: string
    }

    if (!name || !email || !password) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const exists = Array.from(MockDB.users.values()).find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return Response.json({ error: "Email already registered" }, { status: 409 })
    }

    const id = crypto.randomUUID()
    const user = {
      id,
      name,
      email,
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
    }
    MockDB.users.set(id, user)

    const token = makeToken()
    MockDB.sessions.set(token, { token, userId: id, createdAt: new Date().toISOString() })

    return Response.json({ user: toPublicUser(user), token }, { status: 201 })
  } catch (e) {
    return Response.json({ error: "Invalid request" }, { status: 400 })
  }
}
