"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lottie from "lottie-react";
import { COMMUNITIES, WHAT_WAS_BUILT_PROJECTS, SITE_LINKS, type Project } from "@/lib/config";
import { MdRocketLaunch } from "react-icons/md";
import ProjectCard from "@/components/what-was-built/ProjectCard";
import BlackPillButton from "@/components/BlackPillButton";
import { apiClient } from "@/lib/axios";

function WhatWasBuiltPage() {
    const DEVICE_ID_STORAGE_KEY = "bwai-device-id";
    const LIKED_PROJECTS_STORAGE_KEY = "bwai-liked-project-ids";

    const [activeCommunity, setActiveCommunity] = useState<string>("All");
    const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set());
    const [likingProjects, setLikingProjects] = useState<Set<number>>(new Set());
    const [deviceId, setDeviceId] = useState<string>("");
    const [liveCount, setLiveCount] = useState<number>(WHAT_WAS_BUILT_PROJECTS.length);
    const [projects, setProjects] = useState<Project[]>(WHAT_WAS_BUILT_PROJECTS);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [emptyStateAnimation, setEmptyStateAnimation] = useState<object | null>(null);
    const EMPTY_STATE_LOTTIE_URL =
        "https://assets10.lottiefiles.com/packages/lf20_touohxv0.json";

    const allCommunities = useMemo(
        () => ["All", ...COMMUNITIES.filter((community) => projects.some((project) => project.community === community))],
        [projects],
    );

    const filteredProjects = useMemo(
        () =>
            activeCommunity === "All"
                ? projects
                : projects.filter((project) => project.community === activeCommunity),
        [activeCommunity, projects],
    );

    useEffect(() => {
        const existingDeviceId = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY);
        const generatedDeviceId =
            existingDeviceId ||
            (typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

        if (!existingDeviceId) {
            window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, generatedDeviceId);
        }

        setDeviceId(generatedDeviceId);

        const rawLikedIds = window.localStorage.getItem(LIKED_PROJECTS_STORAGE_KEY);
        if (rawLikedIds) {
            try {
                const parsed = JSON.parse(rawLikedIds) as number[];
                setLikedProjects(new Set(parsed.filter((id) => Number.isInteger(id))));
            } catch {
                // Ignore malformed local data.
            }
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(
            LIKED_PROJECTS_STORAGE_KEY,
            JSON.stringify(Array.from(likedProjects)),
        );
    }, [likedProjects]);

    useEffect(() => {
        let mounted = true;

        const loadData = async (isInitial = false) => {
            try {
                const { data: payload } = await apiClient.get<{
                    liveCount: number;
                    projects: Project[];
                }>("/what-was-built");

                if (!mounted) {
                    return;
                }

                setLiveCount(payload.liveCount);
                setProjects(payload.projects);
            } catch {
                // Keep static fallback data when request fails.
            } finally {
                if (isInitial && mounted) {
                    setIsLoadingProjects(false);
                }
            }
        };

        loadData(true);

        const interval = setInterval(() => {
            loadData(false);
        }, 5000);

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        const loadAnimation = async () => {
            try {
                const response = await fetch(EMPTY_STATE_LOTTIE_URL);
                if (!response.ok) {
                    return;
                }

                const payload = (await response.json()) as object;

                if (mounted) {
                    setEmptyStateAnimation(payload);
                }
            } catch {
                // Keep text-only empty state if Lottie request fails.
            }
        };

        loadAnimation();

        return () => {
            mounted = false;
        };
    }, []);

    async function toggleLike(id: number) {
        if (!deviceId || likingProjects.has(id)) {
            return;
        }

        setLikingProjects((prev) => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });

        try {
            const { data } = await apiClient.post<{
                projectId: number;
                liked: boolean;
                likes: number;
            }>("/what-was-built/like", {
                projectId: id,
                deviceId,
            });

            setLikedProjects((prev) => {
                const next = new Set(prev);
                if (data.liked) {
                    next.add(id);
                } else {
                    next.delete(id);
                }
                return next;
            });

            setProjects((prev) =>
                prev.map((project) =>
                    project.id === id ? { ...project, likes: data.likes } : project,
                ),
            );
        } catch {
            // Ignore action failures and keep current UI state unchanged.
        } finally {
            setLikingProjects((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }
    }

    return (
        <div className="min-h-screen bg-surface">
            <section className="px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-20">
                <div className="mx-auto w-full max-w-7xl">
                    <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h1 className="text-5xl font-bold leading-[1.1] text-ink sm:text-6xl lg:text-[3.5rem]">
                                What Got Built
                            </h1>
                            <p className="mt-3 text-[1rem] text-ink/60">
                                Every project from every community, across all 5 days.
                            </p>
                        </motion.div>

                        <motion.div
                            className="inline-flex w-full items-center justify-start sm:w-auto sm:justify-end"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
                        >
                            {isLoadingProjects ? (
                                <div className="inline-flex min-h-12 min-w-56 items-center gap-3 rounded-full bg-base/95 px-4 py-2 sm:px-5">
                                    <span className="h-6 w-6 animate-pulse rounded-full bg-ink/10" />
                                    <span className="h-4 w-40 animate-pulse rounded bg-ink/10" />
                                </div>
                            ) : (
                                <div
                                    className="inline-flex min-h-12 items-center gap-3 rounded-full bg-base/95 px-4 py-2 sm:px-5"
                                    aria-label={`${liveCount} projects built so far`}
                                >
                                    <span className="flex items-center justify-center rounded-full text-coreBlue">
                                        <MdRocketLaunch size={24} />
                                    </span>
                                    <p className="flex items-baseline gap-2 text-ink">
                                        <span className="text-[1rem] font-bold leading-none tabular-nums sm:text-[1.2rem]">
                                            {liveCount}
                                        </span>
                                        <span className="font-openSans text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink/80 sm:text-[0.8rem]">
                                            Projects built so far
                                        </span>
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {
                !isLoadingProjects && liveCount > 0 && (
                    <section className="px-4 pb-8 sm:px-6 lg:px-8">
                        <div className="mx-auto w-full max-w-7xl">
                            <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
                                {allCommunities.map((community, index) => (
                                    <motion.button
                                        key={community}
                                        type="button"
                                        onClick={() => setActiveCommunity(community)}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.35,
                                            ease: "easeOut",
                                            delay: 0.2 + index * 0.05,
                                        }}
                                        className={`cursor-pointer inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 ${activeCommunity === community
                                                ? "bg-ink text-white"
                                                : "border border-ink/20 bg-white text-ink hover:border-ink/40 hover:bg-ink/5"
                                            }`}
                                    >
                                        {community}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            <section className="px-4 pb-16 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl">
                    {isLoadingProjects ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[0, 1, 2].map((slot) => (
                                <div key={slot} className="rounded-3xl border border-ink/10 bg-white p-5">
                                    <div className="h-4 w-28 animate-pulse rounded bg-ink/10" />
                                    <div className="mt-5 h-8 w-3/4 animate-pulse rounded bg-ink/10" />
                                    <div className="mt-3 h-4 w-full animate-pulse rounded bg-ink/10" />
                                    <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-ink/10" />
                                    <div className="mt-6 h-9 w-32 animate-pulse rounded-full bg-ink/10" />
                                </div>
                            ))}
                        </div>
                    ) : liveCount === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-ink/10 bg-white px-6 py-12 text-center sm:py-16"
                        >
                            <div className="h-55 w-55 sm:h-70 sm:w-70">
                                {emptyStateAnimation ? (
                                    <Lottie
                                        animationData={emptyStateAnimation}
                                        loop
                                        autoplay
                                        aria-label="Waiting for first project upload"
                                    />
                                ) : (
                                    <div className="h-full w-full animate-pulse rounded-2xl bg-ink/5" />
                                )}
                            </div>

                            <h2 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
                                We are waiting for the first project upload
                            </h2>
                            <p className="mt-3 max-w-xl text-sm text-ink/70 sm:text-base">
                                Nothing has been submitted yet. Once communities start uploading,
                                this space will fill up live.
                            </p>
                        </motion.div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCommunity}
                                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                                initial={{ opacity: 0, filter: "blur(6px)", scale: 0.99 }}
                                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                exit={{ opacity: 0, filter: "blur(6px)", scale: 0.99 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        isLiked={likedProjects.has(project.id)}
                                        isLiking={likingProjects.has(project.id)}
                                        onToggleLike={toggleLike}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </section>

            {
                !isLoadingProjects && liveCount > 0 && (
                    <div className="pb-20 text-center">
                        <BlackPillButton
                            label="Explore more projects"
                            href={SITE_LINKS.registerInterest}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default WhatWasBuiltPage;