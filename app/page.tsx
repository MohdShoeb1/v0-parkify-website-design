import { Hero } from "@/components/parkify/hero"
import { FeaturesGrid } from "@/components/parkify/features-grid"
import { HowItWorks } from "@/components/parkify/how-it-works"
import { Trust } from "@/components/parkify/trust"
import { Sustainability } from "@/components/parkify/sustainability"
import { DashboardPreview } from "@/components/parkify/dashboard-preview"
import { FuturePlans } from "@/components/parkify/future-plans"

export default function Page() {
  return (
    <main>
      <Hero />
      <section aria-label="Key Features">
        <FeaturesGrid />
      </section>
      <section aria-label="How It Works">
        <HowItWorks />
      </section>
      <section aria-label="Security and Trust">
        <Trust />
      </section>
      <section aria-label="Sustainability">
        <Sustainability />
      </section>
      <section aria-label="Dashboard Preview">
        <DashboardPreview />
      </section>
      <section aria-label="Future Plans">
        <FuturePlans />
      </section>
    </main>
  )
}
