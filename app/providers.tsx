"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthWatcher } from "@/components/AuthWatcher";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<AuthWatcher />
			{children}
		</Provider>
	);
}
