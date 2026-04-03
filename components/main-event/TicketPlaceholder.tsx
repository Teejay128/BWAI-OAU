import { motion } from "motion/react";

function TicketPlaceholder() {
	return (
		<motion.div
			className="mt-16 w-full max-w-md drop-shadow-2xl"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.2 }}
		>
			<div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-surface">
				{/* Ticket Top Section */}
				<div className="bg-linear-to-br from-blue-500/10 to-transparent p-6 text-left sm:p-8">
					<div className="flex items-center justify-between">
						<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
							Admit One
						</span>
						<span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
							Free Pass
						</span>
					</div>
					<h3 className="mt-5 text-2xl font-bold text-ink">
						Build with AI 2026
					</h3>
					<p className="mt-1 text-sm text-ink/60">
						Obafemi Awolowo University
					</p>

					{/* Uncomment this if the team gives you a real ticket graphic to use later */}
					{/* <img src="/images/ticket-mockup.png" alt="Event Ticket" className="mt-6 w-full rounded-lg shadow-sm" /> */}
				</div>

				{/* Perforation Line Trick */}
				<div className="relative flex items-center bg-surface px-4">
					{/* Left Cutout */}
					<div className="absolute -left-4 h-8 w-8 rounded-full bg-background shadow-inner"></div>
					<div className="h-px w-full border-b-[3px] border-dashed border-ink/20"></div>
					{/* Right Cutout */}
					<div className="absolute -right-4 h-8 w-8 rounded-full bg-background shadow-inner"></div>
				</div>

				{/* Ticket Bottom Section (Barcode) */}
				<div className="bg-surface p-6 sm:p-8">
					<div className="flex h-16 w-full items-center justify-center rounded bg-ink/5">
						{/* Fake Barcode Lines using text formatting */}
						<span className="font-mono text-2xl tracking-[0.4em] text-ink/30">
							|||| | || ||| || ||| |
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default TicketPlaceholder;
