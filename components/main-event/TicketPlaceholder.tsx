import { motion } from "motion/react";
import { EVENT_DATES, EVENT_LOCATION } from "@/lib/config";

interface TicketPlaceholderProps {
	image?: string | null;
	bottomText?: string;
	imageRadius?: number;
	themeColor?: string;
}

function TicketPlaceholder({
	image,
	bottomText,
	imageRadius = 12,
	themeColor = "#2563eb", // blue-600 default
}: TicketPlaceholderProps) {
	return (
		<motion.div
			className="w-full max-w-md drop-shadow-2xl rounded-2xl"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.2 }}
		>
			<div
				className="relative overflow-hidden border border-ink/10 bg-cover bg-center bg-no-repeat bg-surface rounded-2xl"
				style={{
					backgroundImage:
						"url('/main-event/gdg-ticket-background.png')",
				}}
			>
				{/* Ticket Top Section */}
				<div
					className="p-6 text-left sm:p-8"
					style={{
						background: `linear-gradient(to bottom right, ${themeColor}1a, transparent)`,
					}}
				>
					<div className="flex items-center justify-between">
						<span
							className="text-xs font-bold uppercase tracking-widest"
							style={{ color: themeColor }}
						>
							Admit One
						</span>
						<span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
							Free Pass
						</span>
					</div>
					<h3 className="mt-5 text-2xl font-bold text-ink">
						GDG OAU X Build with AI 2026
					</h3>
					<div className="mt-2 flex items-center justify-between text-sm">
						<p className="text-ink/60">
							{EVENT_LOCATION.mainEvent}
						</p>
						<p className="font-medium text-ink/80 text-right">
							{EVENT_DATES.mainEvent}
						</p>
					</div>

					<div className="relative mt-6 w-full">
						<img
							src={image || "/main-event/gdg-ticket-avatar.png"}
							alt="Event Ticket"
							className="w-full grayscale-50 opacity-75 object-cover aspect-square shadow-sm transition-all duration-300"
							style={{ borderRadius: `${imageRadius}%` }}
						/>
						<div
							className="absolute inset-x-4 bottom-4 py-2.5 px-4 backdrop-blur-md shadow-xl rounded-xl border border-white/20 flex items-center justify-center"
							style={{ backgroundColor: `${themeColor}e6` }}
						>
							<p className="text-center text-sm font-bold uppercase tracking-wider text-white sm:text-sm drop-shadow-md line-clamp-2 wrap-break-word">
								{bottomText || "I'll be at BWAI × GDG OAU"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default TicketPlaceholder;
