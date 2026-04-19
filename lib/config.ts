export const EVENT_DATES = {
	preseries: ["April 18, 2026", "April 25, 2026", "April 29, 2026"],
	mainEvent: "May 16, 2026",
};

export const COMMUNITIES = [
	"Data Science & ML",
	"Mobile & Web Dev",
	"Cloud",
	"Cybersecurity",
	"Game Development",
	"Quantum Finance",
];

export const NAV_LINKS = [
	{ label: "Pre-Series", href: "/schedule" },
	{ label: "Sponsors", href: "/sponsors" },
	{ label: "Main Event", href: "/main-event" },
	{ label: "What Was Built", href: "/what-was-built" },
];

export const SOCIAL_LINKS = [
	{ label: "Instagram", href: "https://www.instagram.com/gdgoau" },
	{ label: "Twitter/X", href: "https://x.com/GDGOAU" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/company/gdg-oau/" },
];

export const SITE_LINKS = {
	registerInterest:
		"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
	sponsors: "https://forms.gle/vQCa2oxraWAFJ6sL9",
	mainEvent: "/main-event",
	preSeries: "/pre-series",
	schedule: "/schedule",
	whatWasBuilt: "/what-was-built",
};

export const HERO_PILLS = [
	{ label: "Data Science & ML", tone: "coreBlue" },
	{ label: "Mobile & Web Dev", tone: "coreGreen" },
	{ label: "Cloud", tone: "surface" },
	{ label: "Cybersecurity", tone: "surface" },
	{ label: "Game Development", tone: "coreYellow" },
	{ label: "Quantum Finance", tone: "coreRed" },
] as const;

export const HERO_PILL_TONE_COLORS = {
	coreBlue: "#57caff",
	coreGreen: "#5cdb6d",
	coreYellow: "#ffd427",
	coreRed: "#ff7daf",
	surface: "#f2f2f2",
	gray: "#d8d8d8",
} as const;

export const HOMEPAGE_ABOUT = [
	"Build with AI Week 2026 is GDG OAU's campus-wide celebration of building with modern AI tools, practical community knowledge, and real project work.",
	"Across the pre-series sessions and the main event, each community gets a lane to teach, ship, and showcase what they are building.",
];

export const PRESERIES_EVENTS = [
	{
		community: "Data Science & ML",
		title: "Prompting for Data Workflows",
		date: "April 18, 2026",
		location: "VirtualLab",
		format: "Workshop",
		registrationHref:
			"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
		photoAlbumHref: "#",
		accent: "coreBlue",
		status: "upcoming",
	},
	{
		community: "Mobile & Web Dev",
		title: "Shipping an AI Companion UI",
		date: "April 25, 2026",
		location: "Engineering Hall",
		format: "Workshop",
		registrationHref:
			"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
		photoAlbumHref: "#",
		accent: "coreGreen",
		status: "upcoming",
	},
	{
		community: "Cloud & Cybersecurity",
		title: "Guardrails for Real Products",
		date: "April 29, 2026",
		location: "OAU Tech Hub",
		format: "Panel",
		registrationHref:
			"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
		photoAlbumHref: "#",
		accent: "coreYellow",
		status: "upcoming",
	},
] as const;

export type ScheduleEvent = {
	id: number;
	order: number;
	date: string;
	title: string;
	summary: string;
	track: string;
	sessionType: string;
	time: string;
	location: string;
	ticketHref: string;
};

export const SCHEDULE_DEFAULT_EVENTS: ScheduleEvent[] = [
	{
		id: 1,
		order: 1,
		date: "April 18, 2026",
		title: "Prompting for Data Workflows",
		summary:
			"Exploring practical prompting and model-evaluation approaches for data-focused products.",
		track: "Insight & Intelligence",
		sessionType: "Pre-Series Workshop",
		time: "10:00 AM",
		location: "VirtualLab",
		ticketHref:
			"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
	},
	{
		id: 2,
		order: 2,
		date: "April 25, 2026",
		title: "Shipping an AI Companion UI",
		summary:
			"A product-focused session on building human-centered AI interfaces for web and mobile.",
		track: "Agents & Autonomy",
		sessionType: "Pre-Series Technical",
		time: "11:30 AM",
		location: "Engineering Hall",
		ticketHref:
			"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
	},
	{
		id: 3,
		order: 3,
		date: "April 29, 2026",
		title: "Guardrails for Real Products",
		summary:
			"Security, governance, and reliability patterns for AI products shipped in production.",
		track: "Cloud & Security",
		sessionType: "Pre-Series Panel",
		time: "2:00 PM",
		location: "OAU Tech Hub",
		ticketHref:
			"https://gdg.community.dev/events/details/google-gdg-on-campus-obafemi-awolowo-university-ife-nigeria-presents-build-with-ai-oau-build-shift-scale/",
	},
];

export const SPONSOR_TIERS = [
	{
		tier: "Diamond",
		sponsors: [
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder.svg",
					alt: "Diamond sponsor logo placeholder",
				},
			},
		],
	},
	{
		tier: "Platinum",
		sponsors: [
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder.svg",
					alt: "Platinum sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder.svg",
					alt: "Platinum sponsor logo placeholder",
				},
			},
		],
	},
	{
		tier: "Gold",
		sponsors: [
			{
				href: "https://www.bayse.markets/",
				logo: {
					src: "/sponsors/bayse.png",
					alt: "Bayse",
				},
			},
		],
	},
	{
		tier: "Silver",
		sponsors: [
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Silver sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Silver sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Silver sponsor logo placeholder",
				},
			},
		],
	},
	{
		tier: "Bronze",
		sponsors: [
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Bronze sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Bronze sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Bronze sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Bronze sponsor logo placeholder",
				},
			},
		],
	},
	{
		tier: "Nano",
		sponsors: [
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Nano sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Nano sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Nano sponsor logo placeholder",
				},
			},
			{
				href: "#",
				logo: {
					src: "/sponsor-placeholder-sm.svg",
					alt: "Nano sponsor logo placeholder",
				},
			},
		],
	},
] as const;

export type SponsorRecord = {
	name: string;
	href: string;
	logo: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
};

export type SponsorLevelGroup = {
	level: "Headline" | "Platinum" | "Gold" | "Silver" | "Bronze" | "Nano";
	sponsors: SponsorRecord[];
};

// Manually maintain this list with your real sponsors before each deploy.
export const SPONSOR_LEVEL_GROUPS: SponsorLevelGroup[] = [
	{
		level: "Headline",
		sponsors: [],
	},
	{
		level: "Platinum",
		sponsors: [
			{
				name: "African Technology Forum",
				href: "https://www.atfchallenge.org/apply?channel=WDVBKMUJ",
				logo: {
					src: "/sponsors/atf.png",
					alt: "African Technology Forum",
					width: 200,
					height: 80,
				},
			},
		],
	},
	{
		level: "Gold",
		sponsors: [
			{
				name: "Bayse",
				href: "https://www.bayse.markets/",
				logo: {
					src: "/sponsors/bayse.png",
					alt: "Bayse",
					width: 200,
					height: 80,
				},
			},
		],
	},
	{
		level: "Silver",
		sponsors: [],
	},
	{
		level: "Bronze",
		sponsors: [],
	},
	{
		level: "Nano",
		sponsors: [],
	},
] as const;

export type CommunityPartner = {
	name: string;
	href: string;
	logo: { src: string; alt: string; width: number; height: number };
};

// Add real community partners here. Images go in public/partners/
export const COMMUNITY_PARTNERS: CommunityPartner[] = [
	{
		name: "Community Partner 1",
		href: "#",
		logo: {
			src: "/partners/Mask group.png",
			alt: "Community Partner",
			width: 200,
			height: 80,
		},
	},
	{
		name: "Community Partner 2",
		href: "#",
		logo: {
			src: "/partners/IMG-20260404-WA0028.jpg",
			alt: "Community Partner",
			width: 200,
			height: 80,
		},
	},
	{
		name: "Community Partner 3",
		href: "#",
		logo: {
			src: "/partners/IMG_6519.JPG",
			alt: "Community Partner",
			width: 200,
			height: 80,
		},
	},
];

export const FOOTER_CREDIT = "Powered by Google Developer Groups";

export const GDG_OAU_LOGO = {
	src: "/gdg-oau-logo.svg",
	alt: "GDG OAU",
};

export const CONTACT = {
	blessing: "blessingngoziagbor@gmail.com",
	samuel: "blendert5@gmail.com",
	general: "oaudsc@gmail.com",
};

export const LUMA_LINKS = {
	buildathon1: "#",
	buildathon2: "#",
	buildathon3: "#",
};

// ── What Was Built ────────────────────────────────────────────────────────────

export type ProjectCommunity = (typeof COMMUNITIES)[number];

export type Project = {
	id: number;
	community: ProjectCommunity;
	tags: string[];
	name: string;
	description: string;
	techTags: string[];
	demoHref: string;
	likes: number;
};

export const COMMUNITY_COLORS: Record<string, string> = {
	"Data Science & ML": "#ccf6c5",
	"Mobile & Web Dev": "#ff7daf",
	"Cloud & Cybersecurity": "#c3ecf6",
	"Game Dev & Design": "#ffe7a5",
	"The Creative Track": "#f8d8d8",
	"GDG OAU": "#57caff",
};

export const TECH_TAG_COLORS: Record<string, string> = {
	"Gemini API": "#d357ff",
	"Google ADK": "#db8f5c",
	Firebase: "#ffd427",
	"Vertex AI": "#ff7daf",
	"Cloud Run": "#5cdb6d",
	"Bayse API": "#57caff",
};

export const WHAT_WAS_BUILT_PROJECTS: Project[] = [
	{
		id: 1,
		community: "Data Science & ML",
		tags: ["Pre-Series"],
		name: "EcoScan AI",
		description:
			"Real-time waste classification using Gemini Vision for university campuses.",
		techTags: ["Gemini API", "ADK"],
		demoHref: "#",
		likes: 24,
	},
	{
		id: 2,
		community: "Mobile & Web Dev",
		tags: [],
		name: "PulseQuest",
		description:
			"Gamified mental health tracker powered by Firebase and Google AI Studio.",
		techTags: ["Gemini API"],
		demoHref: "#",
		likes: 56,
	},
	{
		id: 3,
		community: "Data Science & ML",
		tags: ["Pre-Series"],
		name: "LexiLegal",
		description:
			"Simplifying Nigerian legal documents for entrepreneurs using LLMs.",
		techTags: ["Gemini API", "ADK"],
		demoHref: "#",
		likes: 102,
	},
	{
		id: 4,
		community: "Data Science & ML",
		tags: [],
		name: "AgriFlow",
		description:
			"Predictive irrigation scheduling for small-scale farmers in Oyo State.",
		techTags: ["ADK"],
		demoHref: "#",
		likes: 39,
	},
	{
		id: 5,
		community: "The Creative Track",
		tags: [],
		name: "SonicCanvas",
		description:
			"Turning spoken Yoruba poetry into generative digital art sequences.",
		techTags: ["Gemini API"],
		demoHref: "#",
		likes: 88,
	},
	{
		id: 6,
		community: "Cloud & Cybersecurity",
		tags: [],
		name: "SecureNodes",
		description:
			"AI-driven threat detection for multi-cloud infrastructure deployments.",
		techTags: ["ADK"],
		demoHref: "#",
		likes: 15,
	},
];

export type Speaker = {
	name: string;
	title: string;
	photo: string;
	organization: string;
	track: string;
};

export const EVENT_SPEAKERS: Speaker[] = [
	{
		name: "Coming Soon...",
		title: "To Be Announced",
		organization: "TBA",
		track: "AI Research",
		photo: "gdg-speaker-avatar.png",
	},
	{
		name: "Coming Soon...",
		title: "To Be Announced",
		organization: "TBA",
		track: "Data Science & ML",
		photo: "gdg-speaker-avatar.png",
	},
	{
		name: "Coming Soon...",
		title: "To Be Announced",
		organization: "TBA",
		track: "Mobile & Web Dev",
		photo: "gdg-speaker-avatar.png",
	},
	{
		name: "Coming Soon...",
		title: "To Be Announced",
		organization: "TBA",
		track: "Cloud & Cybersecurity",
		photo: "gdg-speaker-avatar.png",
	},
	{
		name: "Coming Soon...",
		title: "To Be Announced",
		organization: "TBA",
		track: "Game Dev & Design",
		photo: "gdg-speaker-avatar.png",
	},
	{
		name: "Coming Soon...",
		title: "To Be Announced",
		organization: "TBA",
		track: "The Creative Track",
		photo: "gdg-speaker-avatar.png",
	},
];

export const EVENT_LOCATION = {
	mainEvent: "BOOC, Obafemi Awolowo University",
	preSeries: "",
};

export const EVENT_SCHEDULE = [
	{
		time: "9:00 AM",
		title: "Registration & Welcome",
		description: "Check-in and networking breakfast",
	},
	{
		time: "10:00 AM",
		title: "Opening Keynote",
		description: "Welcome address and event overview",
	},
	{
		time: "11:00 AM",
		title: "Community Presentations",
		description: "Showcase of pre-series projects",
	},
	{
		time: "1:00 PM",
		title: "Lunch Break",
		description: "Networking and refreshments",
	},
	{
		time: "2:00 PM",
		title: "Panel Discussions",
		description: "Industry experts share insights",
	},
	{
		time: "4:00 PM",
		title: "Closing Ceremony",
		description: "Awards and next steps",
	},
];

export const COLOR_THEMES = [
	{
		card: "bg-coreRed/25 border-ink/55",
		title: "text-ink",
		summary: "text-ink/90",
		timeBg: "bg-ink",
		timeText: "text-base", // Assumes 'base' is your light/background color in tailwind config
	},
	{
		card: "bg-coreYellow/25 border-ink/55",
		title: "text-ink",
		summary: "text-ink/90",
		timeBg: "bg-ink",
		timeText: "text-base",
	},
	{
		card: "bg-coreBlue/25 border-ink/55",
		title: "text-ink",
		summary: "text-ink/90",
		timeBg: "bg-ink",
		timeText: "text-base",
	},
	{
		card: "bg-coreGreen/25 border-ink/55",
		title: "text-ink",
		summary: "text-ink/85",
		timeBg: "bg-ink", // Inverted for the dark card
		timeText: "text-base",
	},
];
