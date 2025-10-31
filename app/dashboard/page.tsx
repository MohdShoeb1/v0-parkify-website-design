"use client"

import useSWR from "swr"
import Link from "next/link"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { authFetch, clearToken, getToken } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Booking } from "@/lib/types"
import type { Spot } from "@/components/parkify/types"

const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" })

const fetcher = (url: string) => authFetch(url).then((r) => r.json())

export default function DashboardPage() {
  const router = useRouter()
  const [hasToken] = useState<boolean>(() => !!getToken())

  const {
    data: me,
    error: meError,
    isLoading: meLoading,
    mutate: mutateMe,
  } = useSWR(hasToken ? "/api/auth/me" : null, fetcher)
  const {
    data: bookings,
    error: bookingsError,
    isLoading: bookingsLoading,
    mutate: mutateBookings,
  } = useSWR<{ bookings: Booking[] } | undefined>(hasToken ? "/api/bookings" : null, fetcher)
  const { data: spots } = useSWR<{ spots: Spot[] }>("/api/spots", fetcher)

  const rows = useMemo(() => {
    if (!bookings?.bookings || !spots?.spots) return []
    const byId = new Map(spots.spots.map((s) => [s.id, s]))
    return bookings.bookings
      .slice()
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .map((b) => ({
        ...b,
        spotName: byId.get(b.spotId)?.name || b.spotId,
      }))
  }, [bookings, spots])

  const unauthorized = meError && (meError as any).status === 401

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background text-foreground">
      <section className="mx-auto w-full max-w-6xl px-4 py-8 md:py-10">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-balance text-3xl font-semibold md:text-4xl">Your Parkify</h1>
            <p className="text-pretty mt-2 text-muted-foreground">
              Manage your bookings, view details, and plan your next trip.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/find">
              <Button>Find Parking</Button>
            </Link>
            {hasToken ? (
              <Button
                variant="outline"
                onClick={() => {
                  clearToken()
                  mutateMe(undefined, { revalidate: false })
                  mutateBookings(undefined, { revalidate: false })
                  router.replace("/login")
                }}
              >
                Sign out
              </Button>
            ) : null}
          </div>
        </header>

        {!hasToken || unauthorized ? (
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-medium">You’re not signed in</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Please sign in to access your dashboard and manage bookings.
            </p>
            <div className="mt-4 flex gap-2">
              <Link href="/login">
                <Button>Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Create account</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="rounded-lg border border-border bg-card p-4">
              <h2 className="text-lg font-medium">Account</h2>
              {meLoading ? (
                <p className="mt-2 text-sm text-muted-foreground">Loading your profile…</p>
              ) : meError ? (
                <p className="mt-2 text-sm text-destructive">{(meError as Error).message}</p>
              ) : (
                <div className="mt-3">
                  <p className="font-semibold">{me?.user?.name}</p>
                  <p className="text-sm text-muted-foreground">{me?.user?.email}</p>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Bookings</h2>
                <Link href="/find">
                  <Button variant="secondary">Book a spot</Button>
                </Link>
              </div>
              {bookingsLoading ? (
                <p className="mt-2 text-sm text-muted-foreground">Loading bookings…</p>
              ) : bookingsError ? (
                <p className="mt-2 text-sm text-destructive">{(bookingsError as Error).message}</p>
              ) : rows.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">No bookings yet. Book your first spot!</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Spot</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((b) => (
                        <TableRow key={b.id}>
                          <TableCell className="font-medium">{b.spotName}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(b.startISO).toLocaleString()}
                          </TableCell>
                          <TableCell>{b.hours}</TableCell>
                          <TableCell className="capitalize">{b.status}</TableCell>
                          <TableCell className="text-right">{currency.format(b.price)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
