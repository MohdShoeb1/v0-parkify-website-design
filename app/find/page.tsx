import MapFinder from "@/components/parkify/map-finder"
import { demoSpots } from "@/lib/parking-data"

export default function FindPage() {
  // Server Component: passes demo data to client UI
  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background text-foreground">
      <section className="mx-auto w-full max-w-6xl px-4 py-8 md:py-10">
        <header className="mb-6 md:mb-8">
          <h1 className="text-balance text-3xl font-semibold md:text-4xl">Find Parking Near You</h1>
          <p className="text-pretty mt-2 text-muted-foreground md:text-base">
            Explore available spots on the map, compare walking times, and book in seconds.
          </p>
        </header>

        <MapFinder spots={demoSpots} />
      </section>
    </main>
  )
}
