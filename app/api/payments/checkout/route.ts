export async function POST(req: Request) {
  try {
    const { amount } = (await req.json()) as { amount?: number }
    if (!amount || amount <= 0) {
      return Response.json({ error: "Invalid amount" }, { status: 400 })
    }
    return Response.json(
      {
        status: "succeeded",
        transactionId: crypto.randomUUID(),
        amount,
        currency: "USD",
      },
      { status: 200 },
    )
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 })
  }
}
