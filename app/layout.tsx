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
	title: {
		default: "Build With AI 2026 | GDG OAU",
		template: "%s | Build With AI 2026",
	},
	description:
		"Join the 2026 Build With AI event by Google Developer Group OAU. Explore AI innovation, meet inspiring speakers, and build amazing projects with cutting-edge AI technologies.",
	keywords: [
		"Build With AI",
		"GDG OAU",
		"Google Developer Group",
		"AI Event",
		"Technology",
		"Innovation",
		"2026",
	],
	authors: [{ name: "Google Developer Group OAU" }],
	creator: "GDG OAU",
	publisher: "Google Developer Group OAU",
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://bwaioau.site",
		siteName: "Build With AI 2026",
		title: "Build With AI 2026 | GDG OAU",
		description:
			"Join the 2026 Build With AI event by Google Developer Group OAU. Explore AI innovation, meet inspiring speakers, and build amazing projects.",
		images: [
			{
				url: "/icon.png",
				width: 1200,
				height: 630,
				alt: "Build With AI 2026 Event",
				type: "image/png",
			},
			{
				url: "/icon.png",
				width: 800,
				height: 600,
				alt: "Build With AI 2026 Event",
				type: "image/png",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Build With AI 2026 | GDG OAU",
		description:
			"Join the 2026 Build With AI event by Google Developer Group OAU.",
		images: ["/icon.png"],
		creator: "@gdgoau",
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 5,
	},
	icons: {
		icon: "/icon.svg",
		apple: "/icon.svg",
	},
	manifest: "/site.webmanifest",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Build With AI 2026",
	},
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
