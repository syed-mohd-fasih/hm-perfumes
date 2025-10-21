"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
	// const searchParams = useSearchParams()
	// const productName = searchParams.get("product")

	return (
		<main className="min-h-screen flex flex-col">
			<Navbar />

			<section className="flex-1 px-4 py-20">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Get in Touch</h1>
						<p className="text-lg text-foreground/60">We'd love to hear from you. Send us a message!</p>
					</div>

					<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-8 md:p-12">
						<ContactForm />
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
