"use client";

import { AdminNav } from "@/components/admin-nav";
import { ProductForm } from "@/components/product-form";
import { useAuth } from "@/lib/auth-context";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "@/lib/firestore";

export default function EditProductPage() {
	const { user, loading } = useAuth();
	const router = useRouter();
	const params = useParams();
	const [product, setProduct] = useState<any>(null);
	const [_loading, setLoading] = useState(true);

	useEffect(() => {
		if (!loading && !user) {
			router.push("/admin/login");
		}
	}, [user, loading, router]);

	useEffect(() => {
		const loadProduct = async () => {
			getProductById(`${params.id}`).then(setProduct);
			setLoading(false);
		};
		loadProduct();
	}, [params.id]);

	const handleSubmit = async (data: any) => {
		try {
			await updateProduct(`${params.id}`, {
				name: data.name,
				brand: data.brand,
				description: data.description,
				price: parseFloat(data.price),
				image: data.image,
				ingredients: data.ingredients,
			});

			router.push("/admin/products");
		} catch (error) {
			console.error("Error updating product:", error);
			alert("Failed to update product. Please try again.");
		}
	};

	if (!user) return null;

	if (_loading) {
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
