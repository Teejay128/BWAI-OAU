"use client";

import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <motion.section
      className="w-full bg-white"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.45 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          About Build with AI Week
        </h2>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-ink">
          Build with AI Week is a premier technical gathering where developers,
          designers, and creators at OAU converge to harness Google&apos;s AI
          technologies. From immersive pre-series workshops to the grand finale
          on May 9th, we focus on moving beyond the hype to build tangible
          solutions.
        </p>
      </div>
    </motion.section>
  );
}
