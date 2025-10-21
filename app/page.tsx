"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col">
			<Navbar />

			{/* Hero Section */}
			<section className="flex-1 flex items-center justify-center px-4 py-20">
				<div className="max-w-4xl w-full text-center space-y-8">
					<div className="space-y-4 animate-fade-in">
						<h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
							Essence of{" "}
							<span className="bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
								Luxury
							</span>
						</h1>
						<p className="text-lg md:text-xl text-foreground/60 text-balance">
							Discover our curated collection of premium perfumes crafted for the discerning individual
						</p>
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
						<Link
							href="/products"
							className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg px-8 py-4 font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out flex items-center justify-center gap-2 group"
						>
							Shop Now
							<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300 ease-out" />
						</Link>
						<Link
							href="/about"
							className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg px-8 py-4 font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out"
						>
							Learn More
						</Link>
					</div>

					{/* Featured Products Preview */}
					<div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{ name: "Amber Essence", price: "$59.99", desc: "Warm & Rich" },
							{ name: "Citrus Bloom", price: "$49.99", desc: "Fresh & Floral" },
							{ name: "Midnight Musk", price: "$64.99", desc: "Deep & Sensual" },
						].map((product, i) => (
							<div
								key={i}
								className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out group cursor-pointer"
							>
								<div className="w-full h-48 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl mb-4 flex items-center justify-center">
									<div className="text-4xl">💎</div>
								</div>
								<h3 className="font-semibold text-lg mb-1">{product.name}</h3>
								<p className="text-sm text-foreground/60 mb-3">{product.desc}</p>
								<p className="text-secondary font-bold">{product.price}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
