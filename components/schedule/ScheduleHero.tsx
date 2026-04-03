"use client";

import { motion } from "motion/react";

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
            duration: 0.6,
        },
    },
};

export default function ScheduleHero() {
    return (
        <motion.section
            className="mx-auto w-full max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-20"
            variants={copyVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
        >
            <motion.p
                variants={itemVariants}
                className="font-openSans text-xs font-semibold uppercase tracking-[0.18em] text-ink/55"
            >
                Build with AI Week
            </motion.p>
            <motion.h1
                variants={itemVariants}
                className="mt-2 text-5xl font-bold leading-[1.05] text-ink sm:text-6xl lg:text-[4rem]"
            >
                Pre-Series Schedule
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-4 max-w-3xl leading-8 text-ink/75">
                Follow the pre-series run-up sessions before the main event. Explore each
                day&apos;s focus, timing, and venue details below.
            </motion.p>
        </motion.section>
    );
}
