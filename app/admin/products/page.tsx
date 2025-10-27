"use client";

import { AdminNav } from "@/components/admin-nav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Edit2 } from "lucide-react";
import { getAllProducts, deleteProduct } from "@/lib/firestore";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function AdminProductsPage() {
	const router = useRouter();
	const { user, isAdmin } = useSelector((state: RootState) => state.auth);
	const [products, setProducts] = useState<any[]>([]);

	useEffect(() => {
		const loadProducts = async () => {
			getAllProducts().then(setProducts);
		};
		loadProducts();
	}, []);

	const handleDelete = async (id: string) => {
		const confirmDelete = confirm("Are you sure you want to delete this product?");
		if (!confirmDelete) return;

		if (user && isAdmin) {
			try {
				await deleteProduct(id);
				setProducts((prev) => prev.filter((p) => p.id !== id));
			} catch (error) {
				console.error("Error deleting product:", error);
			}
		}
	};

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
