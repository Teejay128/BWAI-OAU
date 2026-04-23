import { useRef } from "react";
import BlackPillButton from "@/components/BlackPillButton";
import { COLOR_THEMES } from "@/lib/config";

const getThemeHex = (cardClass: string): string => {
	if (cardClass.includes("coreRed")) return "#ea4335";
	if (cardClass.includes("coreYellow")) return "#f9ab00";
	if (cardClass.includes("coreGreen")) return "#34a853";
	if (cardClass.includes("coreBlue")) return "#4285f4";
	return "#1e1e1e";
};

const THEME_COLORS = COLOR_THEMES.map((t) => getThemeHex(t.card));

interface CustomizeTicketFormProps {
	image: string | null;
	onImageChange: (image: string | null) => void;
	bottomText: string;
	onBottomTextChange: (text: string) => void;
	themeColor: string;
	onThemeColorChange: (color: string) => void;
	imageRadius: number;
	onImageRadiusChange: (radius: number) => void;
	onDownload: () => void;
	isDownloading: boolean;
}

export default function CustomizeTicketForm({
	image,
	onImageChange,
	bottomText,
	onBottomTextChange,
	themeColor,
	onThemeColorChange,
	imageRadius,
	onImageRadiusChange,
	onDownload,
	isDownloading,
}: CustomizeTicketFormProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				onImageChange(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-ink/10 shadow-sm flex flex-col gap-6">
			<h3 className="text-xl font-bold text-ink">Ticket Settings</h3>

			<div className="space-y-6">
				{/* Image Upload */}
				<div>
					<label className="block text-sm font-semibold text-ink/80 mb-2">
						Profile Photo
					</label>
					<div className="flex items-center gap-4">
						<div
							className="h-16 w-16 rounded-full bg-ink/5 overflow-hidden flex items-center justify-center border-2 border-dashed border-ink/20 cursor-pointer"
							onClick={() => fileInputRef.current?.click()}
						>
							{image ? (
								<img
									src={image}
									alt="Profile"
									className="h-full w-full object-cover"
								/>
							) : (
								<span className="text-2xl text-ink/40">+</span>
							)}
						</div>
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full transition-colors"
						>
							Upload Image
						</button>
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleImageUpload}
							accept="image/*"
							className="hidden"
						/>
					</div>
				</div>

				{/* Bottom Text */}
				<div>
					<label className="block text-sm font-semibold text-ink/80 mb-2">
						Banner Text
					</label>
					<input
						type="text"
						value={bottomText}
						onChange={(e) => onBottomTextChange(e.target.value)}
						className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-surface/50 text-ink focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
						placeholder="E.g. I'll be at BWAI × GDG OAU"
					/>
				</div>

				{/* Theme Color */}
				<div>
					<label className="block text-sm font-semibold text-ink/80 mb-3">
						Theme Color
					</label>
					<div className="flex items-center gap-4">
						{THEME_COLORS.map((hex, idx) => (
							<button
								key={idx}
								type="button"
								onClick={() => onThemeColorChange(hex)}
								className={`h-8 w-8 rounded-full shadow-sm transition-all duration-200 ${
									themeColor === hex
										? "ring-2 ring-ink ring-offset-2 scale-110"
										: "hover:scale-110 opacity-80 hover:opacity-100"
								}`}
								style={{ backgroundColor: hex }}
								aria-label={`Select theme color ${hex}`}
							/>
						))}
						
						{/* Custom Color Option */}
						<div 
							className={`relative h-8 w-8 rounded-full overflow-hidden shadow-sm transition-all duration-200 ${
								!THEME_COLORS.includes(themeColor)
									? "ring-2 ring-ink ring-offset-2 scale-110"
									: "hover:scale-110 opacity-80 hover:opacity-100"
							}`}
							style={
								THEME_COLORS.includes(themeColor) 
									? { background: "conic-gradient(from 90deg, #ea4335, #f9ab00, #34a853, #4285f4, #ea4335)" } 
									: { backgroundColor: themeColor }
							}
							title="Custom Color"
						>
							<input
								type="color"
								value={!THEME_COLORS.includes(themeColor) ? themeColor : "#ffffff"}
								onChange={(e) => onThemeColorChange(e.target.value)}
								className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
								aria-label="Select custom theme color"
							/>
						</div>
					</div>
				</div>

				{/* Image Shape Slider */}
				<div>
					<label className="block text-sm font-semibold text-ink/80 mb-3">
						Profile Shape
					</label>
					<div className="flex items-center gap-4">
						<span className="text-xs font-medium text-ink/50">Square</span>
						<input
							type="range"
							min="0"
							max="50"
							value={imageRadius}
							onChange={(e) => onImageRadiusChange(Number(e.target.value))}
							className="w-full accent-blue-600 h-2 bg-ink/10 rounded-lg appearance-none cursor-pointer"
						/>
						<span className="text-xs font-medium text-ink/50">Circle</span>
					</div>
				</div>
			</div>

			{/* Download Button moved beneath the form */}
			<div className="mt-4 border-t border-ink/10 pt-6">
				<button
					type="button"
					onClick={onDownload}
					disabled={isDownloading}
					className="group inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-3 font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-coreBlue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-black"
				>
					<span className="text-[0.95rem] text-white group-hover:text-black transition-colors">
						{isDownloading ? "Generating Ticket..." : "Download Ticket"}
					</span>
				</button>
			</div>
		</div>
	);
}
