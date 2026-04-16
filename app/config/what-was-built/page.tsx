"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CONFIG_AUTH_HEADER } from "@/lib/config-auth";
import { apiClient } from "@/lib/axios";
import { CODE_STORAGE_KEY } from "../page";

type EditorState = {
  publicFormEnabled: boolean;
  liveCount: number;
  projects: { id: number; name: string; community: string }[];
};

type AuthState = "checking" | "locked" | "unlocked";

export default function WhatWasBuiltConfigPage() {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [accessCode, setAccessCode] = useState("");
  const [authError, setAuthError] = useState("");

  const [data, setData] = useState<EditorState>({ publicFormEnabled: false, liveCount: 0, projects: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

    const { data: payload } = await apiClient.get<EditorState>("/config/what-was-built", {
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
          setError("Could not load What Was Built config.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    const interval = setInterval(async () => {
      if (isDirty || saving) {
        return;
      }

      try {
        await fetchConfig();
      } catch {
        // Do nothing on polling errors.
      }
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [accessCode, authState, fetchConfig, isDirty, saving]);

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

  function togglePublicForm() {
    setData((prev) => ({ ...prev, publicFormEnabled: !prev.publicFormEnabled }));
    setIsDirty(true);
    setSuccess("");
  }

  async function deleteProject(id: number) {
    setDeletingId(id);
    try {
      await apiClient.delete(`/config/what-was-built/${id}`, { headers: authHeaders });
      setData((prev) => ({
        ...prev,
        liveCount: prev.liveCount - 1,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
    } catch {
      setError("Could not delete project.");
    } finally {
      setDeletingId(null);
    }
  }

  async function save() {
    setSaving(true);
    setError("");

    let payload: EditorState;
    try {
      const response = await apiClient.put<EditorState>(
        "/config/what-was-built",
        { publicFormEnabled: data.publicFormEnabled },
        { headers: authHeaders },
      );
      payload = response.data;
    } catch {
      setSaving(false);
      setError("Could not save changes.");
      return;
    }

    setData(payload);
    setIsDirty(false);
    setSaving(false);
    setSuccess("Saved.");
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

      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-openSans text-xs font-bold uppercase tracking-[0.12em] text-ink/55">Config Route</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">What Was Built</h1>
          </div>
          <Link href="/config" className="text-sm font-semibold text-coreBlue">
            Back to config routes
          </Link>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(30,30,30,0.06)] sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-ink">Page Settings</h2>
            <button
              type="button"
              onClick={save}
              disabled={saving || loading || !isDirty}
              className="cursor-pointer rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>

          {error && <p className="mb-4 text-sm text-coreRed">{error}</p>}
          {success && <p className="mb-4 text-sm text-coreGreen">{success}</p>}

          {loading ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-surface px-4 py-3">
                <div className="h-3 w-24 animate-pulse rounded bg-ink/10" />
                <div className="mt-2 h-4 w-48 animate-pulse rounded bg-ink/10" />
              </div>
              <div className="rounded-xl bg-surface px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-44 animate-pulse rounded bg-ink/10" />
                    <div className="h-3 w-64 animate-pulse rounded bg-ink/10" />
                  </div>
                  <div className="h-6 w-11 animate-pulse rounded-full bg-ink/10" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Live counter */}
              <div className="rounded-xl bg-surface px-4 py-3">
                <p className="text-xs font-openSans uppercase tracking-[0.12em] text-ink/55">Live Counter</p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {data.liveCount} project{data.liveCount !== 1 ? "s" : ""} submitted
                </p>
              </div>

              {/* Submitted Projects */}
              {data.projects.length > 0 && (
                <div className="rounded-xl bg-surface px-4 py-4">
                  <p className="mb-3 text-sm font-bold text-ink">Submitted Projects</p>
                  <ul className="space-y-2">
                    {data.projects.map((project) => (
                      <li
                        key={project.id}
                        className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2.5"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-ink">{project.name}</p>
                          <p className="truncate text-xs text-ink/50">{project.community}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteProject(project.id)}
                          disabled={deletingId === project.id}
                          aria-label={`Delete ${project.name}`}
                          className="shrink-0 rounded-lg p-1.5 text-ink/35 transition-colors hover:bg-coreRed/10 hover:text-coreRed disabled:opacity-40"
                        >
                          {deletingId === project.id ? (
                            <svg
                              className="h-4 w-4 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Public Submission Form Toggle */}
              <div className="rounded-xl bg-surface px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-ink">Public Submission Form</p>
                    <p className="mt-0.5 text-xs text-ink/55">
                      When active, anyone with the link can submit their project via the public form.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={data.publicFormEnabled}
                    onClick={togglePublicForm}
                    className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coreBlue/40 ${data.publicFormEnabled ? "bg-coreBlue" : "bg-ink/20"}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${data.publicFormEnabled ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </button>
                </div>

                {data.publicFormEnabled && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-coreBlue/10 px-3 py-2.5">
                    <span className="text-xs font-semibold text-coreBlue">Form URL</span>
                    <code className="flex-1 truncate font-robotoMono text-xs text-ink/70">
                      {typeof window !== "undefined"
                        ? `${window.location.origin}/submit-project`
                        : "/submit-project"}
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/submit-project`,
                        );
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-coreBlue transition-colors hover:bg-coreBlue/10"
                    >
                      {isCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
