import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS, GDG_OAU_LOGO } from "@/lib/config";


function DividerSpark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 text-white/55" fill="none">
      <path
        d="M10 1.5V18.5M1.5 10H18.5M4.2 4.2L15.8 15.8M15.8 4.2L4.2 15.8"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DividerArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 44 20" className="h-5 w-11 text-white/55" fill="none">
      <path d="M1 10H35" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M28 4.5L35.5 10L28 15.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DividerGlobe() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 text-white/55" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M2.5 12H21.5M12 2A15 15 0 0 1 12 22M12 2A15 15 0 0 0 12 22"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DividerWave() {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 20" className="h-5 w-20 text-white/55" fill="none">
      <path
        d="M1 10C7 2 13 2 19 10C25 18 31 18 37 10C43 2 49 2 55 10C61 18 67 18 73 10"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "Twitter/X") {
    return <span className="text-[1.2rem] font-semibold leading-none">X</span>;
  }

  if (label === "Instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.1" cy="6.9" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (label === "Facebook") {
    return <span className="text-[1.45rem] font-bold leading-none">f</span>;
  }

  return <span className="text-[1.1rem] font-bold leading-none tracking-tight">in</span>;
}

export default function Footer() {
  return (
    <footer className="bg-[#1d1d1d] text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <Link href="/" className="flex items-center gap-4 text-white">
          <Image
            src={GDG_OAU_LOGO.src}
            alt={GDG_OAU_LOGO.alt}
            width={120}
            height={36}
            className="h-12 w-auto invert"
          />
        </Link>

        <div className="mt-8 flex items-center justify-center gap-2 text-white/55 sm:gap-3">
          <DividerSpark />
          <DividerArrow />
          <DividerGlobe />
          <DividerWave />
          <DividerSpark />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1d1d1d] shadow-[0_12px_28px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1d1d1d]"
            >
              <SocialIcon label={link.label} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
