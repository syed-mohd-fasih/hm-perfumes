"use client";

import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "@/store/features/authSlice";
import { persistor, RootState } from "@/store/store";
import { LucideLogOut } from "lucide-react";

export default function GoogleLoginButton() {
	const dispatch = useDispatch();
	const { user, loading } = useSelector((state: RootState) => state.auth);

	const handleLogin = async () => {
		dispatch(setLoading(true));
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const user = result.user;
			dispatch(
				setUser({
					uid: user.uid,
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
				})
			);
		} catch (error) {
			console.error("Login failed", error);
			dispatch(setLoading(false));
		}
	};

	const handleLogout = async () => {
		await signOut(auth);
		dispatch(setUser(null));
		persistor.purge();
	};

	if (loading) return <p>Loading...</p>;

	return user ? (
		<div className="flex items-center gap-3">
			<img src={user.photoURL || ""} alt="user" className="w-8 h-8 rounded-full" />
			<span>{user.displayName}</span>
			<button onClick={handleLogout} className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5">
				<LucideLogOut className="w-5 h-5" />
			</button>
		</div>
	) : (
		<button
			onClick={handleLogin}
			className="px-4 py-2 rounded-md font-medium w-full
			   bg-black text-white 
			   hover:bg-gray-800
			   dark:bg-white dark:text-black dark:hover:bg-gray-200
			   transition-all duration-200 ease-in-out
			   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
		>
			Sign in with Google
		</button>
	);
}
