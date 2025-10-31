"use client";

import { AdminNav } from "@/components/admin-nav";
import { ProductForm } from "@/components/product-form";
import { useRouter } from "next/navigation";
import { addProduct } from "@/lib/firestore";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function CreateProductPage() {
	const { user, isAdmin } = useSelector((state: RootState) => state.auth);
	const router = useRouter();

	const handleSubmit = async (data: any) => {
		if (user && isAdmin) {
			try {
				await addProduct({
					name: data.name,
					brand: data.brand,
					description: data.description,
					price: parseFloat(data.price),
					image: data.image,
					ingredients: data.ingredients,
				});

				toast.success("Product created successfully!");
				router.push("/admin/products");
			} catch (error) {
				console.error("Error adding product:", error);
				alert("Failed to add product. Please try again.");
			}
		}
	};

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
