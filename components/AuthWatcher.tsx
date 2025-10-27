"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "@/lib/firebase";
import { setUser, setAdmin, setLoading } from "@/store/features/authSlice";

export function AuthWatcher() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(
					setUser({
						uid: user.uid,
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL,
					})
				);
				dispatch(
					setAdmin(
						user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL_1 ||
							user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL_2
					)
				);
			} else {
				dispatch(setUser(null));
				dispatch(setAdmin(false));
			}
			dispatch(setLoading(false));
		});

		return unsubscribe;
	}, [dispatch]);

	return null;
}
