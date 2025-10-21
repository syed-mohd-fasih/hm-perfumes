"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("admin_logged_in")
    if (stored === "true") {
      setIsLoggedIn(true)
    }
    setIsLoaded(true)
  }, [])

  const login = (email: string, password: string) => {
    if (email === "admin@example.com" && password === "password123") {
      setIsLoggedIn(true)
      localStorage.setItem("admin_logged_in", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("admin_logged_in")
  }

  if (!isLoaded) return <>{children}</>

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
