"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle2, CircleEllipsis, BanknoteX, CircleCheckBig } from "lucide-react";
import { getUserOrders } from "@/lib/firestore";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const statusConfig = {
	pending: {
		label: "Pending",
		color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
		icon: CircleEllipsis,
	},
	approved: {
		label: "Approved",
		color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
		icon: CheckCircle2,
	},
	declined: {
		label: "Declined",
		color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
		icon: BanknoteX,
	},
	shipped: {
		label: "Shipped",
		color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
		icon: Truck,
	},
	delivered: {
		label: "Delivered",
		color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
		icon: CircleCheckBig,
	},
};

export default function OrdersPage() {
	const [orders, setOrders] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		const fetchOrders = async () => {
			if (!user?.uid) return;
			setLoading(true);
			try {
				const userOrders = await getUserOrders(user.uid);
				setOrders(userOrders);
			} catch (error) {
				console.error("Error fetching user orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [user]);

	return (
		<div className="min-h-screen bg-white dark:bg-black flex flex-col">
			<Navbar />

			<main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-5xl mx-auto">
					<div className="mb-8">
						<h1 className="text-4xl font-bold text-black dark:text-white mb-2">My Orders</h1>
						<p className="text-gray-600 dark:text-gray-400">View and track your recent perfume orders</p>
					</div>

					{/* --- Loading State --- */}
					{loading && <p className="text-center text-gray-600 dark:text-gray-400">Loading your orders...</p>}

					{/* --- No Orders --- */}
					{!loading && orders.length === 0 && (
						<Card className="p-12 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
							<Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-black dark:text-white mb-2">No orders yet</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-6">
								Your recent orders will appear here once you make a purchase.
							</p>
							<Link href="/products">
								<Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Shop Now</Button>
							</Link>
						</Card>
					)}

					{/* --- Orders List --- */}
					<div className="space-y-6">
						{orders.map((order) => {
							const config = statusConfig[order.status as keyof typeof statusConfig];
							const StatusIcon = config.icon;

							return (
								<Card
									key={order.id}
									className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
								>
									{/* --- Order Header --- */}
									<div className="flex items-center justify-between mb-6">
										<div>
											<h3 className="text-lg font-semibold text-black dark:text-white">
												Order #{order.id}
											</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Placed on{" "}
												{new Date(
													order.createdAt?.seconds
														? order.createdAt.toDate()
														: order.createdAt
												).toLocaleDateString()}
											</p>
										</div>

										<Badge
											className={`${config.color} flex items-center gap-2 text-sm px-3 py-1.5`}
										>
											<StatusIcon className="w-4 h-4" />
											{config.label}
										</Badge>
									</div>

									{/* --- Order Items --- */}
									<div className="space-y-4 mb-6">
										{order.items.map((item: any) => (
											<div
												key={item.id}
												className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0"
											>
												<img
													src={item.image}
													alt={item.name}
													className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
												/>
												<div className="flex-1">
													<h4 className="font-medium text-black dark:text-white">
														{item.name}
													</h4>
													<p className="text-sm text-gray-500 dark:text-gray-400">
														Qty: {item.quantity}
													</p>
												</div>
												<p className="font-semibold text-emerald-600 dark:text-emerald-400">
													${(item.price * item.quantity).toFixed(2)}
												</p>
											</div>
										))}
									</div>

									{/* --- Order Summary --- */}
									<div className="flex flex-wrap justify-between items-center border-t border-gray-200 dark:border-gray-800 pt-4 text-sm">
										<div>
											<p className="text-gray-600 dark:text-gray-400">
												Payment Method:{" "}
												<span className="font-large text-black dark:text-white capitalize">
													{order.paymentMethod}
												</span>
											</p>
										</div>

										<div className="text-right">
											<p className="text-gray-600 dark:text-gray-400">Total</p>
											<p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
												${order.totalAmount.toFixed(2)}
											</p>
										</div>
									</div>

									{/* --- Proof of Payment --- */}
									{order.paymentMethod === "online" && order.paymentProofUrl && (
										<div className="mt-4">
											<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
												Uploaded Payment Proof:
											</p>
											<a
												href={order.paymentProofUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="block w-fit"
											>
												<img
													src={order.paymentProofUrl}
													alt="Payment Proof"
													className="w-40 h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700 hover:opacity-90 transition"
												/>
											</a>
										</div>
									)}
								</Card>
							);
						})}
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
