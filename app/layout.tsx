import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-poppins" })

export const metadata: Metadata = {
  title: "Parkify – Smart Parking",
  description: "Simple, safe & smart parking for everyone.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased dark`}>
      <body className="font-sans">
        <SiteHeader />
        <Suspense fallback={null}>{children}</Suspense>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
