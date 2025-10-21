"use client";

import type React from "react";

import { useState } from "react";

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
			<div>
				<label className="block text-sm font-medium mb-2">Product Name</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
					className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="e.g., Amber Essence"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Description</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					required
					rows={4}
					className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
					placeholder="Describe the perfume..."
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-2">Price ($)</label>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						required
						step="0.01"
						className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="59.99"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-2">Image URL</label>
					<input
						type="text"
						name="image"
						value={formData.image}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="/images/perfume.jpg"
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Ingredients</label>
				<input
					type="text"
					name="ingredients"
					value={formData.ingredients}
					onChange={handleChange}
					required
					className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="e.g., Amber, Vanilla, Musk"
				/>
			</div>

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
