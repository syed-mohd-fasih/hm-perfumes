"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function AdminLoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		if (login(email, password)) {
			router.push("/admin/dashboard");
		} else {
			setError("Invalid email or password");
		}

		setLoading(false);
	};

	return (
		<main className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<Link
						href="/"
						className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent"
					>
						HM Perfumes
					</Link>
					<h1 className="text-3xl font-bold mt-6 mb-2">Admin Login</h1>
					<p className="text-foreground/60">Sign in to access the admin panel</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8 space-y-6"
				>
					{error && (
						<div className="backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-4 bg-destructive/10 text-destructive">
							{error}
						</div>
					)}

					<div>
						<label className="block text-sm font-medium mb-2">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="admin@example.com"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out font-semibold disabled:opacity-50"
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>

					<div className="text-center text-sm text-foreground/60">
						<p>Demo credentials:</p>
						<p>Email: admin@example.com</p>
						<p>Password: password123</p>
					</div>
				</form>

				<div className="text-center mt-6">
					<Link href="/" className="text-primary hover:underline">
						Back to home
					</Link>
				</div>
			</div>
		</main>
	);
}
