"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getOrderById, updateOrderStatus } from "@/lib/firestore";
import { OrderData } from "@/lib/firestore";
import { AdminNav } from "@/components/admin-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ChevronLeft,
	CheckCircle2,
	MapPin,
	Mail,
	Phone,
	Package,
	Truck,
	XCircle,
	ImageIcon,
	Banknote,
	CreditCard,
} from "lucide-react";

export default function AdminOrderDetailPage() {
	const params = useParams();
	const router = useRouter();
	const [order, setOrder] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		if (!params?.orderId) return;
		(async () => {
			const data = await getOrderById(params.orderId as string);
			setOrder(data);
			setLoading(false);
		})();
	}, [params?.orderId]);

	const handleStatusChange = async (newStatus: OrderData["status"]) => {
		if (!order) return;
		setUpdating(true);
		await updateOrderStatus(order.id!, newStatus);
		setOrder({ ...order, status: newStatus });
		setUpdating(false);
	};

	if (loading)
		return (
			<div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-400">
				Loading order details...
			</div>
		);

	if (!order)
		return (
			<div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-400">
				Order not found.
			</div>
		);

	const createdDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A";

	const statusStyles: Record<string, string> = {
		pending: "bg-yellow-100 text-yellow-800",
		approved: "bg-blue-100 text-blue-800",
		declined: "bg-red-100 text-red-800",
		shipped: "bg-purple-100 text-purple-800",
		delivered: "bg-green-100 text-green-800",
	};

	return (
		<div className="min-h-screen bg-white dark:bg-black">
			<AdminNav />

			<main className="py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<Link href="/admin/orders">
						<Button variant="ghost" className="mb-6 dark:hover:bg-green-800">
							<ChevronLeft className="w-4 h-4 mr-2" />
							Back to Orders
						</Button>
					</Link>

					<div className="flex items-center justify-between mb-8">
						<div>
							<h1 className="text-3xl font-bold text-black dark:text-white mb-2">Order #{order.id}</h1>
							<h1 className="text-xl text-black dark:text-white my-5">
								Customer Name: {order.shippingAddress.name}
							</h1>
							<p className="text-gray-600 dark:text-gray-400">Placed on {createdDate}</p>
						</div>
						<Badge className={`${statusStyles[order.status]} px-4 py-2 text-lg`}>
							{order.status.toUpperCase()}
						</Badge>
					</div>

					{/* Contact Info */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<Card className="p-6">
							<div className="flex items-start gap-3">
								<Mail className="w-5 h-5 text-emerald-500 mt-1" />
								<div>
									<p className="text-sm text-gray-500">Email</p>
									<p className="font-medium mt-4">{order.userEmail}</p>
								</div>
							</div>
						</Card>

						<Card className="p-6">
							<div className="flex items-start gap-3">
								<Phone className="w-5 h-5 text-emerald-500 mt-1" />
								<div>
									<p className="text-sm text-gray-500">Phone</p>
									<p className="font-medium mt-4">{order.shippingAddress.phone}</p>
								</div>
							</div>
						</Card>

						<Card className="p-6">
							<div className="flex items-start gap-3">
								<MapPin className="w-5 h-5 text-emerald-500 mt-1" />
								<div>
									<p className="text-sm text-gray-500">Address</p>
									<p className="font-medium mt-4">{order.shippingAddress.address}</p>
								</div>
							</div>
						</Card>
					</div>

					{/* Payment & Status */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card className="p-6">
							<h2 className="text-xl font-semibold mb-4">Payment Info</h2>
							<p className="flex flex-wrap gap-3 items-center text-gray-600 dark:text-gray-400 mb-2">
								{order.paymentMethod === "cash" ? (
									<Banknote className="w-7 h-7" />
								) : (
									<CreditCard className="w-7 h-7" />
								)}
								<span className="font-medium text-black dark:text-white">
									{order.paymentMethod === "cash" ? "Cash on Delivery" : "Online Payment"}
								</span>
							</p>
							{order.paymentProofUrl && order.paymentMethod === "online" && (
								<div className="mt-3">
									<p className="text-sm text-gray-500 mb-1">Uploaded Proof:</p>
									<a
										href={order.paymentProofUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-emerald-600 hover:underline"
									>
										<ImageIcon className="w-4 h-4" />
										View Screenshot
									</a>
								</div>
							)}
						</Card>

						<Card className="p-6">
							<h2 className="text-xl font-semibold mb-4">Actions</h2>
							<div className="flex flex-wrap gap-3 mt-6">
								{/* Approve */}
								<Button
									onClick={() => handleStatusChange("approved")}
									disabled={updating || order.status === "approved"}
									className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200
      ${
			order.status === "approved"
				? "bg-emerald-600 text-white cursor-not-allowed opacity-60"
				: "bg-emerald-600 hover:bg-emerald-700 text-white"
		}
    `}
								>
									<CheckCircle2 className="w-4 h-4" />
									Approve
								</Button>

								{/* Decline */}
								<Button
									onClick={() => handleStatusChange("declined")}
									disabled={updating || order.status === "declined"}
									className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200
      ${
			order.status === "declined"
				? "bg-red-600 text-white cursor-not-allowed opacity-60"
				: "bg-red-600 hover:bg-red-700 text-white"
		}
    `}
								>
									<XCircle className="w-4 h-4" />
									Decline
								</Button>

								{/* Pending */}
								<Button
									onClick={() => handleStatusChange("pending")}
									disabled={updating || order.status === "pending"}
									className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200
      ${
			order.status === "pending"
				? "bg-yellow-500 text-white cursor-not-allowed opacity-60"
				: "bg-yellow-500 hover:bg-yellow-600 text-white"
		}
    `}
								>
									<Package className="w-4 h-4" />
									Pending
								</Button>

								{/* Shipped */}
								<Button
									onClick={() => handleStatusChange("shipped")}
									disabled={updating || order.status === "shipped"}
									className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200
      ${
			order.status === "shipped"
				? "bg-blue-600 text-white cursor-not-allowed opacity-60"
				: "bg-blue-600 hover:bg-blue-700 text-white"
		}
    `}
								>
									<Truck className="w-4 h-4" />
									Shipped
								</Button>

								{/* Delivered */}
								<Button
									onClick={() => handleStatusChange("delivered")}
									disabled={updating || order.status === "delivered"}
									className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200
      ${
			order.status === "delivered"
				? "bg-green-700 text-white cursor-not-allowed opacity-60"
				: "bg-green-700 hover:bg-green-800 text-white"
		}
    `}
								>
									<CheckCircle2 className="w-4 h-4" />
									Delivered
								</Button>
							</div>
						</Card>
					</div>

					{/* Order Items */}
					<Card className="p-6 my-7">
						<h2 className="text-xl font-semibold mb-4">Ordered Items</h2>
						{order.items.length > 0 ? (
							<ul className="space-y-4">
								{order.items.map(
									(item: {
										id: string;
										image: string;
										name: string;
										quantity: number;
										price: number;
									}) => (
										<li
											key={item.id}
											className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-3"
										>
											{item.image && (
												<img
													src={item.image}
													alt={item.name}
													className="w-16 h-16 rounded-md object-cover"
												/>
											)}
											<div className="flex-1">
												<p className="font-medium text-black dark:text-white">
													{item.name ?? "Unknown Product"}
												</p>
												<p className="text-sm text-gray-500">Qty: {item.quantity}</p>
											</div>
											<p className="font-semibold text-black dark:text-white">
												${((item.price ?? 0) * item.quantity).toFixed(2)}
											</p>
										</li>
									)
								)}
							</ul>
						) : (
							<p className="text-gray-500">No items found.</p>
						)}
					</Card>

					{/* Order Summary */}
					<Card className="p-6 mt-8">
						<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
						<div className="flex justify-between text-lg">
							<span>Total:</span>
							<span className="font-bold text-emerald-600">${order.totalAmount.toFixed(2)}</span>
						</div>
					</Card>
				</div>
			</main>
		</div>
	);
}
