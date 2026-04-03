"use client";

import HeroCopy from "@/components/home/hero/HeroCopy";
import HeroPills from "@/components/home/hero/HeroPills";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pb-14 pt-16 sm:pt-20 lg:min-h-[calc(100vh-5rem)] lg:pb-18 lg:pt-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/gdg-hero-background.png')" }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_50%)]" />
      <HeroCopy />
      <HeroPills />
    </section>
  );
}
