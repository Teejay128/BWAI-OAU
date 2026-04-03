"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type ScheduleEvent } from "@/lib/config";
import { CONFIG_AUTH_HEADER } from "@/lib/config-auth";
import { apiClient } from "@/lib/axios";
import { CODE_STORAGE_KEY } from "../page";

type EditorState = {
    events: ScheduleEvent[];
};

type AuthState = "checking" | "locked" | "unlocked";

function emptyEvent(index: number): ScheduleEvent {
    const nextOrder = index + 1;
    return {
        id: Date.now() + index,
        order: nextOrder,
        date: "",
        title: "",
        summary: "",
        track: "",
        sessionType: "",
        time: "",
        location: "",
        ticketHref: "#",
    };
}

export default function ScheduleConfigPage() {
    const [authState, setAuthState] = useState<AuthState>("checking");
    const [accessCode, setAccessCode] = useState("");
    const [authError, setAuthError] = useState("");

    const [data, setData] = useState<EditorState>({ events: [] });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isDirty, setIsDirty] = useState(false);

    const authHeaders = useMemo(
        () => ({
            [CONFIG_AUTH_HEADER]: accessCode,
        }),
        [accessCode],
    );

    const fetchConfig = useCallback(async () => {
        if (!accessCode) {
            return;
        }

        const { data: payload } = await apiClient.get<EditorState>("/config/schedule", {
            headers: authHeaders,
        });
        setData(payload);
        setError("");
    }, [accessCode, authHeaders]);

    useEffect(() => {
        const savedCode = sessionStorage.getItem(CODE_STORAGE_KEY);

        if (!savedCode) {
            setAuthState("locked");
            setLoading(false);
            return;
        }

        setAccessCode(savedCode);
        setAuthState("unlocked");
    }, []);

    useEffect(() => {
        if (authState !== "unlocked" || !accessCode) {
            return;
        }

        let mounted = true;

        const load = async () => {
            try {
                await fetchConfig();
            } catch {
                if (mounted) {
                    setError("Could not load Schedule config.");
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            mounted = false;
        };
    }, [accessCode, authState, fetchConfig]);

    async function unlock() {
        setAuthError("");
        const normalized = accessCode.trim();

        if (!normalized) {
            setAuthError("Enter your access code.");
            return;
        }

        try {
            await apiClient.post("/admin/auth", { code: normalized });
        } catch {
            setAuthError("Invalid code. Try again.");
            return;
        }

        sessionStorage.setItem(CODE_STORAGE_KEY, normalized);
        setAccessCode(normalized);
        setAuthState("unlocked");
    }

    function updateEvent(index: number, patch: Partial<ScheduleEvent>) {
        setData((prev) => {
            const nextEvents = [...prev.events];
            nextEvents[index] = { ...nextEvents[index], ...patch };
            return { ...prev, events: nextEvents };
        });
        setIsDirty(true);
        setSuccess("");
    }

    function addEvent() {
        setData((prev) => ({
            ...prev,
            events: [...prev.events, emptyEvent(prev.events.length)],
        }));
        setIsDirty(true);
        setSuccess("");
    }

    function removeEvent(index: number) {
        setData((prev) => ({
            ...prev,
            events: prev.events.filter((_, idx) => idx !== index),
        }));
        setIsDirty(true);
        setSuccess("");
    }

    async function save() {
        setSaving(true);
        setError("");

        let payload: EditorState;
        try {
            const response = await apiClient.put<EditorState>("/config/schedule", data, {
                headers: authHeaders,
            });
            payload = response.data;
        } catch {
            setSaving(false);
            setError("Could not save changes.");
            return;
        }

        setData(payload);
        setIsDirty(false);
        setSaving(false);
        setSuccess("Saved. Public schedule now reflects this update.");
    }

    if (authState === "checking") {
        return <main className="min-h-screen bg-surface" />;
    }

    return (
        <main className="min-h-screen bg-surface px-4 py-10 sm:px-6 lg:px-8">
            {authState === "locked" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_24px_80px_rgba(30,30,30,0.2)] sm:p-8">
                        <p className="font-openSans text-xs font-bold uppercase tracking-[0.14em] text-ink/55">
                            Protected Route
                        </p>
                        <h1 className="mt-2 text-2xl font-bold text-ink">Enter Access Code</h1>
                        <p className="mt-2 text-sm text-ink/65">
                            This config editor is restricted. Enter your custom code to continue.
                        </p>

                        <input
                            value={accessCode}
                            onChange={(event) => setAccessCode(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    unlock();
                                }
                            }}
                            className="mt-5 w-full rounded-xl bg-surface px-4 py-3 text-sm text-ink outline-none ring-2 ring-transparent transition-shadow focus:ring-coreBlue/30"
                            placeholder="Enter config access code"
                            type="password"
                        />

                        {authError && <p className="mt-3 text-sm text-coreRed">{authError}</p>}

                        <button
                            type="button"
                            onClick={unlock}
                            className="mt-5 w-full rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-coreBlue"
                        >
                            Unlock Config
                        </button>
                    </div>
                </div>
            )}

            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="font-openSans text-xs font-bold uppercase tracking-[0.14em] text-ink/55">Config Route</p>
                        <h1 className="mt-2 text-3xl font-bold text-ink">Schedule</h1>
                    </div>
                    <Link href="/config" className="text-sm font-semibold text-coreBlue">
                        Back to config routes
                    </Link>
                </div>

                <section className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(30,30,30,0.06)] sm:p-8">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-ink">Events</h2>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={addEvent}
                                className="rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-ink transition-colors duration-200 hover:bg-[#e8e8e8]"
                            >
                                Add event
                            </button>
                            <button
                                type="button"
                                onClick={save}
                                disabled={saving || loading || !isDirty}
                                className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-45"
                            >
                                {saving ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </div>

                    {error && <p className="mb-4 text-sm text-coreRed">{error}</p>}
                    {success && <p className="mb-4 text-sm text-coreGreen">{success}</p>}
                    {loading ? (
                        <div className="space-y-4">
                            {[0, 1].map((slot) => (
                                <div key={slot} className="rounded-2xl bg-surface p-4 sm:p-5">
                                    <div className="h-4 w-24 animate-pulse rounded bg-ink/10" />
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        <div className="h-10 w-full animate-pulse rounded-xl bg-white" />
                                        <div className="h-10 w-full animate-pulse rounded-xl bg-white" />
                                        <div className="h-10 w-full animate-pulse rounded-xl bg-white sm:col-span-2" />
                                        <div className="h-20 w-full animate-pulse rounded-xl bg-white sm:col-span-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {data.events.map((event, index) => (
                                <div key={event.id} className="rounded-2xl bg-surface p-4 sm:p-5">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <p className="text-sm font-bold text-ink">Event {index + 1}</p>
                                        <button
                                            type="button"
                                            onClick={() => removeEvent(index)}
                                            className="text-sm font-semibold text-coreRed"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <label className="text-sm font-semibold text-ink">
                                            Order
                                            <input
                                                type="number"
                                                min={1}
                                                value={event.order}
                                                onChange={(entry) => updateEvent(index, { order: Number(entry.target.value) || 1 })}
                                                className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink outline-none ring-2 ring-transparent focus:ring-coreBlue/30"
                                            />
                                        </label>

                                        <label className="text-sm font-semibold text-ink">
                                            Date Label
                                            <input
                                                value={event.date}
                                                onChange={(entry) => updateEvent(index, { date: entry.target.value })}
                                                className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink outline-none ring-2 ring-transparent focus:ring-coreBlue/30"
                                                placeholder="April 18, 2026"
                                            />
                                        </label>

                                        <label className="text-sm font-semibold text-ink sm:col-span-2">
                                            Title
                                            <input
                                                value={event.title}
                                                onChange={(entry) => updateEvent(index, { title: entry.target.value })}
                                                className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink outline-none ring-2 ring-transparent focus:ring-coreBlue/30"
                                            />
                                        </label>

                                        <label className="text-sm font-semibold text-ink sm:col-span-2">
                                            Summary
                                            <textarea
                                                value={event.summary}
                                                onChange={(entry) => updateEvent(index, { summary: entry.target.value })}
                                                className="mt-1.5 min-h-20 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink outline-none ring-2 ring-transparent focus:ring-coreBlue/30"
                                            />
                                        </label>

                                        <label className="text-sm font-semibold text-ink">
                                            Track Tag
                                            <input
                                                value={event.track}
                                                onChange={(entry) => updateEvent(index, { track: entry.target.value })}
                                                className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink outline-none ring-2 ring-transparent focus:ring-coreBlue/30"
                                            />
                                        </label>

                                        <label className="text-sm font-semibold text-ink">
                                            Session Type
                                            <input
                                                value={event.sessionType}
                                                onChange={(entry) => updateEvent(index, { sessionType: entry.target.value })}
                                                className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink outline-none ring-2 ring-transparent focus:ring-coreBlue/30"
                                            />
                                        </label>

                                        <label className="text-sm font-semibold text-ink">
                                            Time
                                            <input
                                                value={event.time}
                                                onChange={(entry) => updateEvent(index, { time: entry.target.value })}
                                                className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink outline-none ring-2 ring-transparent focus:ring-coreBlue/30"
                                                placeholder="10:00 AM"
                                            />
                                        </label>

                                        <label className="text-sm font-semibold text-ink">
                                            Location
                                            <input
                                                value={event.location}
                                                onChange={(entry) => updateEvent(index, { location: entry.target.value })}
                                                className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink outline-none ring-2 ring-transparent focus:ring-coreBlue/30"
                                                placeholder="OAU Tech Hub"
                                            />
                                        </label>

                                        <label className="text-sm font-semibold text-ink sm:col-span-2">
                                            Ticket Link
                                            <input
                                                value={event.ticketHref}
                                                onChange={(entry) => updateEvent(index, { ticketHref: entry.target.value })}
                                                className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink outline-none ring-2 ring-transparent focus:ring-coreBlue/30"
                                                placeholder="https://..."
                                            />
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
