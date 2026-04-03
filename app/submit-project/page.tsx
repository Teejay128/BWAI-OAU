"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  PROJECT_TRACK_CATEGORIES,
  TECH_TAG_COLORS,
  COMMUNITIES,
  type ProjectTrackCategory,
} from "@/lib/config";
import { apiClient } from "@/lib/axios";
import { MdCheckCircle, MdRocketLaunch } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";

type FormData = {
  name: string;
  community: string;
  category: ProjectTrackCategory;
  description: string;
  techTags: string[];
  tags: string;
  demoHref: string;
};

type PageStatus = "loading" | "closed" | "open" | "submitted";

const KNOWN_TECH_TAGS = Object.keys(TECH_TAG_COLORS);
const DESC_MAX = 300;

function CharCounter({ current, max }: { current: number; max: number }) {
  const remaining = max - current;
  const isClose = remaining <= 50;
  const isOver = remaining < 0;
  return (
    <span
      className={`ml-auto text-xs font-medium tabular-nums ${
        isOver ? "text-coreRed" : isClose ? "text-amber-500" : "text-ink/35"
      }`}
    >
      {current}/{max}
    </span>
  );
}

export default function SubmitProjectPage() {
  const [status, setStatus] = useState<PageStatus>("loading");
  const [form, setForm] = useState<FormData>({
    name: "",
    community: "",
    category: PROJECT_TRACK_CATEGORIES[0],
    description: "",
    techTags: [],
    tags: "",
    demoHref: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let mounted = true;

    apiClient
      .get<{ publicFormEnabled: boolean }>("/what-was-built")
      .then(({ data }) => {
        if (!mounted) return;
        setStatus(data.publicFormEnabled ? "open" : "closed");
      })
      .catch(() => {
        if (mounted) setStatus("closed");
      });

    return () => {
      mounted = false;
    };
  }, []);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitError("");
  }

  function toggleTechTag(tag: string) {
    setForm((prev) => {
      const next = prev.techTags.includes(tag)
        ? prev.techTags.filter((t) => t !== tag)
        : [...prev.techTags, tag];
      return { ...prev, techTags: next };
    });
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (!form.name.trim()) errors.name = "Project name is required.";
    else if (form.name.trim().length > 120) errors.name = "Max 120 characters.";

    if (!form.community.trim()) errors.community = "Team / community name is required.";
    else if (form.community.trim().length > 80) errors.community = "Max 80 characters.";

    if (!form.description.trim()) errors.description = "Description is required.";
    else if (form.description.trim().length > DESC_MAX)
      errors.description = `Max ${DESC_MAX} characters.`;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    const extraTags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      await apiClient.post("/what-was-built", {
        name: form.name.trim(),
        community: form.community.trim(),
        category: form.category,
        description: form.description.trim(),
        techTags: form.techTags,
        tags: extraTags,
        demoHref: form.demoHref.trim() || "#",
      });

      setSubmittedName(form.name.trim());
      setStatus("submitted");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ?? "";
      if (message.toLowerCase().includes("not currently open")) {
        setStatus("closed");
      } else {
        setSubmitError(message || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-ink/20 border-t-ink" />
      </div>
    );
  }

  // ── Closed ──────────────────────────────────────────────────────────────────
  if (status === "closed") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md text-center"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-ink/8">
            <FiAlertCircle size={28} className="text-ink/40" />
          </div>
          <h1 className="text-2xl font-bold text-ink">Submissions are closed</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            Project submissions are not currently open. Check back closer to the event or
            contact the organizers for more information.
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────────
  if (status === "submitted") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md text-center"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-coreBlue/10">
            <MdCheckCircle size={34} className="text-coreBlue" />
          </div>
          <h1 className="text-2xl font-bold text-ink">Project submitted!</h1>
          {submittedName && (
            <p className="mt-2 text-sm font-semibold text-ink/70">{submittedName}</p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            Your project has been added to the showcase. It will appear on the{" "}
            <a
              href="/what-was-built"
              className="font-semibold text-coreBlue underline-offset-2 hover:underline"
            >
              What Got Built
            </a>{" "}
            page once it&apos;s live.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm({
                name: "",
                community: "",
                category: PROJECT_TRACK_CATEGORIES[0],
                description: "",
                techTags: [],
                tags: "",
                demoHref: "",
              });
              setStatus("open");
            }}
            className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-coreBlue"
          >
            Submit another project
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Hero */}
      <section className="px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-coreBlue/12 px-4 py-1.5">
              <MdRocketLaunch size={15} className="text-coreBlue" />
              <span className="font-openSans text-xs font-bold uppercase tracking-[0.12em] text-coreBlue">
                Build With AI 2026
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink sm:text-5xl">
              Submit your project
            </h1>
            <p className="mt-3 max-w-lg text-[1rem] text-ink/60">
              Built something this week? Tell us about it. Your project will be featured on
              the official showcase.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            noValidate
          >
            {/* ── Section 1: About Your Project ────────────────────────────── */}
            <div className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(30,30,30,0.06)] sm:p-8">
              <h2 className="mb-1 text-lg font-bold text-ink">About your project</h2>
              <p className="mb-6 text-sm text-ink/50">The basics — what&apos;s it called and who built it?</p>

              <div className="space-y-4">
                {/* Project Name */}
                <div>
                  <label className="mb-1.5 flex items-center justify-between text-sm font-semibold text-ink">
                    <span>
                      Project name <span className="text-coreRed">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="e.g. EcoScan AI"
                    maxLength={120}
                    className={`w-full rounded-xl bg-surface px-4 py-3 text-sm text-ink outline-none ring-2 transition-shadow placeholder:text-ink/30 focus:ring-coreBlue/30 ${
                      fieldErrors.name ? "ring-coreRed/40" : "ring-transparent"
                    }`}
                  />
                  <AnimatePresence>
                    {fieldErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1.5 text-xs text-coreRed"
                      >
                        {fieldErrors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Community + Category row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Community */}
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">
                      Team / community <span className="text-coreRed">*</span>
                    </label>
                    <input
                      type="text"
                      list="community-suggestions"
                      value={form.community}
                      onChange={(e) => set("community", e.target.value)}
                      placeholder="e.g. GDG OAU"
                      maxLength={80}
                      className={`w-full rounded-xl bg-surface px-4 py-3 text-sm text-ink outline-none ring-2 transition-shadow placeholder:text-ink/30 focus:ring-coreBlue/30 ${
                        fieldErrors.community ? "ring-coreRed/40" : "ring-transparent"
                      }`}
                    />
                    <datalist id="community-suggestions">
                      {COMMUNITIES.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                    <AnimatePresence>
                      {fieldErrors.community && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1.5 text-xs text-coreRed"
                        >
                          {fieldErrors.community}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Track */}
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">
                      Track <span className="text-coreRed">*</span>
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => set("category", e.target.value as ProjectTrackCategory)}
                      className="w-full rounded-xl bg-surface px-4 py-3 text-sm text-ink outline-none ring-2 ring-transparent transition-shadow focus:ring-coreBlue/30"
                    >
                      {PROJECT_TRACK_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 2: What You Built ─────────────────────────────────── */}
            <div className="mt-4 rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(30,30,30,0.06)] sm:p-8">
              <h2 className="mb-1 text-lg font-bold text-ink">What you built</h2>
              <p className="mb-6 text-sm text-ink/50">A short pitch for the showcase card.</p>

              <div>
                <label className="mb-1.5 flex items-center text-sm font-semibold text-ink">
                  <span>
                    Description <span className="text-coreRed">*</span>
                  </span>
                  <CharCounter current={form.description.length} max={DESC_MAX} />
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Describe what your project does in 1–3 sentences. What problem does it solve? What makes it interesting?"
                  rows={4}
                  maxLength={DESC_MAX + 20}
                  className={`w-full resize-none rounded-xl bg-surface px-4 py-3 text-sm leading-relaxed text-ink outline-none ring-2 transition-shadow placeholder:text-ink/30 focus:ring-coreBlue/30 ${
                    fieldErrors.description ? "ring-coreRed/40" : "ring-transparent"
                  }`}
                />
                <AnimatePresence>
                  {fieldErrors.description && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-xs text-coreRed"
                    >
                      {fieldErrors.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Section 3: Tech & Links ──────────────────────────────────── */}
            <div className="mt-4 rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(30,30,30,0.06)] sm:p-8">
              <h2 className="mb-1 text-lg font-bold text-ink">Tech &amp; links</h2>
              <p className="mb-6 text-sm text-ink/50">Optional — but helps tell the full story.</p>

              <div className="space-y-5">
                {/* Tech Tags */}
                <div>
                  <p className="mb-2.5 text-sm font-semibold text-ink">Tech stack used</p>
                  <div className="flex flex-wrap gap-2">
                    {KNOWN_TECH_TAGS.map((tag) => {
                      const active = form.techTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTechTag(tag)}
                          className={`inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 ${
                            active
                              ? "bg-ink text-white"
                              : "border border-ink/20 bg-white text-ink hover:border-ink/40 hover:bg-ink/5"
                          }`}
                        >
                          {active && (
                            <span className="mr-1.5 text-white/70">✓</span>
                          )}
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Labels */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Additional labels{" "}
                    <span className="font-normal text-ink/40">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => set("tags", e.target.value)}
                    placeholder="e.g. Pre-Series, Main Event — comma-separated"
                    className="w-full rounded-xl bg-surface px-4 py-3 text-sm text-ink outline-none ring-2 ring-transparent transition-shadow placeholder:text-ink/30 focus:ring-coreBlue/30"
                  />
                </div>

                {/* Demo Link */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Demo / GitHub link{" "}
                    <span className="font-normal text-ink/40">(optional)</span>
                  </label>
                  <input
                    type="url"
                    value={form.demoHref}
                    onChange={(e) => set("demoHref", e.target.value)}
                    placeholder="https://your-demo.app"
                    className="w-full rounded-xl bg-surface px-4 py-3 text-sm text-ink outline-none ring-2 ring-transparent transition-shadow placeholder:text-ink/30 focus:ring-coreBlue/30"
                  />
                </div>
              </div>
            </div>

            {/* ── Submit ───────────────────────────────────────────────────── */}
            <div className="mt-6">
              <AnimatePresence>
                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 flex items-center gap-2 text-sm text-coreRed"
                  >
                    <FiAlertCircle size={15} />
                    {submitError}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-coreBlue disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Submitting…
                  </span>
                ) : (
                  "Submit project"
                )}
              </button>

              <p className="mt-3 text-xs text-ink/40">
                Submitted projects are reviewed by the team before going live.
              </p>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
