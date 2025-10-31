import { MockDB } from "@/lib/mock-db"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const spot = MockDB.spots.find((s) => s.id === params.id)
  if (!spot) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }
  return Response.json({ spot }, { status: 200 })
}
