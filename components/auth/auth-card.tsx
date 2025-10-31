"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <Card className="bg-card/60 border-border/60">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </CardTitle>
        {subtitle ? <p className="text-sm text-muted-foreground mt-1">{subtitle}</p> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
