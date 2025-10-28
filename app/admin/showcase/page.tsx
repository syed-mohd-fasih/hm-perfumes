"use client";

import { Footer } from "@/components/footer";
import { AdminNav } from "@/components/admin-nav";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getAllProducts, getShowcaseProducts, saveShowcaseProducts } from "@/lib/firestore";

export default function ShowcasePage() {
	const [products, setProducts] = useState<any[]>([]);
	const [selected, setSelected] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			const [allProducts, showcaseIds] = await Promise.all([getAllProducts(), getShowcaseProducts()]);

			const updated = allProducts.map((p: any) => ({
				...p,
				featured: showcaseIds.includes(p.id),
			}));

			setProducts(updated);
			setSelected(showcaseIds);
			setLoading(false);
		};

		loadData();
	}, []);

	const toggleFeatured = (id: string) => {
		if (selected.includes(id)) {
			// Remove
			setSelected(selected.filter((pid) => pid !== id));
		} else {
			// Add only if less than 3
			if (selected.length < 3) {
				setSelected([...selected, id]);
			}
		}
	};

	const handleSave = async () => {
		if (selected.length !== 3) {
			alert("You must select exactly 3 products for the showcase.");
			return;
		}
		setSaving(true);
		try {
			await saveShowcaseProducts(selected);
			alert("Showcase updated successfully!");
		} catch (err) {
			console.error(err);
			alert("Error saving showcase.");
		} finally {
			setSaving(false);
		}
	};

	const isDisabled = (id: string) => !selected.includes(id) && selected.length >= 3;

	return (
		<main className="min-h-screen flex flex-col">
			<AdminNav />

			<section className="flex-1 px-4 py-20">
				<div className="max-w-7xl mx-auto">
					<div className="mb-12">
						<h1 className="text-4xl font-bold mb-4">Showcase Management</h1>
						<p className="text-lg text-foreground/60">
							Select which products to feature on the home page ({selected.length}/3)
						</p>
					</div>

					{loading ? (
						<div className="text-center py-12">
							<p className="text-foreground/60">Loading products...</p>
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{products.map((product) => {
									const featured = selected.includes(product.id);
									const disabled = isDisabled(product.id);
									return (
										<div
											key={product.id}
											className={`bg-white/5 dark:bg-black/5 backdrop-blur-lg border rounded-3xl shadow-lg p-6 transition-all duration-300 ease-out cursor-pointer ${
												featured
													? "border-primary/50 ring-2 ring-primary/30"
													: disabled
													? "opacity-50 cursor-not-allowed"
													: "border-white/10 dark:border-white/5 hover:border-white/20"
											}`}
											onClick={() => !disabled && toggleFeatured(product.id)}
										>
											<div className="flex items-start justify-between mb-4">
												<div className="flex-1">
													<h3 className="font-semibold text-lg mb-1">{product.name}</h3>
													<p className="text-sm text-foreground/60 mb-2">
														{product.description}
													</p>
													<p className="text-secondary font-bold">
														${product.price.toFixed(2)}
													</p>
												</div>

												<div className="ml-4">
													{featured ? (
														<div className="p-2 rounded-full bg-primary/20">
															<Eye className="w-6 h-6 text-primary" />
														</div>
													) : (
														<div className="p-2 rounded-full bg-white/10 dark:bg-white/5">
															<EyeOff className="w-6 h-6 text-foreground/40" />
														</div>
													)}
												</div>
											</div>

											<div className="pt-4 border-t border-white/10">
												<p className="text-sm text-foreground/60">
													{featured
														? "✓ Featured on home page"
														: disabled
														? "Maximum 3 products can be selected"
														: "Click to feature on home page"}
												</p>
											</div>
										</div>
									);
								})}
							</div>

							{/* Save Button */}
							<div className="mt-8 text-center">
								<button
									disabled={saving}
									onClick={handleSave}
									className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 disabled:opacity-50 transition"
								>
									{saving ? "Saving..." : "Save Showcase"}
								</button>
							</div>
						</>
					)}

					{/* Info Box */}
					<div className="mt-12 bg-white/5 dark:bg-black/5 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-3xl shadow-lg p-8">
						<h2 className="text-xl font-bold mb-4">How it works</h2>
						<ul className="space-y-3 text-foreground/70">
							<li className="flex gap-3">
								<span className="text-primary font-bold">1.</span>
								<span>Click on any product card to toggle its featured status</span>
							</li>
							<li className="flex gap-3">
								<span className="text-primary font-bold">2.</span>
								<span>Exactly 3 products must be featured at a time</span>
							</li>
							<li className="flex gap-3">
								<span className="text-primary font-bold">3.</span>
								<span>Click “Save Showcase” to update Firestore</span>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
