import type { Spot } from "@/components/parkify/types"

export const demoSpots: Spot[] = [
  { id: "p1", name: "Market & 5th Garage", x: 28, y: 42, distanceMin: 6, pricePerHour: 3.5, available: true },
  { id: "p2", name: "Mission Street Lot", x: 62, y: 58, distanceMin: 9, pricePerHour: 2.75, available: true },
  { id: "p3", name: "Downtown Plaza Deck", x: 50, y: 31, distanceMin: 4, pricePerHour: 4.0, available: true },
  { id: "p4", name: "Pierfront Parking", x: 80, y: 25, distanceMin: 12, pricePerHour: 5.0, available: false },
  { id: "p5", name: "Civic Center Garage", x: 18, y: 65, distanceMin: 10, pricePerHour: 3.0, available: true },
]
