"use client";

export const dynamic = "force-dynamic";

import { AdminNav } from "@/components/admin-nav";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Edit2 } from "lucide-react";

interface Product {
	id: string;
	name: string;
	price: number;
}

export default function AdminProductsPage() {
	const { isLoggedIn } = useAuth();
	const router = useRouter();
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		if (!isLoggedIn) {
			router.push("/admin/login");
		}
	}, [isLoggedIn, router]);

	useEffect(() => {
		const loadProducts = async () => {
			const res = await fetch("/api/products");
			const data = await res.json();
			setProducts(data);
		};
		loadProducts();
	}, []);

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this product?")) {
			const updatedProducts = products.filter((p) => p.id !== id);
			localStorage.setItem("products", JSON.stringify(updatedProducts));
			setProducts(updatedProducts);
		}
	};

	if (!isLoggedIn) return null;

	return (
		<main className="min-h-screen flex flex-col">
			<AdminNav />

			<section className="flex-1 px-4 py-20">
				<div className="max-w-7xl mx-auto">
					<div className="flex items-center justify-between mb-12">
						<h1 className="text-4xl font-bold">Products</h1>
						<Link
							href="/admin/products/create"
							className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out font-semibold"
						>
							Add Product
						</Link>
					</div>

					<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-border/50">
										<th className="px-6 py-4 text-left font-semibold">Name</th>
										<th className="px-6 py-4 text-left font-semibold">Price</th>
										<th className="px-6 py-4 text-left font-semibold">Actions</th>
									</tr>
								</thead>
								<tbody>
									{products.map((product) => (
										<tr
											key={product.id}
											className="border-b border-border/50 hover:bg-white/5 transition-all duration-300 ease-out"
										>
											<td className="px-6 py-4">{product.name}</td>
											<td className="px-6 py-4">${product.price.toFixed(2)}</td>
											<td className="px-6 py-4 flex gap-3">
												<Link
													href={`/admin/products/${product.id}/edit`}
													className="p-2 hover:bg-primary/20 rounded-lg transition-all duration-300 ease-out"
												>
													<Edit2 className="w-4 h-4" />
												</Link>
												<button
													onClick={() => handleDelete(product.id)}
													className="p-2 hover:bg-destructive/20 rounded-lg transition-all duration-300 ease-out"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
