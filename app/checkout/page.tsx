"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { useState } from "react"

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />

        <section className="flex-1 px-4 py-20 flex items-center justify-center">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg p-12">
              <CheckCircle className="w-20 h-20 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-lg text-foreground/60 mb-8">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
              <p className="text-foreground/60 mb-8">
                A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
              </p>

              <Link
                href="/products"
                className="inline-block bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg px-8 py-4 font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Checkout</h1>
            <p className="text-lg text-foreground/60">Complete your purchase</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out"
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out mb-4"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Information</h2>

              <input
                type="text"
                name="cardName"
                placeholder="Cardholder Name"
                value={formData.cardName}
                onChange={handleChange}
                required
                className="w-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out mb-4"
              />

              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className="w-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out mb-4"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-out"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between text-foreground/70">
                  <span>Subtotal</span>
                  <span>$174.97</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Tax</span>
                  <span>$18.50</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-8">
                <span>Total</span>
                <span className="text-secondary">$203.47</span>
              </div>

              <button
                type="submit"
                className="w-full bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg px-8 py-4 font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                Complete Purchase
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
