import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import productsReducer from "./features/productsSlice";
import showcaseReducer from "./features/showcaseSlice";

// --- Combined Slices ---
const rootReducer = combineReducers({
	auth: authReducer,
	cart: cartReducer,
	products: productsReducer,
	showcase: showcaseReducer,
});

// --- Persistence Config ---
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart", "products", "showcase"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
