import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "@/lib/firestore";

interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
}

interface ProductsState {
	items: Product[];
	lastFetched: number | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProductsState = {
	items: [],
	lastFetched: null,
	loading: false,
	error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { getState, rejectWithValue }) => {
	try {
		const state: any = getState();
		const { lastFetched } = state.products;

		const now = Date.now();
		const oneHour = 60 * 60 * 1000;

		if (lastFetched && now - lastFetched < oneHour) {
			return null;
		}

		const rawProducts: { id: string; name?: string; price?: number; description?: string; image?: string }[] =
			await getAllProducts();
		const products = rawProducts.map((product) => ({
			id: product.id,
			name: product.name || "Unknown Product",
			price: product.price || 0,
			description: product.description || "Unknown Description",
			image: product.image || "default-image-url.jpg",
		}));

		return { products, timestamp: now };
	} catch (error: any) {
		return rejectWithValue(error.message || "Failed to fetch products");
	}
});

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;

				if (action.payload) {
					state.items = action.payload.products;
					state.lastFetched = action.payload.timestamp;
				}
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default productsSlice.reducer;
