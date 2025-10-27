"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminNav() {
	const router = useRouter();

	const handleLogout = () => {
		router.push("/");
	};

	return (
		<nav className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl m-4 md:m-6">
			<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
				<Link
					href="/admin/dashboard"
					className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent"
				>
					HM Admin
				</Link>

				<div className="hidden md:flex gap-8 items-center">
					<Link
						href="/admin/dashboard"
						className="text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
					>
						Dashboard
					</Link>
					<Link
						href="/admin/products"
						className="text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
					>
						Products
					</Link>
					<Link
						href="/admin/showcase"
						className="text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
					>
						Showcase
					</Link>
					<Link
						href="/admin/messages"
						className="text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
					>
						Messages
					</Link>
				</div>

				<button
					onClick={handleLogout}
					className="px-6 py-2 bg-destructive text-destructive-foreground rounded-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out text-sm font-medium flex items-center gap-2"
				>
					<LogOut className="w-4 h-4" />
					Back to Home
				</button>
			</div>
		</nav>
	);
}
