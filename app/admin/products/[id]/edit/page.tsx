"use client";

export const dynamic = "force-dynamic";

import { AdminNav } from "@/components/admin-nav";
import { ProductForm } from "@/components/product-form";
import { useAuth } from "@/lib/auth-context";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	ingredients: string;
}

export default function EditProductPage() {
	const { isLoggedIn } = useAuth();
	const router = useRouter();
	const params = useParams();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!isLoggedIn) {
			router.push("/admin/login");
		}
	}, [isLoggedIn, router]);

	useEffect(() => {
		const loadProduct = async () => {
			const res = await fetch("/api/products");
			const products = await res.json();
			const found = products.find((p: Product) => p.id === params.id);
			setProduct(found || null);
			setLoading(false);
		};
		loadProduct();
	}, [params.id]);

	const handleSubmit = async (data: any) => {
		const products = JSON.parse(localStorage.getItem("products") || "[]");
		const index = products.findIndex((p: Product) => p.id === params.id);
		if (index !== -1) {
			products[index] = { ...data, id: params.id };
			localStorage.setItem("products", JSON.stringify(products));
		}
		router.push("/admin/products");
	};

	if (!isLoggedIn) return null;

	if (loading) {
		return (
			<main className="min-h-screen flex flex-col">
				<AdminNav />
				<div className="flex-1 flex items-center justify-center">
					<div className="text-foreground/60">Loading...</div>
				</div>
			</main>
		);
	}

	if (!product) {
		return (
			<main className="min-h-screen flex flex-col">
				<AdminNav />
				<div className="flex-1 flex items-center justify-center">
					<div>Product not found</div>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen flex flex-col">
			<AdminNav />

			<section className="flex-1 px-4 py-20">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-4xl font-bold mb-12">Edit Product</h1>

					<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8">
						<ProductForm initialData={product} onSubmit={handleSubmit} />
					</div>
				</div>
			</section>
		</main>
	);
}
