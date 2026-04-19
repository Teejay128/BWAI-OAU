"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import BlackPillButton from "@/components/BlackPillButton";
import { GDG_OAU_LOGO, NAV_LINKS, SITE_LINKS } from "@/lib/config";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();

  const navOrder: Record<string, number> = {
    "/schedule": 1,
    "/main-event": 2,
    "/sponsors": 3,
    "/what-was-built": 4,
  };

  const orderedNavLinks = [...NAV_LINKS].sort(
    (a, b) => (navOrder[a.href] ?? 99) - (navOrder[b.href] ?? 99),
  );

  useEffect(() => {
    function onScroll() {
      setIsAtTop(window.scrollY <= 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function isActiveRoute(href: string): boolean {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <motion.header
      className={`sticky top-0 z-40 transition-colors duration-300 ${isAtTop && !isOpen
        ? "border-b border-transparent bg-transparent"
        : "border-b border-ink/10 bg-base/95 backdrop-blur-sm"
        }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        >
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={GDG_OAU_LOGO.src}
              alt={GDG_OAU_LOGO.alt}
              width={120}
              height={36}
              className="h-12 w-auto"
              priority
              loading="eager"
            />
          </Link>
        </motion.div>

        <div className="hidden items-center gap-10 md:flex">
          {orderedNavLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 + index * 0.06 }}
            >
              <Link
                href={link.href}
                className={`font-medium transition-[transform,color] duration-300 ease-out hover:-translate-y-0.5 hover:text-coreBlue ${isActiveRoute(link.href) ? "text-coreBlue" : "text-ink"
                  }`}
                style={{ fontSize: "1.05rem" }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.18 }}
        >
          <BlackPillButton
            label="Register Interest"
            href={SITE_LINKS.registerInterest}
          />
        </motion.div>

        <button
          type="button"
          className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white/60 text-ink transition-transform duration-200 hover:-translate-y-0.5 md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="relative flex h-5 w-5 items-center justify-center">
            <motion.span
              animate={{ y: isOpen ? 0 : -5, rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.18 }}
              className="absolute h-0.5 w-5 rounded-full bg-ink"
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
              transition={{ duration: 0.16 }}
              className="absolute h-0.5 w-5 rounded-full bg-ink"
            />
            <motion.span
              animate={{ y: isOpen ? 0 : 5, rotate: isOpen ? -45 : 0 }}
              transition={{ duration: 0.18 }}
              className="absolute h-0.5 w-5 rounded-full bg-ink"
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="border-t border-ink/10 bg-base/95 px-4 py-4 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="mx-auto max-w-7xl rounded-3xl border border-ink/10 bg-white/85 p-3 shadow-[0_20px_45px_-35px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col gap-2">
                {orderedNavLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut", delay: 0.03 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 font-medium transition-[transform,color,background-color,border-color] duration-300 ease-out hover:translate-x-0.5 ${isActiveRoute(link.href)
                          ? "border-coreBlue/30 bg-coreBlue/10 text-coreBlue"
                          : "border-ink/10 bg-base/70 text-ink hover:border-coreBlue/25 hover:text-coreBlue"
                        }`}
                      style={{ fontSize: "1rem" }}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                      <span aria-hidden className="text-xs text-ink/45">
                        /
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-3">
                <BlackPillButton
                  label="Register Interest"
                  href={SITE_LINKS.registerInterest}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
