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
