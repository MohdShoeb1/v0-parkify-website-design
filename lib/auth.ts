import type { PublicUser, User } from "./types"
import { MockDB } from "./mock-db"

function toHex(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function hashPassword(password: string) {
  const data = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return toHex(digest)
}

export function makeToken() {
  return `${crypto.randomUUID()}-${Math.random().toString(36).slice(2)}`
}

export function toPublicUser(u: User): PublicUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...rest } = u
  return rest
}

export function getAuthToken(req: Request) {
  const header = req.headers.get("authorization") || ""
  const m = header.match(/^Bearer\s+(.+)$/i)
  return m ? m[1] : null
}

export function getUserByToken(token: string | null): User | null {
  if (!token) return null
  const session = MockDB.sessions.get(token)
  if (!session) return null
  const user = MockDB.users.get(session.userId)
  return user || null
}
