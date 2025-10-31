export type Spot = {
  id: string
  name: string
  // Display coordinates for the placeholder map (percentages 0-100)
  x: number
  y: number
  distanceMin: number
  pricePerHour: number
  available: boolean
}
