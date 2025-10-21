"use client"

import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/lib/theme-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl m-4 md:m-6">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          HM Perfumes
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-foreground/70 hover:text-foreground transition-all duration-300 ease-out">
            Home
          </Link>
          <Link
            href="/products"
            className="text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
          >
            Products
          </Link>
          <Link href="/about" className="text-foreground/70 hover:text-foreground transition-all duration-300 ease-out">
            About
          </Link>
          <Link
            href="/contact"
            className="text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 ease-out"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/50 p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <Link
            href="/"
            className="block py-2 text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block py-2 text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="block py-2 text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block py-2 text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
          >
            Contact
          </Link>
          <button
            onClick={toggleTheme}
            className="w-full py-2 px-4 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 ease-out flex items-center justify-center gap-2"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      )}
    </nav>
  )
}
