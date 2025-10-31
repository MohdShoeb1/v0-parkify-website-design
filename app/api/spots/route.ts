import { MockDB } from "@/lib/mock-db"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const onlyAvailable = url.searchParams.get("available")
  const spots = MockDB.spots.filter((s) => (onlyAvailable ? s.available : true))
  return Response.json({ spots }, { status: 200 })
}
