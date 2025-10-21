"use client"

import type React from "react"

import { useState } from "react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)

    // Simulate saving to messages
    const messages = JSON.parse(localStorage.getItem("messages") || "[]")
    messages.push({
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString(),
      read: false,
    })
    localStorage.setItem("messages", JSON.stringify(messages))

    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {submitted && (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-4 bg-primary/10 border-primary/30 text-primary animate-in fade-in">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Your message..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out font-semibold"
      >
        Send Message
      </button>
    </form>
  )
}
