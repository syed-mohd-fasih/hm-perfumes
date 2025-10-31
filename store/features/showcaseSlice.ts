import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getShowcaseFullProducts } from "@/lib/firestore";

interface ShowcaseItem {
	id: string;
	name: string;
	description: string;
	price: number;
	image?: string;
}

interface ShowcaseState {
	items: ShowcaseItem[];
	lastFetched: number | null;
	loading: boolean;
	error: string | null;
}

const initialState: ShowcaseState = {
	items: [],
	lastFetched: null,
	loading: false,
	error: null,
};

export const fetchShowcase = createAsyncThunk("showcase/fetchShowcase", async (_, { getState, rejectWithValue }) => {
	try {
		const state: any = getState();
		const { lastFetched } = state.showcase;

		const now = Date.now();
		const oneHour = 60 * 60 * 1000;

		if (lastFetched && now - lastFetched < oneHour) {
			return null;
		}

		const showcase: { id: string; name?: string; price?: number; description?: string; image?: string }[] =
			await getShowcaseFullProducts();
		return { showcase, timestamp: now };
	} catch (err: any) {
		return rejectWithValue(err.message || "Failed to load showcase");
	}
});

const showcaseSlice = createSlice({
	name: "showcase",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchShowcase.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchShowcase.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.items = action.payload.showcase.map((item) => ({
						id: item.id,
						name: item.name || "Unnamed Product",
						description: item.description || "",
						price: item.price || 0,
						image: item.image || "",
					}));
					state.lastFetched = action.payload.timestamp;
				}
			})
			.addCase(fetchShowcase.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default showcaseSlice.reducer;
