import { SITE_LINKS, SPONSOR_LEVEL_GROUPS } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

export default function SponsorsPage() {
  const sponsorGroupsWithEntries = SPONSOR_LEVEL_GROUPS.filter(
    (group) => group.sponsors.length > 0,
  );
  const hasAnySponsors = sponsorGroupsWithEntries.length > 0;

  return (
    <div className="relative isolate overflow-hidden bg-base">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-120 bg-[radial-gradient(58rem_22rem_at_20%_0%,rgba(66,133,244,0.22),transparent),radial-gradient(52rem_20rem_at_95%_10%,rgba(52,168,83,0.18),transparent)]" />

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-12 lg:pt-24">
        <div className="inline-flex items-center rounded-full border border-ink/10 bg-white/80 px-4 py-2 backdrop-blur-sm">
          <Image
            src="/event-header.svg"
            alt="Decorative event header"
            width={190}
            height={22}
            className="h-4 w-auto sm:h-5"
          />
        </div>

        <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
          Meet Our Sponsors
        </h1>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="https://bit.ly/bwaioau-partners-deck"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-coreBlue hover:text-black"
          >
            See Our Deck
          </Link>
          <Link
            href={SITE_LINKS.sponsors}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-coreBlue hover:text-black"
          >
            Fill This Form for Enquiries
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">Sponsors by Level</h2>

        {hasAnySponsors ? (
          <div className="mt-8 space-y-10 lg:space-y-12">
            {sponsorGroupsWithEntries.map((group) => (
              <article
                key={group.level}
                className="rounded-3xl border border-ink/10 bg-white/80 px-5 py-6 shadow-[0_16px_30px_-26px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:px-6"
              >
                <h3 className="text-center font-openSans text-sm font-semibold uppercase tracking-[0.2em] text-ink/70">
                  {group.level}
                </h3>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
                  {group.sponsors.map((sponsor) => (
                    <Link
                      key={`${group.level}-${sponsor.name}`}
                      href={sponsor.href}
                      target={sponsor.href.startsWith("http") ? "_blank" : undefined}
                      rel={sponsor.href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={sponsor.name}
                      title={sponsor.name}
                      className="inline-flex min-h-16 min-w-32 items-center justify-center rounded-2xl border border-ink/10 bg-white px-4 py-3 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-16px_rgba(0,0,0,0.45)]"
                    >
                      <Image
                        src={sponsor.logo.src}
                        alt={sponsor.logo.alt}
                        width={sponsor.logo.width}
                        height={sponsor.logo.height}
                        className="h-auto max-h-14 w-auto max-w-36 object-contain"
                      />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-ink/20 bg-white/70 px-6 py-10 text-center backdrop-blur-sm sm:px-8">
            <p className="text-sm uppercase tracking-[0.12em] text-ink/60">No sponsors listed yet</p>
            <p className="mt-3 text-[1rem] text-ink/80 sm:text-lg">
              Be the first organization featured on this page.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={SITE_LINKS.sponsors}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-coreBlue hover:text-black"
              >
                Become a Sponsor
              </Link>
              <Link
                href="https://bit.ly/bwaioau-partners-deck"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-coreBlue hover:text-black"
              >
                See Our Deck
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-ink/10 bg-white/80 px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6">
          <p className="text-sm uppercase tracking-[0.12em] text-ink/60">
            Ready to partner?
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="https://bit.ly/bwaioau-partners-deck"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-semibold text-ink transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-coreBlue hover:text-black"
            >
              See Our Deck
            </Link>
            <Link
              href={SITE_LINKS.sponsors}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-semibold text-ink transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-coreBlue hover:text-black"
            >
              Fill This Form for Enquiries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
