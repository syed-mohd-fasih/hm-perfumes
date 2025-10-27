// src/redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
	id: string; // product ID
	name: string;
	price: number;
	image: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	totalQuantity: number;
	totalAmount: number;
}

const initialState: CartState = {
	items: [],
	totalQuantity: 0,
	totalAmount: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const item = action.payload;
			const existing = state.items.find((i) => i.id === item.id);

			if (existing) {
				existing.quantity += item.quantity;
			} else {
				state.items.push(item);
			}

			state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
			state.totalAmount = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
		},

		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
			state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
			state.totalAmount = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
		},

		updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
			const { id, quantity } = action.payload;
			const item = state.items.find((i) => i.id === id);
			if (item) item.quantity = quantity;

			state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
			state.totalAmount = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
		},

		clearCart: (state) => {
			state.items = [];
			state.totalQuantity = 0;
			state.totalAmount = 0;
		},
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
