"use client";

import Image from "next/image";
import { motion } from "motion/react";

import BuildWithAiCta from "@/components/home/sections/build-with-ai/BuildWithAiCta";
import BuildWithAiShowcaseCard from "@/components/home/sections/build-with-ai/BuildWithAiShowcaseCard";
import { BUILD_WITH_AI_SHOWCASE_CARDS } from "@/components/home/sections/build-with-ai/buildWithAiShowcaseData";
import { GDG_OAU_LOGO, SITE_LINKS } from "@/lib/config";

export default function BuildWithAi2025Section() {
  return (
    <motion.section
      className="w-full bg-base font-sans"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16 sm:gap-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Image
                src={GDG_OAU_LOGO.src}
                alt={GDG_OAU_LOGO.alt}
                width={130}
                height={40}
                className="h-11 w-auto sm:h-12"
              />
              <h2
                className="font-sans text-[clamp(1.65rem,3.2vw,2.65rem)] font-bold leading-none tracking-tight text-ink"
                style={{ fontFamily: "Google Sans, var(--font-google-sans), sans-serif" }}
              >
                Build With AI 2025
              </h2>
            </div>
          </div>

          <div className="flex justify-start lg:justify-end">
            <div className="rounded-full border border-white/90 bg-white/80 px-5 py-3 backdrop-blur-sm sm:px-6">
              <Image
                src="/event-header.svg"
                alt="Decorative event header"
                width={256}
                height={29}
                className="h-6 w-auto sm:h-7"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-7 lg:grid-cols-12 lg:grid-rows-2 lg:gap-8">
          {BUILD_WITH_AI_SHOWCASE_CARDS.map((card, index) => (
            <BuildWithAiShowcaseCard
              key={card.title}
              title={card.title}
              backgroundClassName={card.backgroundClassName}
              titleClassName={card.titleClassName}
              gridClassName={card.gridClassName}
              minHeightClassName={card.minHeightClassName}
              imageAlt={card.imageAlt}
              imageSrc={card.imageSrc}
              delay={index * 0.08}
            />
          ))}
        </div>

        <div className="flex justify-center pt-2 sm:pt-4">
          <BuildWithAiCta href={SITE_LINKS.registerInterest} label="Get Tickets" />
        </div>
      </div>
    </motion.section>
  );
}