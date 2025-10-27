import Link from "next/link";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export function Footer() {
	const { isAdmin } = useSelector((state: RootState) => state.auth);

	return (
		<footer className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl m-4 md:m-6 mt-20">
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
					<div>
						<h4 className="font-semibold mb-4">Navigation</h4>
						<ul className="space-y-2 text-sm text-foreground/60">
							<li>
								<Link href="/" className="hover:text-foreground transition-all duration-300 ease-out">
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/products"
									className="hover:text-foreground transition-all duration-300 ease-out"
								>
									Products
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="hover:text-foreground transition-all duration-300 ease-out"
								>
									About
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Support</h4>
						<ul className="space-y-2 text-sm text-foreground/60">
							<li>
								<Link
									href="/contact"
									className="hover:text-foreground transition-all duration-300 ease-out"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{isAdmin && (
						<div>
							<h4 className="font-semibold mb-4">Admin</h4>
							<ul className="space-y-2 text-sm text-foreground/60">
								<li>
									<Link
										href="/admin/dashboard"
										className="hover:text-foreground transition-all duration-300 ease-out"
									>
										Dashboard
									</Link>
								</li>
							</ul>
						</div>
					)}

					<div>
						<h4 className="font-semibold mb-4">Brand</h4>
						<p className="text-sm text-foreground/60">HM Perfumes © 2025</p>
					</div>
				</div>
				<div className="border-t border-border/50 pt-6 text-center text-sm text-foreground/50">
					<p>Crafted with elegance and precision</p>
				</div>
			</div>
		</footer>
	);
}
