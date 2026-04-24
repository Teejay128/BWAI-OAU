"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { motion } from "motion/react";
import { MdLocationPin } from "react-icons/md";

import BlackPillButton from "@/components/BlackPillButton";
import SpeakerCard from "@/components/main-event/SpeakerCard";
import PhotoCarousel from "@/components/main-event/PhotoCarousel";
import TimelineSchedule from "@/components/main-event/TimelineSchedule";
import TicketPlaceholder from "@/components/main-event/TicketPlaceholder";
import CustomizeTicketForm from "@/components/main-event/CustomizeTicketForm";
import {
	EVENT_DATES,
	EVENT_SPEAKERS,
	EVENT_SCHEDULE,
	EVENT_LOCATION,
} from "@/lib/config";

export default function MainEventSection() {
	const [image, setImage] = useState<string | null>(null);
	const [bottomText, setBottomText] = useState("I'll be at BWAI × GDG OAU");
	const [imageRadius, setImageRadius] = useState<number>(12);
	const [themeColor, setThemeColor] = useState("#4285f4");

	const ticketRef = useRef<HTMLDivElement>(null);
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async () => {
		if (!ticketRef.current) return;

		setIsDownloading(true);
		try {
			const dataUrl = await toPng(ticketRef.current, {
				cacheBust: true,
				pixelRatio: 3,
			});
			const link = document.createElement("a");
			link.download = "bwai-gdg-ticket.png";
			link.href = dataUrl;
			link.click();
		} catch (err) {
			console.error("Failed to generate ticket image:", err);
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<motion.section id="main-event" className="w-full overflow-x-hidden">
			{/* Hero Block */}
			<section
				className="relative overflow-hidden px-4 pb-14 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-18 lg:pt-24 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url('/gdg-hero-background.png')" }}
			>
				<motion.div
					className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: false, amount: 0.4 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<motion.p
						className="font-openSans text-xs font-medium text-black/80 sm:text-sm"
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.65, delay: 0.1 }}
					>
						GDG OAU × Build with AI 2026
					</motion.p>
					<motion.h1
						className="mt-5 text-5xl font-bold leading-[1.04] text-black sm:text-6xl lg:text-7xl"
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.65, delay: 0.18 }}
					>
						{EVENT_DATES.mainEvent}
					</motion.h1>
					<motion.p
						className="mt-4 max-w-2xl leading-7 text-black/90 sm:text-lg"
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.65, delay: 0.26 }}
					>
						{EVENT_LOCATION.mainEvent}
						<MdLocationPin className="inline" />
					</motion.p>
					<motion.p
						className="mt-2 text-sm text-black/75"
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.65, delay: 0.34 }}
					>
						Theme: Build. Shift. Scale
					</motion.p>
					<motion.div
						className="mt-8 flex flex-wrap items-center justify-center gap-3"
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.65, delay: 0.42 }}
					>
						<BlackPillButton
							label="Register Now"
							href="#register"
							// Kept the button dark to contrast well against the new light background
							className="bg-black text-white hover:bg-black/90"
						/>
					</motion.div>
				</motion.div>
			</section>

			{/* Day Schedule */}
			<section className="px-4 py-16 sm:px-6 lg:px-8">
				<motion.div className="mx-auto max-w-5xl">
					<motion.h2
						className="mb-16 flex items-center justify-center gap-2 sm:gap-3 text-center text-2xl font-bold text-ink sm:text-4xl"
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.4 }}
						transition={{ duration: 0.6 }}
					>
						Schedule
						<img
							src="/branding.png"
							alt="GDG Branding"
							className="h-6 sm:h-8 w-auto"
						/>
					</motion.h2>
					<TimelineSchedule events={EVENT_SCHEDULE} />
				</motion.div>
			</section>

			{/* Speakers Grid */}
			<section className="px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-6xl">
					<motion.h2
						className="mb-12 flex items-center justify-center gap-2 sm:gap-3 text-center text-2xl font-bold text-ink sm:text-4xl"
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.4 }}
						transition={{ duration: 0.6 }}
					>
						Speakers
						<img
							src="/branding.png"
							alt="GDG Branding"
							className="h-6 sm:h-8 w-auto"
						/>
					</motion.h2>

					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
						{EVENT_SPEAKERS.map((speaker, index) => (
							<SpeakerCard
								key={index}
								index={index}
								speaker={speaker}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Photo Gallery */}
			<section className="px-4 py-16 sm:px-6 lg:px-8">
				<motion.div className="mx-auto max-w-6xl">
					<motion.h2
						className="mb-6 flex items-center justify-center gap-2 sm:gap-3 text-center text-2xl font-bold text-ink sm:text-4xl"
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.4 }}
						transition={{ duration: 0.6 }}
					>
						Gallery
						<img
							src="/branding.png"
							alt="GDG Branding"
							className="h-6 sm:h-8 w-auto"
						/>
					</motion.h2>

					{/* Render the extracted interactive component */}
					<PhotoCarousel />
				</motion.div>
			</section>

			{/* Customize Ticket Section */}
			<section className="px-4 py-16 sm:px-6 lg:px-8 bg-surface/50">
				<div className="mx-auto max-w-6xl">
					<motion.div
						className="mb-12 text-center"
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.4 }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="flex items-center justify-center gap-2 sm:gap-3 text-2xl font-bold text-ink sm:text-4xl">
							Customization
							<img
								src="/branding.png"
								alt="GDG Branding"
								className="h-6 sm:h-8 w-auto"
							/>
						</h2>
						<p className="mt-4 text-ink/70 max-w-2xl mx-auto">
							Personalize your event ticket with your own photo,
							custom text, shape, and brand color before
							downloading it to share.
						</p>
					</motion.div>

					<div className="grid gap-12 lg:grid-cols-2 items-start justify-items-center">
						<motion.div
							className="w-full flex justify-center"
							initial={{ opacity: 0, x: -24 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: false, amount: 0.4 }}
							transition={{ duration: 0.6, delay: 0.1 }}
						>
							<CustomizeTicketForm
								image={image}
								onImageChange={setImage}
								bottomText={bottomText}
								onBottomTextChange={setBottomText}
								themeColor={themeColor}
								onThemeColorChange={setThemeColor}
								imageRadius={imageRadius}
								onImageRadiusChange={setImageRadius}
								onDownload={handleDownload}
								isDownloading={isDownloading}
							/>
						</motion.div>

						<motion.div
							className="w-full flex justify-center"
							initial={{ opacity: 0, x: 24 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: false, amount: 0.4 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<div className="p-4 -m-4">
								<TicketPlaceholder
									ref={ticketRef}
									image={image}
									bottomText={bottomText}
									themeColor={themeColor}
									imageRadius={imageRadius}
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Register CTA */}
			<section id="register" className="px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.4 }}
						transition={{ duration: 0.6 }}
						className="flex flex-col items-center"
					>
						<p className="max-w-2xl text-lg leading-8 text-ink/70">
							Join hundreds of developers, designers, and AI
							enthusiasts for a day of hands-on workshops, expert
							talks, and networking.
						</p>

						<div className="mt-10">
							<BlackPillButton
								label="Register Now"
								href="https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/"
							/>
						</div>
					</motion.div>
				</div>
			</section>
		</motion.section>
	);
}
