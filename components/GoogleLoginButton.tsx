"use client";

import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "@/store/features/authSlice";
import { RootState } from "@/store/store";

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
	};

	if (loading) return <p>Loading...</p>;

	return user ? (
		<div className="flex items-center gap-3">
			<img src={user.photoURL || ""} alt="user" className="w-8 h-8 rounded-full" />
			<span>{user.displayName}</span>
			<button onClick={handleLogout} className="text-sm underline">
				Logout
			</button>
		</div>
	) : (
		<button onClick={handleLogin} className="px-4 py-2 bg-black text-white rounded-md">
			Sign in with Google
		</button>
	);
}
