import AboutSection from "@/components/home/sections/AboutSection";
import BuildWithAi2025Section from "@/components/home/sections/BuildWithAi2025Section";
import HeroSection from "@/components/home/hero/HeroSection";
import GrandFinaleTeaserSection from "@/components/home/sections/GrandFinaleTeaserSection";
import SponsorsSection from "@/components/home/sections/SponsorsSection";
import PreSeriesSection from "@/components/home/sections/PreSeriesSection";
import MainEventSection from "@/components/home/sections/MainEventSection";
import { getSchedulePageData } from "@/lib/schedule-data";

export default async function Home() {
  const scheduleData = await getSchedulePageData();

  return (
    <div className="bg-base">
      <HeroSection />
      <AboutSection />
      <BuildWithAi2025Section />
      <PreSeriesSection events={scheduleData.events} />
      <SponsorsSection />
      <GrandFinaleTeaserSection />
    </div>
  );
}
