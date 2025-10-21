"use client";

export const dynamic = "force-dynamic";

import { AdminNav } from "@/components/admin-nav";
import { ProductForm } from "@/components/product-form";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateProductPage() {
	const { isLoggedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) {
			router.push("/admin/login");
		}
	}, [isLoggedIn, router]);

	const handleSubmit = async (data: any) => {
		const products = JSON.parse(localStorage.getItem("products") || "[]");
		const newProduct = {
			...data,
			id: Date.now().toString(),
		};
		products.push(newProduct);
		localStorage.setItem("products", JSON.stringify(products));
		router.push("/admin/products");
	};

	if (!isLoggedIn) return null;

	return (
		<main className="min-h-screen flex flex-col">
			<AdminNav />

			<section className="flex-1 px-4 py-20">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-4xl font-bold mb-12">Create Product</h1>

					<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8">
						<ProductForm onSubmit={handleSubmit} />
					</div>
				</div>
			</section>
		</main>
	);
}
