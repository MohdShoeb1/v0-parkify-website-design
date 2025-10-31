"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

const data = [
  { hour: "6a", demand: 12 },
  { hour: "8a", demand: 35 },
  { hour: "10a", demand: 48 },
  { hour: "12p", demand: 62 },
  { hour: "2p", demand: 70 },
  { hour: "4p", demand: 85 },
  { hour: "6p", demand: 90 },
  { hour: "8p", demand: 58 },
]

export function DashboardPreview() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
        Dashboard Preview
      </h2>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card/60">
          <CardHeader>
            <CardTitle>Parking Demand (Today)</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="neon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--color-border))" strokeDasharray="3 3" />
                <XAxis dataKey="hour" stroke="hsl(var(--color-muted-foreground))" />
                <YAxis stroke="hsl(var(--color-muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--color-card))",
                    color: "hsl(var(--color-card-foreground))",
                    border: "1px solid hsl(var(--color-border))",
                  }}
                />
                <Area type="monotone" dataKey="demand" stroke="var(--primary)" fill="url(#neon)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <KPI title="Money Saved" value="$124.3k" helper="+12% this month" />
          <KPI title="Time Saved" value="1,980 hrs" helper="+9% this month" />
        </div>
      </div>
    </div>
  )
}

function KPI({
  title,
  value,
  helper,
}: {
  title: string
  value: string
  helper: string
}) {
  return (
    <Card className="bg-card/60">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={cn("text-3xl font-semibold tracking-tight")}>{value}</p>
        <p className="mt-1 text-xs text-primary">{helper}</p>
      </CardContent>
    </Card>
  )
}
