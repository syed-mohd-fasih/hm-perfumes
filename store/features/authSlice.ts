import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	uid: string;
	displayName: string | null;
	email: string | null;
	photoURL: string | null;
}

interface AuthState {
	user: User | null;
	loading: boolean;
	isAdmin: boolean;
}

const initialState: AuthState = {
	user: null,
	loading: false,
	isAdmin: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.loading = false;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setAdmin: (state, action: PayloadAction<boolean>) => {
			state.isAdmin = action.payload;
		},
	},
});

export const { setUser, setLoading, setAdmin } = authSlice.actions;
export default authSlice.reducer;
