"use client";

import { motion } from "motion/react";
import BlackPillButton from "@/components/BlackPillButton";
import { EVENT_DATES, SITE_LINKS } from "@/lib/config";

const copyVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
    },
  },
};

export default function HeroCopy() {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8"
      variants={copyVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.55 }}
    >
      <motion.p
        variants={itemVariants}
        className="font-openSans text-xs font-medium text-ink/65 sm:text-sm"
      >
        GDG OAU × Build with AI 2026
      </motion.p>
      <motion.h1
        variants={itemVariants}
        className="mt-5 text-5xl font-bold font-sans leading-[1.04] text-ink sm:text-6xl lg:text-7xl"
      >
        Build with AI Week
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="mt-4 max-w-2xl leading-7 text-ink/85 sm:text-lg"
      >
        One day. Six communities. Real AI. Real builds.
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="mt-2 text-sm text-ink/75"
      >
        Main Event - {EVENT_DATES.mainEvent} · Obafemi Awolowo University
      </motion.p>
      <motion.div
        variants={itemVariants}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <BlackPillButton label="Explore Pre-Series" href={SITE_LINKS.preSeries} />
        <BlackPillButton
          label="View Main Event"
          href={SITE_LINKS.mainEvent}
        />
      </motion.div>
    </motion.div>
  );
}
