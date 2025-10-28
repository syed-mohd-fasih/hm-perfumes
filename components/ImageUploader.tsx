"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface ImageUploaderProps {
	value: string;
	onChange: (url: string) => void;
	label?: string;
	className?: string;
	endpoint?: keyof OurFileRouter;
}

export function ImageUploader({
	value,
	onChange,
	label = "Upload Image",
	className = "",
	endpoint = "productImage",
}: ImageUploaderProps) {
	return (
		<div className={`space-y-2 ${className}`}>
			{label && <label className="block text-sm font-medium mb-2">{label}</label>}

			{value ? (
				<div className="space-y-2">
					<img
						src={value}
						alt="Uploaded"
						className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-white/20"
					/>
					<button type="button" onClick={() => onChange("")} className="text-sm text-red-500 hover:underline">
						Remove
					</button>
				</div>
			) : (
				<UploadButton<OurFileRouter, typeof endpoint>
					endpoint={endpoint}
					onClientUploadComplete={(res) => {
						const url = res?.[0]?.ufsUrl;
						if (url) onChange(url);
					}}
					onUploadError={(err) => alert(`Upload failed: ${err.message}`)}
				/>
			)}
		</div>
	);
}
