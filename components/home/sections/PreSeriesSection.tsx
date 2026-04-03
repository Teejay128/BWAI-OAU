"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowUpRight, FiCalendar, FiLayers, FiMapPin } from "react-icons/fi";
import PillTag from "@/components/PillTag";
import { EVENT_DATES, type ScheduleEvent } from "@/lib/config";

const cardToneMap = {
    coreBlue: "#57caff",
    coreGreen: "#5cdb6d",
    coreYellow: "#ffd427",
} as const;

type PreSeriesSectionProps = {
    events: ScheduleEvent[];
};

function toneForTrack(track: string): keyof typeof cardToneMap {
    const token = track.toLowerCase();

    if (token.includes("data") || token.includes("ml") || token.includes("insight")) {
        return "coreBlue";
    }

    if (token.includes("cloud") || token.includes("security") || token.includes("guardrail")) {
        return "coreYellow";
    }

    return "coreGreen";
}

export default function PreSeriesSection({ events }: PreSeriesSectionProps) {
    const featuredEvents = [...events]
        .sort((a, b) => a.order - b.order)
        .slice(0, 3);

    return (
        <motion.section
            id="pre-series"
            className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-ink sm:text-4xl">Before the Main Event</h2>
                    <p className="mt-3 text-[1rem] leading-7 text-ink/80 sm:text-lg">
                        Each sub-community hosts their own pre-series event in the weeks leading up to {EVENT_DATES.mainEvent}.
                    </p>
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

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {featuredEvents.map((event, index) => {
                    const accent = toneForTrack(event.track);
                    const ticketHref = event.ticketHref && event.ticketHref !== "#" ? event.ticketHref : "/pre-series";

                    return (
                        <motion.article
                            key={`${event.id}-${event.title}`}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.25 }}
                            transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.06 }}
                            whileHover={{ y: -4 }}
                            className="flex h-full flex-col rounded-[1.75rem] border border-ink/20 bg-white px-5 py-6 transition-transform sm:px-6"
                        >
                            <Image
                                src="/event-header.svg"
                                alt="Event card header"
                                width={148}
                                height={16}
                                className="h-4 w-auto self-start opacity-80"
                            />

                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                <PillTag
                                    label={event.track}
                                    color={cardToneMap[accent]}
                                    className="w-fit px-3 py-1.5 text-xs shadow-none ring-0"
                                />
                                <span className="rounded-full bg-base px-3 py-1 text-[0.7rem] font-semibold text-ink/80">
                                    Day {event.order}
                                </span>
                            </div>

                            <h3 className="mt-5 min-h-20 text-2xl font-bold text-ink">{event.title}</h3>

                            <div className="mt-4 space-y-2 text-sm text-ink/80">
                                <p className="inline-flex items-center gap-2">
                                    <FiCalendar aria-hidden="true" />
                                    {event.date}
                                </p>
                                <p className="inline-flex items-center gap-2">
                                    <FiMapPin aria-hidden="true" />
                                    {event.location}
                                </p>
                                <p className="inline-flex items-center gap-2">
                                    <FiLayers aria-hidden="true" />
                                    {event.sessionType}
                                </p>
                            </div>

                            <div className="mt-auto pt-7">
                                <Link
                                    href={ticketHref}
                                    target={ticketHref.startsWith("http") ? "_blank" : undefined}
                                    rel={ticketHref.startsWith("http") ? "noreferrer" : undefined}
                                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-base transition-transform duration-200 hover:-translate-y-0.5"
                                >
                                    <span>Get Tickets</span>
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-base text-ink" aria-hidden="true">
                                        <FiArrowUpRight size={14} />
                                    </span>
                                </Link>
                            </div>
                        </motion.article>
                    );
                })}
            </div>

            <div className="mt-8 flex justify-center sm:mt-10">
                <Link
                    href="/pre-series"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-coreBlue hover:text-black"
                >
                    <span>See Full Pre-Series Schedule</span>
                    <FiArrowUpRight aria-hidden="true" />
                </Link>
            </div>
        </motion.section>
    );
}
