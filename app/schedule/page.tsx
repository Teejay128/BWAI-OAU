import PreSeriesTimeline from "@/components/schedule/PreSeriesTimeline";
import BlackPillButton from "@/components/BlackPillButton";
import ScheduleHero from "@/components/schedule/ScheduleHero";
import { SITE_LINKS } from "@/lib/config";
import { getSchedulePageData } from "@/lib/schedule-data";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
    const data = await getSchedulePageData();
    const events = [...data.events].sort((a, b) => a.order - b.order);

    return (
        <div className="min-h-screen bg-base">
            <ScheduleHero />

            <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8">
                <PreSeriesTimeline events={events} />

                <div className="mt-20 flex flex-col items-center gap-6 text-center sm:mt-24 lg:mt-28">
                    <p className="max-w-2xl text-[1rem] leading-8 text-ink/80 sm:text-lg">
                        It all builds toward the Main Event showcase.
                    </p>
                    <BlackPillButton label="View Main Event" href={SITE_LINKS.mainEvent} className="px-7" />
                </div>
            </section>
        </div>
    );
}
