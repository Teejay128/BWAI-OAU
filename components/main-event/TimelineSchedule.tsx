import { motion } from "framer-motion";
import { EVENT_SCHEDULE, COLOR_THEMES } from "@/lib/config";

// Helper function adapted from your ScheduleCards component
function getCardTheme(index: number) {
	return COLOR_THEMES[index % COLOR_THEMES.length];
}

export default function TimelineSchedule({
	events,
}: {
	events: typeof EVENT_SCHEDULE;
}) {
	return (
		<div className="relative">
			{/* Timeline line - Hidden on mobile, centered on desktop */}
			<div className="absolute left-8 top-0 hidden h-full w-px bg-ink/20 sm:block sm:left-1/2 sm:-translate-x-1/2" />

			<div className="sm:space-y-0">
				{events.map((item, index) => {
					const theme = getCardTheme(index);

					return (
						<motion.div
							key={index}
							className={`relative flex flex-col items-start justify-between mb-8 sm:mb-12 sm:flex-row sm:items-center ${
								index % 2 === 0
									? "sm:flex-row"
									: "sm:flex-row-reverse"
							}`}
							initial={{
								opacity: 0,
								x: index % 2 === 0 ? -30 : 30,
							}}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: false, amount: 0.2 }}
							transition={{
								duration: 0.6,
								ease: "easeOut",
								delay: index * 0.05,
							}}
						>
							{/* 1. Time Badge Side (Desktop Only) */}
							<div
								className={`hidden sm:flex sm:w-[45%] ${
									index % 2 === 0
										? "sm:justify-end"
										: "sm:justify-start"
								}`}
							>
								<div
									className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm font-bold shadow-sm ${theme.timeBg} ${theme.timeText}`}
								>
									<span
										className={`block h-2 w-2 rounded-full animate-pulse ${
											theme.timeText === "text-base"
												? "bg-base"
												: "bg-ink"
										}`}
									/>
									{item.time}
								</div>
							</div>

							{/* Timeline dot (Centered on Desktop) */}
							<div className="absolute left-0 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-base bg-ink shadow-sm sm:left-1/2 sm:block" />

							{/* 2. Content Card Side */}
							<div
								className={`w-full sm:w-[45%] ${
									index % 2 === 0 ? "sm:pl-0" : "sm:pr-0"
								}`}
							>
								<div
									className={`group relative rounded-[1.6rem] border p-5 transition-transform hover:-translate-y-1 sm:p-6 ${theme.card}`}
								>
									{/* Internal Header: Branding + Mobile Time Pill */}
									<div className="mb-5 flex items-center justify-between">
										<img
											src="/branding.png"
											alt="Event card header"
											className="h-4 w-auto opacity-90"
										/>

										{/* Mobile Time Pill (Hidden on Desktop) */}
										<div
											className={`inline-flex sm:hidden items-center gap-2 rounded-full px-3 py-1 font-mono text-xs font-bold shadow-sm ${theme.timeBg} ${theme.timeText}`}
										>
											<span
												className={`block h-1.5 w-1.5 rounded-full animate-pulse ${
													theme.timeText ===
													"text-base"
														? "bg-base"
														: "bg-ink"
												}`}
											/>
											{item.time}
										</div>
									</div>

									<h3
										className={`text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl ${theme.title}`}
									>
										{item.title}
									</h3>

									<p
										className={`mt-3 text-base leading-7 ${theme.summary}`}
									>
										{item.description}
									</p>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
