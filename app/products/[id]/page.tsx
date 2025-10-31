"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/firestore";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/features/cartSlice";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProductDetailPage() {
	const params = useParams();
	const [product, setProduct] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const handleAdd = () => {
		dispatch(addToCart({ ...product, quantity: 1 }));
		toast.success("Item Added to cart!");
	};

	useEffect(() => {
		const loadProduct = async () => {
			getProductById(`${params.id}`).then(setProduct);
			setLoading(false);
		};
		loadProduct();
	}, [params.id]);

	if (loading) {
		return (
			<main className="min-h-screen flex flex-col">
				<Navbar />
				<div className="flex-1 flex items-center justify-center">
					<div className="text-foreground/60">Loading...</div>
				</div>
				<Footer />
			</main>
		);
	}

	if (!product) {
		return (
			<main className="min-h-screen flex flex-col">
				<Navbar />
				<div className="flex-1 flex items-center justify-center">
					<div className="text-center">
						<h1 className="text-2xl font-bold mb-4">Product not found</h1>
						<Link href="/products" className="text-primary hover:underline">
							Back to products
						</Link>
					</div>
				</div>
				<Footer />
			</main>
		);
	}

	return (
		<main className="min-h-screen flex flex-col">
			<Navbar />

			<section className="flex-1 px-4 py-20">
				<div className="max-w-4xl mx-auto">
					<Link href="/products">
						<Button variant="ghost" className="mb-6 dark:hover:bg-green-800">
							<ChevronLeft className="w-4 h-4 mr-2" />
							Back to Products
						</Button>
					</Link>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8 flex items-center justify-center">
							<img
								src={product.image || "/placeholder.svg"}
								alt={product.name}
								className="w-full h-auto rounded-2xl"
							/>
						</div>

						<div className="space-y-6">
							<div>
								<h1 className="text-4xl md:text-5xl font-bold mb-2">{product.name}</h1>
								<p className="text-secondary text-lg font-semibold">HM Perfumes</p>
							</div>

							<p className="text-lg text-foreground/70">{product.description}</p>

							<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-6">
								<h3 className="font-semibold mb-3">Ingredients</h3>
								<p className="text-foreground/70">{product.ingredients}</p>
							</div>

							<div className="flex items-baseline gap-2">
								<span className="text-4xl font-bold text-secondary">
									PKR {product.price.toFixed(2)}
								</span>
							</div>

							<button
								onClick={handleAdd}
								className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg px-8 py-4 font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out flex items-center justify-center gap-2 group w-full"
							>
								Add to Cart
								<ShoppingBag className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300 ease-out" />
							</button>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
