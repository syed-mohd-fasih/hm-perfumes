"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { clearCart } from "@/store/features/cartSlice";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { createOrder } from "@/lib/firestore";

export default function CheckoutPage() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { user } = useSelector((state: RootState) => state.auth);
	const { items, totalAmount } = useSelector((state: RootState) => state.cart);

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [paymentProofUrl, setPaymentProofUrl] = useState<string | null>(null);
	const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");

	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		address: "",
	});

	useEffect(() => {
		if (!user) router.push("/");
	}, [user, router]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const orderData = {
				userId: user?.uid || null,
				userEmail: user?.email || null,
				items: items.map((i) => ({
					id: i.id,
					quantity: i.quantity,
				})),
				totalAmount,
				paymentMethod,
				paymentProofUrl: paymentMethod === "online" ? paymentProofUrl : "",
				shippingAddress: {
					name: formData.name,
					phone: formData.phone,
					address: formData.address,
				},
			};

			await createOrder(orderData);
			dispatch(clearCart());
			setIsSubmitted(true);
		} catch (error) {
			console.error("Order creation failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isSubmitted) {
		return (
			<main className="min-h-screen flex flex-col">
				<Navbar />
				<section className="flex-1 px-4 py-20 flex items-center justify-center">
					<div className="max-w-2xl w-full text-center">
						<div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-12">
							<CheckCircle className="w-20 h-20 mx-auto mb-6 text-primary" />
							<h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
							<p className="text-lg text-foreground/60 mb-8">
								Thank you for your purchase. Your order has been successfully placed.
							</p>
							<div className="flex justify-center gap-4">
								<Link
									href="/products"
									className="px-8 py-4 rounded-3xl border border-white/10 backdrop-blur-lg font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all"
								>
									Continue Shopping
								</Link>
								<Link
									href="/orders"
									className="px-8 py-4 rounded-3xl border border-white/10 backdrop-blur-lg font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all"
								>
									Track your Orders
								</Link>
							</div>
						</div>
					</div>
				</section>
				<Footer />
			</main>
		);
	}

	return (
		<main className="min-h-screen flex flex-col">
			<Navbar />
			<section className="flex-1 px-4 py-20">
				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* LEFT COLUMN (2/3): Shipping + Payment */}
					<div className="lg:col-span-2 space-y-8">
						{/* Shipping Information */}
						<div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8">
							<h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
							<div className="space-y-4">
								<input
									type="text"
									name="name"
									placeholder="Full Name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
								/>
								<input
									type="tel"
									name="phone"
									placeholder="Phone Number"
									value={formData.phone}
									onChange={handleChange}
									required
									className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
								/>
								<input
									type="text"
									name="address"
									placeholder="Complete Address"
									value={formData.address}
									onChange={handleChange}
									required
									className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
								/>
							</div>
						</div>

						{/* Payment Information */}
						<div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8">
							<h2 className="text-2xl font-bold mb-6">Payment Method</h2>

							<div className="flex flex-col gap-4">
								<label className="flex items-center gap-3">
									<input
										type="radio"
										name="paymentMethod"
										value="cash"
										checked={paymentMethod === "cash"}
										onChange={() => setPaymentMethod("cash")}
										className="w-5 h-5 accent-primary"
									/>
									<span className="text-foreground/80 font-medium">Cash on Delivery</span>
								</label>

								<label className="flex items-center gap-3">
									<input
										type="radio"
										name="paymentMethod"
										value="online"
										checked={paymentMethod === "online"}
										onChange={() => setPaymentMethod("online")}
										className="w-5 h-5 accent-primary"
									/>
									<span className="text-foreground/80 font-medium">Online Payment</span>
								</label>
							</div>

							{/* Upload section for online payments */}
							{paymentMethod === "online" && (
								<div className="mt-6 space-y-3">
									<p className="text-foreground/70">
										Please upload a screenshot of your payment receipt or transaction proof.
									</p>

									<UploadButton<OurFileRouter, "paymentProofUploader">
										endpoint="paymentProofUploader"
										onClientUploadComplete={(res) => {
											setPaymentProofUrl(res?.[0]?.url);
											setUploading(false);
										}}
										onUploadError={(err) => {
											alert(`Upload failed: ${err.message}`);
											setUploading(false);
										}}
										onUploadBegin={() => setUploading(true)}
									/>

									{paymentProofUrl && (
										<p className="text-sm text-green-500 mt-2">✅ Proof uploaded successfully!</p>
									)}
								</div>
							)}
						</div>
					</div>

					{/* RIGHT COLUMN (1/3): Order Summary */}
					<div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8">
						<h2 className="text-2xl font-bold mb-6">Order Summary</h2>
						<div className="space-y-4 max-h-[300px] overflow-y-auto">
							{items.map((item) => (
								<div key={item.id} className="flex justify-between items-center pb-3">
									<div>
										<p className="font-medium">{item.name}</p>
										<p className="text-sm text-foreground/60">Qty: {item.quantity}</p>
									</div>
									<p className="text-foreground/80">PKR {(item.price * item.quantity).toFixed(2)}</p>
								</div>
							))}
						</div>

						<div className="border-t border-white/10 mt-6 pt-6 space-y-3 text-foreground/70">
							<div className="flex justify-between text-xl font-semibold">
								<span>Total</span>
								<span className="text-secondary">PKR {totalAmount.toFixed(2)}</span>
							</div>
						</div>

						<button
							onClick={handleSubmit}
							disabled={isLoading || (paymentMethod === "online" && (uploading || !paymentProofUrl))}
							className={`w-full mt-8 px-8 py-4 rounded-3xl font-semibold transition-all duration-300 ease-out
								${
									isLoading || (paymentMethod === "online" && (uploading || !paymentProofUrl))
										? "bg-gray-500/40 cursor-not-allowed"
										: "bg-primary hover:bg-primary/90 text-white"
								}`}
						>
							{isLoading ? "Placing Order..." : "Complete Purchase"}
						</button>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	);
}
