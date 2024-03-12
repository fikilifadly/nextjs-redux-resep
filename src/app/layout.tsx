import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ListRecipe from "@/components/ListIngredients";
import StoreProvider from "@/components/StoreProvider";

export const metadata: Metadata = {
	title: "Recipe | Viding",
	description: "List Recipe",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<StoreProvider>
			<html lang="en">
				<body className={`flex w-full p-10 gap-10 max-h-screen h-screen`}>{children}</body>
			</html>
		</StoreProvider>
	);
}
