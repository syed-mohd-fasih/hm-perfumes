import { db } from "./firebase";
import {
	collection,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	serverTimestamp,
	query,
	orderBy,
	where,
	DocumentData,
	FieldValue,
} from "firebase/firestore";

/* ------------------------------------------
   🔸 PRODUCTS COLLECTION HELPERS
------------------------------------------ */

// Get all products
export async function getAllProducts() {
	const querySnapshot = await getDocs(collection(db, "products"));
	return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get a single product by ID
export async function getProductById(id: string) {
	const docRef = doc(db, "products", id);
	const snapshot = await getDoc(docRef);
	if (!snapshot.exists()) return null;
	return { id: snapshot.id, ...snapshot.data() };
}

// Add a new product
export async function addProduct(data: {
	name: string;
	brand: string;
	description: string;
	price: number;
	image: string;
	ingredients: string;
}) {
	const docRef = await addDoc(collection(db, "products"), data);
	return docRef.id;
}

// Update an existing product
export async function updateProduct(id: string, data: any) {
	const docRef = doc(db, "products", id);
	await updateDoc(docRef, data);
}

// Delete a product
export async function deleteProduct(id: string) {
	const docRef = doc(db, "products", id);
	await deleteDoc(docRef);
}

/* ------------------------------------------
   🔸 MESSAGES COLLECTION HELPERS
------------------------------------------ */

// Get all messages (newest first)
export async function getAllMessages() {
	const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Add a new message (e.g., from contact form)
export async function addMessage(data: { name: string; email: string; message: string }) {
	const docRef = await addDoc(collection(db, "messages"), {
		...data,
		read: false,
		timestamp: serverTimestamp(),
	});
	return docRef.id;
}

// Mark message as read
export async function markMessageRead(id: string) {
	const docRef = doc(db, "messages", id);
	await updateDoc(docRef, { read: true });
}

// Delete a message
export async function deleteMessage(id: string) {
	const docRef = doc(db, "messages", id);
	await deleteDoc(docRef);
}

/* ------------------------------------------
   🔸 SHOWCASE COLLECTION HELPERS
------------------------------------------ */

// Fetch all productIds for showcase
export const getShowcaseProducts = async () => {
	const snapshot = await getDocs(collection(db, "showcase"));
	return snapshot.docs.map((doc) => doc.data().productId);
};

// Save exactly 3 productIds to showcase (using `productId` field)
export const saveShowcaseProducts = async (productIds: string[]) => {
	const showcaseRef = collection(db, "showcase");

	// Clear old showcase entries
	const existing = await getDocs(showcaseRef);
	const deletePromises = existing.docs.map((d) => deleteDoc(doc(showcaseRef, d.id)));
	await Promise.all(deletePromises);

	// Add new showcase entries
	const addPromises = productIds.map((id) =>
		addDoc(showcaseRef, { productId: id, featuredAt: new Date().toISOString() })
	);

	await Promise.all(addPromises);
};

// Fetch all showcased products (full product objects)
export const getShowcaseFullProducts = async () => {
	const showcaseSnapshot = await getDocs(collection(db, "showcase"));
	const showcaseIds = showcaseSnapshot.docs.map((doc) => doc.data().productId);

	const productsSnapshot = await getDocs(collection(db, "products"));
	const allProducts = productsSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	// Match products with showcase IDs (preserve order if needed)
	return allProducts.filter((p) => showcaseIds.includes(p.id));
};

/* ------------------------------------------
   🔸 ORDERS COLLECTION HELPERS
------------------------------------------ */

export interface OrderItem {
	id: string;
	quantity: number;
}

export interface ShippingAddress {
	name: string;
	phone: string;
	address: string;
}

export interface OrderData {
	id: string | null;
	userId: string | null;
	userEmail: string | null;
	items: OrderItem[];
	totalAmount: number;
	paymentMethod: "cash" | "online";
	paymentProofUrl?: string | undefined;
	status: "pending" | "approved" | "declined" | "shipped" | "delivered";
	createdAt: FieldValue;
	shippingAddress: ShippingAddress;
}

// Create an order (Checkout page)
export const createOrder = async (order: any) => {
	try {
		const docRef = await addDoc(collection(db, "orders"), {
			...order,
			status: "pending",
			createdAt: serverTimestamp(),
		});
		return docRef.id;
	} catch (error) {
		console.error("Error creating order:", error);
		throw error;
	}
};

export async function getOrderById(orderId: string): Promise<OrderData | null> {
	try {
		const orderRef = doc(db, "orders", orderId);
		const snapshot = await getDoc(orderRef);

		if (!snapshot.exists()) return null;
		const data = snapshot.data();

		// Get all product IDs from order items
		const itemIds = data.items.map((item: any) => item.id);

		if (itemIds.length > 0) {
			const productsRef = collection(db, "products");
			const q = query(productsRef, where("__name__", "in", itemIds.slice(0, 10))); // Firestore 'in' limit = 10
			const productSnapshots = await getDocs(q);

			const productsMap: Record<string, DocumentData> = {};
			productSnapshots.forEach((doc) => {
				productsMap[doc.id] = doc.data();
			});

			// Merge product fields directly into item
			data.items = data.items.map((item: any) => {
				const product = productsMap[item.id];
				return product
					? {
							...item,
							name: product.name ?? "Unnamed Product",
							price: product.price ?? 0,
							image: product.image ?? null,
					  }
					: item;
			});
		}

		return {
			id: snapshot.id,
			...data,
			createdAt: data.createdAt?.toDate().toISOString() ?? null,
		} as OrderData;
	} catch (err) {
		console.error("Error fetching order with product details:", err);
		return null;
	}
}

// Update Order Status (Admin Dashboard)
export const updateOrderStatus = async (
	orderId: string,
	newStatus: "pending" | "approved" | "declined" | "shipped" | "delivered"
) => {
	try {
		await updateDoc(doc(db, "orders", orderId), { status: newStatus });
	} catch (error) {
		console.error("Error updating order status:", error);
	}
};

// Fetch user-specific order for tracking
export const getUserOrders = async (userId: string) => {
	const q = query(collection(db, "orders"), where("userId", "==", userId));
	const snapshot = await getDocs(q);

	const orders = await Promise.all(
		snapshot.docs.map(async (d) => {
			const order = d.data();

			// Optional: populate product details for each item
			const populatedItems = await Promise.all(
				order.items.map(async (item: { id: string; quantity: number }) => {
					const productRef = doc(db, "products", item.id);
					const productSnap = await getDoc(productRef);

					if (productSnap.exists()) {
						const productData = productSnap.data();
						return {
							...item,
							name: productData.name,
							image: productData.image,
							price: productData.price,
						};
					} else {
						return item; // fallback if product was deleted
					}
				})
			);

			return {
				id: d.id,
				...order,
				items: populatedItems,
			};
		})
	);

	return orders;
};

// Fetch all orders for admin dashboard
export const getAllOrders = async () => {
	const snapshot = await getDocs(collection(db, "orders"));

	const orders = await Promise.all(
		snapshot.docs.map(async (d) => {
			const order = d.data();

			const populatedItems = await Promise.all(
				order.items.map(async (item: { id: string; quantity: number }) => {
					const productRef = doc(db, "products", item.id);
					const productSnap = await getDoc(productRef);

					if (productSnap.exists()) {
						const productData = productSnap.data();
						return {
							...item,
							name: productData.name,
							image: productData.image,
							price: productData.price,
						};
					} else {
						return item;
					}
				})
			);

			return {
				id: d.id,
				...order,
				items: populatedItems,
			};
		})
	);

	return orders;
};
