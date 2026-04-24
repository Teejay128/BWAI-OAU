import { motion } from "motion/react";
import { Speaker } from "@/lib/config";

function SpeakerCard({ index, speaker }: { index: number; speaker: Speaker }) {
	return (
		<motion.div
			key={index}
			className="relative mx-auto flex h-96 w-full max-w-96 flex-col overflow-hidden rounded-lg border-2 bg-surface shadow-lg"
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: false, amount: 0.4 }}
			transition={{
				duration: 0.6,
				delay: index * 0.1,
			}}
		>
			{/* Track Badge - Top Left */}
			<span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-halftoneBlue px-3 py-1 text-xs font-bold text-ink opacity-90">
				{speaker.track}
			</span>

			{/* Image - Full Width Top */}
			<div className="h-64 w-full overflow-hidden border-b-2">
				<img
					src={speaker.photo}
					alt={speaker.name}
					className="h-full w-full object-cover brightness-50 contrast-125 grayscale-75 transition-all duration-300 ease-in-out hover:brightness-75 hover:contrast-100 hover:grayscale-25"
				/>
			</div>

			{/* GDG OAU Logo stuff */}
			<div className="overflow-hidden mt-2">
				<img
					src={"/main-event/speaker-branding.png"}
					alt={"Image branding"}
					className="h-full w-full object-cover"
				/>
			</div>

			{/* Details - Bottom */}
			<div className="flex flex-col flex-1 justify-between px-4 py-2">
				<div>
					<h3 className="mb-1 text-2xl font-extrabold text-ink">
						{speaker.name}
					</h3>
					<p className="text-sm text-ink/75">
						{speaker.title}{" "}
						<span className="mx-2 text-ink/40">•</span>{" "}
						{speaker.organization}
					</p>
				</div>
			</div>
		</motion.div>
	);
}

export default SpeakerCard;
