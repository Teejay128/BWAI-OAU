"use client";

import Image from "next/image";
import Link from "next/link";

import BlackPillButton from "@/components/BlackPillButton";
import { SITE_LINKS, SPONSOR_TIERS } from "@/lib/config";

export default function SponsorsSection() {
  const sponsorLogos = SPONSOR_TIERS
    .slice(0, 3)
    .flatMap((tier) => tier.sponsors.map((sponsor, index) => ({
      ...sponsor,
      key: `sponsor-${tier.tier}-${index}`,
    })));

  const partnerLogos = SPONSOR_TIERS
    .slice(3)
    .flatMap((tier) => tier.sponsors.map((sponsor, index) => ({
      ...sponsor,
      key: `partner-${tier.tier}-${index}`,
    })));

  const sponsorTrack = [...sponsorLogos, ...sponsorLogos];
  const partnerTrack = [...partnerLogos, ...partnerLogos];

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

      <div className="mt-16  overflow-hidden ">
        <div className="mx-auto">
          <p className="mb-6 text-center font-openSans text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-ink/55">
            Sponsors
          </p>
          <div className="overflow-hidden">
            <div className="flex w-max min-w-max items-center gap-14 pr-14 animate-[marquee-left_34s_linear_infinite] hover:[animation-play-state:paused]">
              {sponsorTrack.map((sponsor, index) => (
                <Link
                  key={`${sponsor.key}-${index}`}
                  href={sponsor.href}
                  target={sponsor.href.startsWith("http") ? "_blank" : undefined}
                  rel={sponsor.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex h-22 min-w-52 items-center justify-center rounded-2xl border border-ink/10 bg-base/70 px-0 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Image
                    src={sponsor.logo.src}
                    alt={sponsor.logo.alt}
                    width={220}
                    height={120}
                    className="h-auto max-h-12 w-full max-w-40 object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6">
          <p className="mb-6 text-center font-openSans text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-ink/55">
            Partners
          </p>
          <div className="overflow-hidden">
            <div className="flex w-max min-w-max items-center gap-14 pr-14 animate-[marquee-right_36s_linear_infinite] hover:[animation-play-state:paused]">
              {partnerTrack.map((sponsor, index) => (
                <Link
                  key={`${sponsor.key}-${index}`}
                  href={sponsor.href}
                  target={sponsor.href.startsWith("http") ? "_blank" : undefined}
                  rel={sponsor.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex h-22 min-w-52 items-center justify-center rounded-2xl border border-ink/10 bg-base/70 px-0 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Image
                    src={sponsor.logo.src}
                    alt={sponsor.logo.alt}
                    width={220}
                    height={120}
                    className="h-auto max-h-12 w-full max-w-40 object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
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