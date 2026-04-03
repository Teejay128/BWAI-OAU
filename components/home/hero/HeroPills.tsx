"use client";

import { motion } from "motion/react";
import PillTag from "@/components/PillTag";
import { HERO_PILL_TONE_COLORS, HERO_PILLS } from "@/lib/config";

const pillPositions = [
  { top: "12%", x: -260, rotate: -6, delay: 0.08 },
  { top: "6%", x: -80, rotate: 4, delay: 0.18 },
  { top: "12%", x: 170, rotate: -4, delay: 0.28 },
  { top: "36%", x: -180, rotate: 6, delay: 0.38 },
  { top: "30%", x: 20, rotate: -3, delay: 0.48 },
  { top: "38%", x: 220, rotate: 5, delay: 0.58 },
  { top: "56%", x: 0, rotate: 0, delay: 0.68 },
] as const;

export default function HeroPills() {
  return (
    <>
      <div className="relative mx-auto mt-8 w-full overflow-hidden md:hidden">
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-base to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-base to-transparent" /> */}
        <motion.div
          className="flex w-max items-center gap-3 py-2 pr-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          {[...HERO_PILLS, ...HERO_PILLS].map((pill, index) => (
            <PillTag
              key={`${pill.label}-${index}`}
              label={pill.label}
              color={HERO_PILL_TONE_COLORS[pill.tone]}
              className="whitespace-nowrap px-5 py-2.5 text-sm"
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="relative mx-auto mt-10 hidden h-65 w-full max-w-5xl overflow-visible sm:h-70 lg:h-80 md:block"
        initial={false}
        viewport={{ once: false, amount: 0.5 }}
      >
        {HERO_PILLS.map((pill, index) => {
          const position = pillPositions[index];

          return (
            <motion.div
              key={pill.label}
              className="absolute left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -170, scale: 0.88, x: 0 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, x: position.x }}
              transition={{ duration: 0.8, delay: position.delay }}
              style={{ top: position.top, rotate: position.rotate }}
            >
              <PillTag
                label={pill.label}
                color={HERO_PILL_TONE_COLORS[pill.tone]}
                className="whitespace-nowrap px-5 py-2.5 text-sm shadow-[0_14px_28px_rgba(30,30,30,0.08)]"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}
