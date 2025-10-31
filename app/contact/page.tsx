import { ChatbotPreview } from "@/components/parkify/chatbot-preview"
import { FeedbackForm } from "@/components/parkify/feedback-form"

export default function ContactPage() {
  return (
    <main className="min-h-[80vh]">
      <div className="container mx-auto px-4 py-16">
        <h1
          className="text-3xl md:text-4xl font-semibold tracking-tight text-balance"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Contact Parkify
        </h1>
        <p className="mt-2 text-muted-foreground">Chat with us or leave feedback. We’re here 24/7.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <ChatbotPreview />
          <FeedbackForm />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Prefer email? Reach us at <span className="text-primary">support@parkify.app</span>
        </p>
      </div>
    </main>
  )
}
