"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

type BuildWithAiCtaProps = {
  href: string;
  label: string;
};

export default function BuildWithAiCta({ href, label }: BuildWithAiCtaProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-4 rounded-full bg-ink px-5 py-3 text-sm font-bold text-base transition-transform duration-200 hover:-translate-y-0.5 sm:px-6 sm:py-3.5"
    >
      <span>{label}</span>
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-base text-ink transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
        <FiArrowUpRight size={15} />
      </span>
    </Link>
  );
}