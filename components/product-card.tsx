"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  description: string
  image?: string
}

export function ProductCard({ id, name, price, description, image }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out group cursor-pointer h-full flex flex-col">
        {/* Product Image Placeholder */}
        <div className="w-full h-56 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
          <div className="text-6xl group-hover:scale-110 transition-all duration-300 ease-out">✨</div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-all duration-300 ease-out">
            {name}
          </h3>
          <p className="text-sm text-foreground/60 mb-4 flex-1">{description}</p>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <span className="text-lg font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              ${price.toFixed(2)}
            </span>
            <button className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-all duration-300 ease-out group-hover:scale-110">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
