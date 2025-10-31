import { getAuthToken, getUserByToken, toPublicUser } from "@/lib/auth"

export async function GET(req: Request) {
  const token = getAuthToken(req)
  const user = getUserByToken(token)
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  return Response.json({ user: toPublicUser(user) }, { status: 200 })
}
