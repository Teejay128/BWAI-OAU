"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowUpRight, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import PillTag from "@/components/PillTag";
import { SITE_LINKS, type ScheduleEvent } from "@/lib/config";

type ScheduleCardsProps = {
    events: ScheduleEvent[];
};

function toIndexLabel(value: number): string {
    return String(value).padStart(2, "0");
}

function getCardTheme(index: number) {
    const themes = [
        {
            card: "bg-coreRed text-base border-coreRed/80",
            tagColor: "#f8d8d8",
            hostTagColor: "#ffe7a5",
            title: "text-base",
            summary: "text-base/90",
            ticket: "bg-base text-ink",
            ticketIcon: "bg-ink text-base",
        },
        {
            card: "bg-coreYellow text-ink border-coreYellow/80",
            tagColor: "#c3ecf6",
            hostTagColor: "#ffffff",
            title: "text-ink",
            summary: "text-ink/90",
            ticket: "bg-ink text-base",
            ticketIcon: "bg-base text-ink",
        },
        {
            card: "bg-coreBlue text-base border-coreBlue/80",
            tagColor: "#ccf6c5",
            hostTagColor: "#f2f2f2",
            title: "text-base",
            summary: "text-base/90",
            ticket: "bg-base text-ink",
            ticketIcon: "bg-ink text-base",
        },
        {
            card: "bg-ink text-base border-ink/80",
            tagColor: "#f2f2f2",
            hostTagColor: "#d8d8d8",
            title: "text-base",
            summary: "text-base/85",
            ticket: "bg-base text-ink",
            ticketIcon: "bg-ink text-base",
        },
    ] as const;

    return themes[index % themes.length];
}

export default function ScheduleCards({ events }: ScheduleCardsProps) {
    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.05,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 18, scale: 0.985, filter: "blur(4px)" },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.42 },
        },
    };

    return (
        <motion.div
            className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.18 }}
        >
            {events.map((event, index) => {
                const theme = getCardTheme(index);
                const isPreSeries = event.sessionType.toLowerCase().includes("pre-series");
                const ticketHref = event.ticketHref && event.ticketHref !== "#"
                    ? event.ticketHref
                    : SITE_LINKS.registerInterest;

                return (
                    <motion.article
                        key={event.id}
                        variants={cardVariants}
                        whileHover={{ y: -4 }}
                        className={`rounded-[1.6rem] border p-5 transition-transform sm:p-6 ${theme.card}`}
                    >
                        <Image
                            src="/event-header.svg"
                            alt="Event card header"
                            width={148}
                            height={16}
                            className="h-4 w-auto"
                        />

                        <div className="flex items-start justify-between gap-3">
                            <h2 className="text-4xl font-bold leading-none sm:text-5xl">Day {event.order}</h2>
                            <span className="font-openSans text-[0.62rem] font-semibold uppercase tracking-[0.16em] opacity-70">
                                {toIndexLabel(event.order)}
                            </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <PillTag
                                label={event.sessionType}
                                color={theme.tagColor}
                                className="w-fit px-3 py-1.5 text-xs shadow-none ring-0"
                            />
                            {isPreSeries ? (
                                <PillTag
                                    label={`Host: ${event.track}`}
                                    color={theme.hostTagColor}
                                    className="w-fit px-3 py-1.5 text-xs shadow-none ring-0"
                                />
                            ) : null}
                        </div>

                        <h3 className={`mt-6 text-[2.35rem] font-bold leading-[1.04] tracking-tight sm:text-[2.7rem] ${theme.title}`}>
                            {event.title}
                        </h3>

                        <p className={`mt-4 text-base leading-7 ${theme.summary}`}>{event.summary}</p>

                        <div className="mt-8">
                            <p className="font-openSans text-[0.62rem] font-semibold uppercase tracking-[0.16em] opacity-70">
                                {event.track}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm opacity-90">
                                <span className="inline-flex items-center gap-2">
                                    <FiCalendar aria-hidden="true" />
                                    {event.date}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <FiClock aria-hidden="true" />
                                    {event.time}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <FiMapPin aria-hidden="true" />
                                    {event.location}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                href={ticketHref}
                                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${theme.ticket}`}
                            >
                                <span>Get Tickets</span>
                                <span
                                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${theme.ticketIcon}`}
                                    aria-hidden="true"
                                >
                                    <FiArrowUpRight size={14} />
                                </span>
                            </Link>
                        </div>
                    </motion.article>
                );
            })}
        </motion.div>
    );
}
