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
}

const initialState: AuthState = {
	user: null,
	loading: false,
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
	},
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
