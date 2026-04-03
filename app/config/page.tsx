"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/axios";

export const CODE_STORAGE_KEY = "bwai-config-code";

type AuthState = "checking" | "locked" | "unlocked";

export default function ConfigHomePage() {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [accessCode, setAccessCode] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const savedCode = sessionStorage.getItem(CODE_STORAGE_KEY);

    if (!savedCode) {
      setAuthState("locked");
      return;
    }

    setAccessCode(savedCode);
    setAuthState("unlocked");
  }, []);

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

  if (authState === "checking") {
    return <main className="min-h-screen bg-surface" />;
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-14 sm:px-6 lg:px-8">
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

      <div className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-8 shadow-[0_12px_40px_rgba(30,30,30,0.06)] sm:p-10">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Config Dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm text-ink/65 sm:text-base">
          Pick a route to manage live content. Changes saved here are reflected on the public pages in real time.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/config/schedule"
            className="group rounded-2xl bg-surface p-6 transition-colors duration-200 hover:bg-[#e8e8e8]"
          >
            <p className="text-xs font-openSans uppercase tracking-[0.12em] text-ink/55">Route</p>
            <h2 className="mt-2 text-xl font-bold text-ink">Schedule</h2>
            <p className="mt-2 text-sm text-ink/65">Event order, dates, titles, track tags, time, and location.</p>
            <span className="mt-5 inline-flex items-center text-sm font-semibold text-coreBlue">
              Open editor
            </span>
          </Link>

          <Link
            href="/config/what-was-built"
            className="group rounded-2xl bg-surface p-6 transition-colors duration-200 hover:bg-[#e8e8e8]"
          >
            <p className="text-xs font-openSans uppercase tracking-[0.12em] text-ink/55">Route</p>
            <h2 className="mt-2 text-xl font-bold text-ink">What Was Built</h2>
            <p className="mt-2 text-sm text-ink/65">Live counter, project cards, categories, links, tags, and likes.</p>
            <span className="mt-5 inline-flex items-center text-sm font-semibold text-coreBlue">
              Open editor
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
