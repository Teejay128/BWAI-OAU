"use client";

import { motion } from "motion/react";

import BlackPillButton from "@/components/BlackPillButton";
import { SITE_LINKS } from "@/lib/config";

export default function GrandFinaleTeaserSection() {
  return (
    <motion.section
      className="bg-[#f8d8d8] px-4 py-18 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <h2 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          It all ends with a Showcase.
        </h2>
        <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-ink/80 sm:text-lg">
          Witness the most innovative AI prototypes built during the week in a high-stakes demo day.
        </p>
        <div className="mt-8">
          <BlackPillButton label="Learn More" href={SITE_LINKS.mainEvent} className="px-7" />
        </div>
      </div>
    </motion.section>
  );
}