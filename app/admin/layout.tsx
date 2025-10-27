"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { user, isAdmin, loading } = useSelector((state: RootState) => state.auth);
	const [checkingAccess, setCheckingAccess] = useState(true);

	useEffect(() => {
		setCheckingAccess(true);
		if (!loading) {
			console.log(user, isAdmin);
			if (!user || !isAdmin) {
				router.replace("/");
			}
		}
		setCheckingAccess(false);
	}, [user, isAdmin, loading, router]);

	if (checkingAccess) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Checking access...</p>
			</div>
		);
	} else return <>{children}</>;
}
