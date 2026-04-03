import type { Metadata } from "next";
import { Open_Sans, Roboto_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const openSans = Open_Sans({
	subsets: ["latin"],
	variable: "--font-open-sans",
});

const robotoMono = Roboto_Mono({
	subsets: ["latin"],
	variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
	title: "Build With AI",
	description: "2026 GDG OAU Build With AI Event",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${openSans.variable} ${robotoMono.variable} min-h-screen bg-base text-ink antialiased`}
			>
				<div className="flex min-h-screen flex-col">
					<Navbar />
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
