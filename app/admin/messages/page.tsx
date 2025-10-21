"use client";

import { AdminNav } from "@/components/admin-nav";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2, Check } from "lucide-react";
import { getAllMessages, markMessageRead, deleteMessage } from "@/lib/firestore";

export default function AdminMessagesPage() {
	const { user, loading } = useAuth();
	const router = useRouter();
	const [messages, setMessages] = useState<any[]>([]);

	useEffect(() => {
		if (!loading && (!user || user.email !== "hmperfumes@gmail.com")) {
			router.push("/admin/login");
		}
	}, [user, loading, router]);

	// Load messages from Firestore
	useEffect(() => {
		async function loadMessages() {
			try {
				const data = await getAllMessages();
				setMessages(data);
			} catch (error) {
				console.error("Error loading messages:", error);
			}
		}

		loadMessages();
	}, []);

	// Toggle read/unread in Firestore
	const handleMarkAsRead = async (id: string) => {
		try {
			await markMessageRead(id);
			// Update locally after successful Firestore update
			setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
		} catch (error) {
			console.error("Error marking message as read:", error);
		}
	};

	// Delete message in Firestore
	const handleDelete = async (id: string) => {
		try {
			await deleteMessage(id);
			setMessages((prev) => prev.filter((m) => m.id !== id));
		} catch (error) {
			console.error("Error deleting message:", error);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (!user) return null;

	return (
		<main className="min-h-screen flex flex-col">
			<AdminNav />

			<section className="flex-1 px-4 py-20">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-4xl font-bold mb-12">Messages</h1>

					{messages.length === 0 ? (
						<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-12 text-center">
							<p className="text-foreground/60">No messages yet</p>
						</div>
					) : (
						<div className="space-y-4">
							{messages.map((msg) => (
								<div
									key={msg.id}
									className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg p-6 ${
										msg.read ? "opacity-60" : ""
									}`}
								>
									<div className="flex items-start justify-between mb-4">
										<div className="flex-1">
											<h3 className="font-semibold text-lg">{msg.name}</h3>
											<p className="text-sm text-foreground/60">{msg.email}</p>
											<p className="text-xs text-foreground/40 mt-1">
												{new Date(msg.timestamp).toLocaleString()}
											</p>
										</div>
										<div className="flex gap-2">
											<button
												onClick={() => handleMarkAsRead(msg.id)}
												className="p-2 hover:bg-primary/20 rounded-lg transition-all duration-300 ease-out"
												title={msg.read ? "Mark as unread" : "Mark as read"}
											>
												<Check className={`w-4 h-4 ${msg.read ? "text-primary" : ""}`} />
											</button>
											<button
												onClick={() => handleDelete(msg.id)}
												className="p-2 hover:bg-destructive/20 rounded-lg transition-all duration-300 ease-out"
											>
												<Trash2 className="w-4 h-4" />
											</button>
										</div>
									</div>
									<p className="text-foreground/70">{msg.message}</p>
								</div>
							))}
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
