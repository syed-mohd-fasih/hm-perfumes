"use client";

import { AdminNav } from "@/components/admin-nav";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllMessages, getAllProducts } from "@/lib/firestore";

export default function AdminDashboardPage() {
	const { isLoggedIn } = useAuth();
	const router = useRouter();
	const [stats, setStats] = useState({ products: 0, messages: 0 });

	useEffect(() => {
		if (!isLoggedIn) {
			router.push("/admin/login");
		}
	}, [isLoggedIn, router]);

	useEffect(() => {
		const loadStats = async () => {
			try {
				const [products, messages] = await Promise.all([getAllProducts(), getAllMessages()]);
				setStats({
					products: products.length,
					messages: messages.length,
				});
			} catch (error) {
				console.error("Error loading stats:", error);
			}
		};
		loadStats();
	}, []);

	if (!isLoggedIn) return null;

	return (
		<main className="min-h-screen flex flex-col">
			<AdminNav />

			<section className="flex-1 px-4 py-20">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-4xl font-bold mb-12">Dashboard</h1>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
						<Link href="/admin/products">
							<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
								<div className="text-4xl mb-4">📦</div>
								<h3 className="text-2xl font-bold mb-2">Total Products</h3>
								<p className="text-4xl font-bold text-primary">{stats.products}</p>
							</div>
						</Link>

						<Link href="/admin/messages">
							<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
								<div className="text-4xl mb-4">💬</div>
								<h3 className="text-2xl font-bold mb-2">Total Messages</h3>
								<p className="text-4xl font-bold text-secondary">{stats.messages}</p>
							</div>
						</Link>
					</div>

					<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8">
						<h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Link
								href="/admin/products/create"
								className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg px-6 py-4 font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out text-center"
							>
								Add New Product
							</Link>
							<Link
								href="/admin/messages"
								className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg px-6 py-4 font-semibold text-foreground hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out text-center"
							>
								View Messages
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
