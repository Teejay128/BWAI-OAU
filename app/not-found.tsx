import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-ink/60">Build with AI Week 2026</p>
      <h1 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/80 sm:text-lg">
        The page you are looking for does not exist yet. Return home to explore the event overview.
      </p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-black px-5 py-3 text-sm font-bold text-white">
        Go home
      </Link>
    </section>
  );
}