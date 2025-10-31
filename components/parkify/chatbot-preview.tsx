"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const languages = ["English", "Español", "Français", "Deutsch"]

export function ChatbotPreview() {
  const [lang, setLang] = useState(languages[0])

  return (
    <Card className="bg-card/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Chatbot (Preview)</CardTitle>
          <select
            aria-label="Language"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="rounded-md bg-secondary px-2 py-1 text-sm"
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-60 overflow-auto rounded-md border border-border p-3">
          <ChatBubble from="bot" text="Hi! Need parking nearby? I can help." />
          <ChatBubble from="user" text="Find EV-friendly spots near downtown." />
          <ChatBubble from="bot" text="Found 3 spots with chargers within 0.5 mi." />
        </div>
        <div className="mt-3 flex gap-2">
          <input
            aria-label="Message"
            placeholder="Type a message…"
            className="flex-1 rounded-md bg-secondary px-3 py-2 outline-none"
          />
          <Button className="bg-primary text-primary-foreground hover:shadow-[0_0_12px] hover:shadow-primary/50">
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ChatBubble({ from, text }: { from: "bot" | "user"; text: string }) {
  const isUser = from === "user"
  return (
    <div className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        }`}
      >
        {text}
      </div>
    </div>
  )
}
