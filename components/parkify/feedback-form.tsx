"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeedbackForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // In a real app, send to your API route
    console.log("[v0] Feedback submitted")
    setStatus("submitted")
  }

  return (
    <Card className="bg-card/60">
      <CardHeader>
        <CardTitle>Leave Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-3">
          <Input name="name" label="Name" placeholder="Your name" />
          <Input name="email" type="email" label="Email" placeholder="you@example.com" />
          <div className="grid gap-1.5">
            <label htmlFor="message" className="text-sm">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="rounded-md bg-secondary px-3 py-2 outline-none"
              placeholder="How can we improve?"
            />
          </div>
          <Button
            type="submit"
            className="mt-2 bg-primary text-primary-foreground hover:shadow-[0_0_12px] hover:shadow-primary/50"
          >
            {status === "submitted" ? "Thanks!" : "Send Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function Input({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="rounded-md bg-secondary px-3 py-2 outline-none"
        placeholder={placeholder}
      />
    </div>
  )
}
