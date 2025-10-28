"use client";

import { useEffect, useState } from "react";
import { AdminNav } from "@/components/admin-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Truck, CircleCheckBig, CircleEllipsis, BanknoteX, Check } from "lucide-react";
import Link from "next/link";
import { getAllOrders, type OrderData } from "@/lib/firestore";

const statusConfig = {
	pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: CircleEllipsis },
	approved: { label: "Approved", color: "bg-green-100 text-green-800", icon: Check },
	declined: { label: "Declined", color: "bg-red-100 text-red-800", icon: BanknoteX },
	shipped: { label: "In Transit", color: "bg-blue-100 text-blue-800", icon: Truck },
	delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CircleCheckBig },
};

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState<OrderData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadOrders() {
			const fetched = await getAllOrders();
			console.log(fetched);

			// Normalize fetched data into the Order type expected by this component
			const normalized = (fetched as any[]).map((f) => ({
				id: f.id,
				userId: f.userId ?? "",
				userEmail: f.userEmail ?? "",
				createdAt: f.createdAt.toDate().toLocaleDateString() ?? new Date().toISOString(),
				totalAmount: typeof f.totalAmount === "number" ? f.totalAmount : Number(f.totalAmount) || 0,
				status: f.status ?? "pending",
				items: f.items ?? [],
				paymentMethod: f.paymentMethod ?? "",
				shippingAddress: f.shippingAddress ?? {},
			}));

			setOrders(normalized);
			setLoading(false);
		}
		loadOrders();
	}, []);

	const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
	const statusCount = (status: string) => orders.filter((o) => o.status === status).length;

	return (
		<div className="min-h-screen">
			<AdminNav />

			<main className="flex-1 px-4 py-20">
				<div className="max-w-7xl mx-auto space-y-8">
					<div>
						<h1 className="text-4xl font-bold mb-3">Orders Management</h1>
						<p className="text-muted-foreground">View and manage all customer orders</p>
					</div>

					{/* Summary Cards */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<Card className="p-6">
							<p className="text-sm text-muted-foreground mb-1">Total Orders</p>
							<p className="text-3xl font-bold">{loading ? "..." : orders.length}</p>
						</Card>
						<Card className="p-6">
							<p className="text-sm text-muted-foreground mb-1">Revenue</p>
							<p className="text-3xl font-bold text-emerald-500">
								{loading ? "..." : `PKR ${totalRevenue.toFixed(2)}`}
							</p>
						</Card>
						<Card className="p-6">
							<p className="text-sm text-muted-foreground mb-1">Pending</p>
							<p className="text-3xl font-bold text-yellow-500">{statusCount("pending")}</p>
						</Card>
						<Card className="p-6">
							<p className="text-sm text-muted-foreground mb-1">Delivered</p>
							<p className="text-3xl font-bold text-green-500">{statusCount("delivered")}</p>
						</Card>
					</div>

					{/* Orders Table */}
					<Card className="overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead className="bg-muted/50 border-b">
									<tr>
										<th className="px-6 py-3 text-left font-semibold">Order ID</th>
										<th className="px-6 py-3 text-left font-semibold">Customer</th>
										<th className="px-6 py-3 text-left font-semibold">Date</th>
										<th className="px-6 py-3 text-left font-semibold">Items</th>
										<th className="px-6 py-3 text-left font-semibold">Total</th>
										<th className="px-6 py-3 text-left font-semibold">Status</th>
										<th className="px-6 py-3 text-left font-semibold">Action</th>
									</tr>
								</thead>

								<tbody>
									{loading ? (
										<tr>
											<td colSpan={7} className="py-8 text-center text-muted-foreground">
												Loading orders...
											</td>
										</tr>
									) : orders.length === 0 ? (
										<tr>
											<td colSpan={7} className="py-8 text-center text-muted-foreground">
												No orders found.
											</td>
										</tr>
									) : (
										orders.map((order) => {
											const config = statusConfig[order.status as keyof typeof statusConfig];
											const StatusIcon = config.icon;
											return (
												<tr
													key={order.id}
													className="border-b hover:bg-muted/30 transition-colors"
												>
													<td className="px-6 py-4 font-medium">{order.id}</td>
													<td className="px-6 py-4">
														<div>
															<p className="font-medium">{order.shippingAddress.name}</p>
															<p className="text-xs text-muted-foreground">
																{order.userEmail}
															</p>
														</div>
													</td>
													<td className="px-6 py-4">
														{(() => {
															const raw = order.createdAt as any;
															const dateObj =
																raw &&
																typeof raw === "object" &&
																typeof raw.toDate === "function"
																	? raw.toDate()
																	: new Date(raw);
															return dateObj.toLocaleDateString();
														})()}
													</td>
													<td className="px-6 py-4">{order.items.length}</td>
													<td className="px-6 py-4 font-semibold text-emerald-500">
														PKR {order.totalAmount.toFixed(2)}
													</td>
													<td className="px-6 py-4">
														<Badge className={`${config.color} flex items-center gap-1`}>
															<StatusIcon className="w-3 h-3" />
															{config.label}
														</Badge>
													</td>
													<td className="px-6 py-4">
														<Link href={`/admin/orders/${order.id}`}>
															<Button variant="ghost" size="sm">
																<Eye className="w-4 h-4" />
															</Button>
														</Link>
													</td>
												</tr>
											);
										})
									)}
								</tbody>
							</table>
						</div>
					</Card>
				</div>
			</main>
		</div>
	);
}
