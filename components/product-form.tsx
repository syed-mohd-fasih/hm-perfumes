"use client";

import { useState } from "react";
import type React from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface ProductFormProps {
	initialData?: {
		name: string;
		description: string;
		price: number;
		image: string;
		ingredients: string;
	};
	onSubmit: (data: any) => void;
	isLoading?: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading = false }: ProductFormProps) {
	const [formData, setFormData] = useState(
		initialData || {
			name: "",
			brand: "HM Perfumes",
			description: "",
			price: "",
			image: "",
			ingredients: "",
		}
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "price" ? Number.parseFloat(value) || "" : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* --- Name --- */}
			<div>
				<label className="block text-sm font-medium mb-2">Product Name</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
					className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="e.g., Amber Essence"
				/>
			</div>

			{/* --- Description --- */}
			<div>
				<label className="block text-sm font-medium mb-2">Description</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					required
					rows={4}
					className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
					placeholder="Describe the perfume..."
				/>
			</div>

			{/* --- Price --- */}
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-2">Price (PKR)</label>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						required
						step="0.01"
						className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="59.99"
					/>
				</div>

				{/* --- Image Upload --- */}
				<div>
					<label className="block text-sm font-medium mb-2">Product Image</label>
					{formData.image ? (
						<div className="space-y-2">
							<img
								src={formData.image}
								alt="Uploaded"
								className="w-32 h-32 object-cover rounded-lg border border-white/20"
							/>
							<button
								type="button"
								onClick={() => setFormData((p) => ({ ...p, image: "" }))}
								className="text-sm text-red-500 hover:underline"
							>
								Remove
							</button>
						</div>
					) : (
						<UploadButton<OurFileRouter, "productImage">
							endpoint="productImage"
							onClientUploadComplete={(res) => {
								const url = res?.[0]?.ufsUrl;
								if (url) {
									setFormData((prev) => ({ ...prev, image: url }));
								}
							}}
							onUploadError={(err) => alert(`Upload failed: ${err.message}`)}
						/>
					)}
				</div>
			</div>

			{/* --- Ingredients --- */}
			<div>
				<label className="block text-sm font-medium mb-2">Ingredients</label>
				<input
					type="text"
					name="ingredients"
					value={formData.ingredients}
					onChange={handleChange}
					required
					className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="e.g., Amber, Vanilla, Musk"
				/>
			</div>

			{/* --- Submit Button --- */}
			<button
				type="submit"
				disabled={isLoading}
				className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out font-semibold disabled:opacity-50"
			>
				{isLoading ? "Saving..." : "Save Product"}
			</button>
		</form>
	);
}
