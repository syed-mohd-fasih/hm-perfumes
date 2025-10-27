"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, updateQuantity, clearCart } from "@/store/features/cartSlice";
import { useRouter } from "next/navigation";

export default function CartPage() {
	const { items, totalAmount } = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch();
	const router = useRouter();
	const { user } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (!user) {
			router.push("/");
		}
	});

	return (
		<main className="min-h-screen flex flex-col">
			<Navbar />

			<section className="flex-1 px-4 py-20">
				<div className="max-w-6xl mx-auto">
					<div className="mb-12">
						<h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Shopping Cart</h1>
						<p className="text-lg text-foreground/60">Review your items before checkout</p>
					</div>

					{items.length === 0 ? (
						<div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg p-12 text-center">
							<ShoppingBag className="w-16 h-16 mx-auto mb-4 text-foreground/40" />
							<p className="text-lg text-foreground/60 mb-6">Your cart is empty</p>
							<Link
								href="/products"
								className="inline-block bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg px-8 py-4 font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out"
							>
								Continue Shopping
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{/* Cart Items */}
							<div className="lg:col-span-2 space-y-4">
								{items.map((item) => (
									<div
										key={item.id}
										className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg p-6 flex items-center justify-between"
									>
										<div className="flex-1">
											<h3 className="font-semibold text-lg mb-2">{item.name}</h3>
											<p className="text-secondary font-bold">${item.price.toFixed(2)}</p>
										</div>

										<div className="flex items-center gap-4">
											<div className="flex items-center gap-2 bg-white/5 dark:bg-black/5 rounded-full px-4 py-2">
												<button
													onClick={() =>
														dispatch(
															updateQuantity({ id: item.id, quantity: item.quantity - 1 })
														)
													}
													className="text-foreground/60 hover:text-foreground transition-all duration-300 ease-out"
												>
													-
												</button>
												<span className="w-8 text-center font-semibold">{item.quantity}</span>
												<button
													onClick={() =>
														dispatch(
															updateQuantity({ id: item.id, quantity: item.quantity + 1 })
														)
													}
													className="text-foreground/60 hover:text-foreground transition-all duration-300 ease-out"
												>
													+
												</button>
											</div>

											<button
												onClick={() => dispatch(removeFromCart(item.id))}
												className="p-2 rounded-full hover:bg-red-500/20 text-red-500 transition-all duration-300 ease-out"
											>
												<Trash2 className="w-5 h-5" />
											</button>
										</div>
									</div>
								))}
							</div>

							{/* Order Summary */}
							<div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg p-8 h-fit sticky top-24">
								<h2 className="text-2xl font-bold mb-6">Order Summary</h2>

								<div className="flex justify-between text-xl font-bold mb-8">
									<span>Total</span>
									<span className="text-secondary">${totalAmount.toFixed(2)}</span>
								</div>

								<Link
									href="/checkout"
									className="w-full block text-center bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg px-8 py-4 font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out mb-3"
								>
									Proceed to Checkout
								</Link>

								<Link
									href="/products"
									className="w-full block text-center text-foreground/70 hover:text-foreground transition-all duration-300 ease-out py-2"
								>
									Continue Shopping
								</Link>

								<div className="flex gap-4">
									<button onClick={() => dispatch(clearCart())} className="border px-4 py-2 rounded">
										Clear Cart
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			<Footer />
		</main>
	);
}
