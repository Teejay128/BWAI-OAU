"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import BlackPillButton from "@/components/BlackPillButton";
import { SITE_LINKS, SPONSOR_LEVEL_GROUPS, COMMUNITY_PARTNERS } from "@/lib/config";

// Pull only real sponsors (non-placeholder hrefs) from SPONSOR_LEVEL_GROUPS
const realSponsors = SPONSOR_LEVEL_GROUPS.flatMap((group) =>
  group.sponsors
    .filter((s) => s.href !== "#")
    .map((s, i) => ({ ...s, key: `sponsor-${group.level}-${i}` })),
);

// Community partners come from the COMMUNITY_PARTNERS list
const realPartners = COMMUNITY_PARTNERS.map((p, i) => ({
  href: p.href,
  logo: p.logo,
  key: `partner-${i}`,
}));

type LogoItem = {
  key: string;
  href: string;
  logo: { src: string; alt: string; width?: number; height?: number };
};

function LogoCard({ item }: { item: LogoItem }) {
  return (
    <Link
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex h-22 min-w-[13rem] items-center justify-center rounded-2xl border border-ink/10 bg-base/70 px-6 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <Image
        src={item.logo.src}
        alt={item.logo.alt}
        width={item.logo.width ?? 220}
        height={item.logo.height ?? 120}
        className="h-auto max-h-12 w-full max-w-40 object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </Link>
  );
}

function LogoRow({
  items,
  label,
  direction = "left",
  speed = 34,
}: {
  items: LogoItem[];
  label: string;
  direction?: "left" | "right";
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Card min-width is 13rem (208px). Gap is 32px (gap-8).
        const estimatedWidth = items.length * 208 + Math.max(0, items.length - 1) * 32;
        // Trigger scroll if estimated width is close to container width
        setShouldScroll(estimatedWidth + 10 > containerWidth);
      }
    };

    checkOverflow();
    const observer = new ResizeObserver(() => checkOverflow());
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [items.length]);

  // Duplicate for seamless loop only when scrolling
  const track = shouldScroll ? [...items, ...items] : items;

  return (
    <div className="mx-auto w-full" ref={containerRef}>
      <p className="mb-6 text-center font-openSans text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-ink/55">
        {label}
      </p>
      <div className={shouldScroll ? "overflow-hidden" : ""}>
        <div
          className={
            shouldScroll
              ? "flex w-max min-w-max items-center gap-14 pr-14 hover:[animation-play-state:paused]"
              : "flex flex-wrap items-center justify-center gap-8"
          }
          style={
            shouldScroll
              ? { animation: `marquee-${direction} ${speed}s linear infinite` }
              : undefined
          }
        >
          {track.map((item, index) => (
            <LogoCard key={`${item.key}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SponsorsSection() {
  const hasSponsors = realSponsors.length > 0;
  const hasPartners = realPartners.length > 0;

  if (!hasSponsors && !hasPartners) {
    return null;
  }

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-openSans text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-ink/55">
            Sponsors and Partners
          </p>
          <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
            Our Partners
          </h2>
          <p className="mt-4 text-[1rem] leading-8 text-ink/75 sm:text-lg">
            These organizations make Build with AI Week possible.
          </p>
        </div>

        <div className="mx-auto rounded-full border border-white/90 bg-white/80 px-5 py-3 backdrop-blur-sm sm:px-6">
          <Image
            src="/event-header.svg"
            alt="Decorative event header"
            width={256}
            height={29}
            className="h-6 w-auto sm:h-7"
          />
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-10 overflow-hidden">
        {hasSponsors && (
          <LogoRow items={realSponsors} label="Sponsors" direction="left" speed={34} />
        )}
        {hasPartners && (
          <LogoRow items={realPartners} label="Community Partners" direction="right" speed={36} />
        )}
      </div>

      <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-5 px-4 text-center sm:mt-16 sm:px-6 lg:px-8">
        <p className="font-sans font-normal leading-8 text-ink/75 sm:text-lg">
          Want to support the week? Join these organizations as a sponsor.
        </p>
        <BlackPillButton
          label="Become a Sponsor"
          href={SITE_LINKS.sponsors}
          className="w-full sm:w-auto"
        />
      </div>
    </section>
  );
}