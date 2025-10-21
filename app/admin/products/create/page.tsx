"use client";

import { AdminNav } from "@/components/admin-nav";
import { ProductForm } from "@/components/product-form";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { addProduct } from "@/lib/firestore";

export default function CreateProductPage() {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && (!user || user.email !== "hmperfumes@gmail.com")) {
			router.push("/admin/login");
		}
	}, [user, loading, router]);

	const handleSubmit = async (data: any) => {
		try {
			await addProduct({
				name: data.name,
				brand: data.brand,
				description: data.description,
				price: parseFloat(data.price),
				image: data.image,
				ingredients: data.ingredients,
			});

			router.push("/admin/products");
		} catch (error) {
			console.error("Error adding product:", error);
			alert("Failed to add product. Please try again.");
		}
	};

	if (loading) return <p>Loading...</p>;
	if (!user) return null;

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
