"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchProducts } from "@/store/features/productsSlice";

export default function ProductsPage() {
	const dispatch = useAppDispatch();
	const { items, loading } = useAppSelector((state) => state.products);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	if (loading) {
		<main className="min-h-screen flex flex-col">
			<Navbar />
			<section className="flex-1 px-4 py-20 flex items-center justify-center">
				<div className="text-center">
					<p className="text-lg text-foreground/60">Loading Products...</p>
				</div>
			</section>
			<Footer />
		</main>;
	}

	return (
		<main className="min-h-screen flex flex-col">
			<Navbar />

			<section className="flex-1 px-4 py-20">
				<div className="max-w-7xl mx-auto">
					<div className="mb-12 text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Our Collection</h1>
						<p className="text-lg text-foreground/60">Discover our curated selection of premium perfumes</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{items.map((product) => (
							<Link key={product.id} href={`/products/${product.id}`}>
								<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out group cursor-pointer h-full flex flex-col">
									<div className="w-full h-48 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
										<img
											src={product.image || "/placeholder.svg"}
											alt={product.name}
											className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ease-out"
										/>
									</div>
									<h3 className="font-semibold text-lg mb-1">{product.name}</h3>
									<p className="text-sm text-foreground/60 mb-3 flex-1">{product.description}</p>
									<p className="text-secondary font-bold text-lg">PKR {product.price.toFixed(2)}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
