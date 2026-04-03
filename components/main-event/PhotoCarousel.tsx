"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

// Sample images for your PR (Remember to use compressed < 200kb images!)
const GALLERY_IMAGES = [
	{
		id: 1,
		src: "/gallery/buildwithai-1832.JPG",
		alt: "Students collaborating at BWAI",
	},
	{
		id: 2,
		src: "/gallery/buildwithai-1825.JPG",
		alt: "Keynote speaker on stage",
	},
	{ id: 3, src: "/gallery/buildwithai-1773.JPG", alt: "Audience wide shot" },
	{ id: 4, src: "/gallery/buildwithai-1800.JPG", alt: "Winner presentation" },
	{ id: 5, src: "/gallery/buildwithai-1841.JPG", alt: "Networking session" },
];

export default function PhotoCarousel() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const scrollAmount = direction === "left" ? -350 : 350;
			scrollContainerRef.current.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden bg-yellow-400 p-4 py-12 sm:py-16 shadow-inner">
			{/* Updated Navigation Arrows to be dark for contrast 
        Updated: rounded borders, dark text, dark background hover
      */}
			<div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center px-4 sm:px-6">
				<button
					onClick={() => scroll("left")}
					className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-white/50 text-black backdrop-blur-md transition-all hover:bg-black hover:text-white"
					aria-label="Previous photo"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2.5}
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>
			</div>

			<div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center px-4 sm:px-6">
				<button
					onClick={() => scroll("right")}
					className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-white/50 text-black backdrop-blur-md transition-all hover:bg-black hover:text-white"
					aria-label="Next photo"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2.5}
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>
			</div>

			{/* Scroll Track: Kept high (h-75, h-100) and snap-mandatory.
        Added: h-full to containers for uniform image height.
      */}
			<div
				ref={scrollContainerRef}
				className="scrollbar-hide flex h-75 gap-6 overflow-x-auto snap-x snap-mandatory px-12 sm:h-100"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
			>
				{GALLERY_IMAGES.map((image, i) => (
					<motion.div
						key={image.id}
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{
							duration: 0.5,
							delay: i * 0.1,
							ease: "easeOut",
						}}
						className="relative h-full shrink-0 snap-center overflow-hidden rounded-xl border border-black/10 bg-black/5"
					>
						<img
							src={image.src}
							alt={image.alt}
							className="pointer-events-none h-full w-auto object-contain"
						/>
					</motion.div>
				))}
			</div>
		</div>
	);
}
