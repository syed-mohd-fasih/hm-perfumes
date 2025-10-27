import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	productImage: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(({ file }) => {
		console.log("File uploaded:", file.ufsUrl);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
