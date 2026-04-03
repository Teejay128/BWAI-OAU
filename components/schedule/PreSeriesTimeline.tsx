"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowUpRight, FiCalendar, FiLayers, FiMapPin } from "react-icons/fi";
import PillTag from "@/components/PillTag";
import { HERO_PILL_TONE_COLORS, type ScheduleEvent } from "@/lib/config";

type PreSeriesTimelineProps = {
    events: ScheduleEvent[];
};

type HostInfo = {
    color: string;
    card: string;
    timeBg: string;
    dateChip: string;
    metaChip: string;
    ticket: string;
    ticketIcon: string;
};

function resolveHostInfo(event: ScheduleEvent): HostInfo {
    const token = `${event.title} ${event.track} ${event.sessionType}`.toLowerCase();

    if (token.includes("data") || token.includes("ml") || token.includes("insight")) {
        return {
            color: HERO_PILL_TONE_COLORS.coreBlue,
            card: "border-coreBlue/70 bg-coreBlue",
            timeBg: "bg-white ring-1 ring-ink/25",
            dateChip: "bg-white text-ink",
            metaChip: "bg-white/90 text-ink",
            ticket: "bg-ink text-base",
            ticketIcon: "bg-base text-ink",
        };
    }

    if (token.includes("mobile") || token.includes("web") || token.includes("autonomy") || token.includes("agent")) {
        return {
            color: HERO_PILL_TONE_COLORS.coreGreen,
            card: "border-coreGreen/70 bg-coreGreen",
            timeBg: "bg-white ring-1 ring-ink/25",
            dateChip: "bg-white text-ink",
            metaChip: "bg-white/90 text-ink",
            ticket: "bg-ink text-base",
            ticketIcon: "bg-base text-ink",
        };
    }

    if (token.includes("cloud") || token.includes("security") || token.includes("guardrail") || token.includes("cyber")) {
        return {
            color: HERO_PILL_TONE_COLORS.surface,
            card: "border-ink/35 bg-surface",
            timeBg: "bg-white ring-1 ring-ink/25",
            dateChip: "bg-white text-ink",
            metaChip: "bg-white text-ink",
            ticket: "bg-ink text-base",
            ticketIcon: "bg-base text-ink",
        };
    }

    if (token.includes("game")) {
        return {
            color: HERO_PILL_TONE_COLORS.coreYellow,
            card: "border-coreYellow/80 bg-coreYellow",
            timeBg: "bg-white ring-1 ring-ink/25",
            dateChip: "bg-white text-ink",
            metaChip: "bg-white/90 text-ink",
            ticket: "bg-ink text-base",
            ticketIcon: "bg-base text-ink",
        };
    }

    if (token.includes("creative")) {
        return {
            color: HERO_PILL_TONE_COLORS.coreRed,
            card: "border-coreRed/75 bg-coreRed",
            timeBg: "bg-white ring-1 ring-ink/25",
            dateChip: "bg-white text-ink",
            metaChip: "bg-white/90 text-ink",
            ticket: "bg-ink text-base",
            ticketIcon: "bg-base text-ink",
        };
    }

    return {
        color: HERO_PILL_TONE_COLORS.coreGreen,
        card: "border-coreGreen/70 bg-coreGreen",
        timeBg: "bg-white ring-1 ring-ink/25",
        dateChip: "bg-white text-ink",
        metaChip: "bg-white/90 text-ink",
        ticket: "bg-ink text-base",
        ticketIcon: "bg-base text-ink",
    };
}

export default function PreSeriesTimeline({ events }: PreSeriesTimelineProps) {
    return (
        <div className="relative">
            <div className="absolute left-8 top-0 hidden h-full w-px bg-ink/20 sm:block sm:left-1/2 sm:-translate-x-1/2" />

            <div className="sm:space-y-0">
                {events.map((event, index) => {
                    const host = resolveHostInfo(event);

                    return (
                        <motion.article
                            key={event.id}
                            className={`relative mb-8 flex flex-col items-start justify-between sm:mb-12 sm:flex-row sm:items-center ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                                }`}
                            initial={{ opacity: 0, y: 28, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                        >
                            <div
                                className={`hidden sm:flex sm:w-[45%] ${index % 2 === 0 ? "sm:justify-end" : "sm:justify-start"
                                    }`}
                            >
                                <div
                                    className={`rounded-2xl px-4 py-3 font-mono text-ink shadow-sm ${host.timeBg}`}
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Day {event.order}</p>
                                    <p className="mt-1  font-bold leading-none">{event.date}</p>
                                    <p className="mt-2 text-xs font-medium text-ink">{event.time}</p>
                                </div>
                            </div>

                            <div className="absolute left-0 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-base bg-ink shadow-sm sm:left-1/2 sm:block" />

                            <div className="w-full sm:w-[45%]">
                                <div
                                    className={`group relative rounded-[1.6rem] border p-5 transition-transform hover:-translate-y-1 sm:p-6 ${host.card}`}
                                >
                                    <div className="mb-5 flex items-center justify-between">
                                        <img
                                            src="/branding.png"
                                            alt="Event card header"
                                            className="h-4 w-auto opacity-90"
                                        />

                                        <div
                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs font-bold text-ink shadow-sm sm:hidden ${host.dateChip}`}
                                        >
                                            {event.date}
                                        </div>
                                    </div>

                                    <p className="font-openSans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink/70">
                                        Day {event.order} · {event.time}
                                    </p>

                                    <PillTag
                                        label={`Host: ${event.track}`}
                                        color={host.color}
                                        className="mt-2 px-3 py-1.5 text-xs shadow-none ring-0"
                                    />

                                    <h3
                                        className="mt-3 text-2xl font-bold leading-[1.1] tracking-tight text-ink sm:text-3xl"
                                    >
                                        {event.title}
                                    </h3>

                                    <p className="mt-3 text-[1rem] leading-7 text-ink/85">{event.summary}</p>

                                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink/80 sm:text-sm">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${host.dateChip}`}>
                                            <FiCalendar aria-hidden="true" size={13} />
                                            {event.date}
                                        </span>
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${host.metaChip}`}>
                                            <FiMapPin aria-hidden="true" size={13} />
                                            {event.location}
                                        </span>
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${host.metaChip}`}>
                                            <FiLayers aria-hidden="true" size={13} />
                                            {event.sessionType}
                                        </span>
                                    </div>

                                    <div className="mt-6">
                                        <Link
                                            href={event.ticketHref}
                                            target={event.ticketHref.startsWith("http") ? "_blank" : undefined}
                                            rel={event.ticketHref.startsWith("http") ? "noreferrer" : undefined}
                                            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${host.ticket}`}
                                        >
                                            <span>Register for This Session</span>
                                            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${host.ticketIcon}`} aria-hidden="true">
                                                <FiArrowUpRight size={14} />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </div>
    );
}
