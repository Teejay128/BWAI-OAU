import "server-only";

import { SCHEDULE_DEFAULT_EVENTS, type ScheduleEvent } from "@/lib/config";
import { prisma } from "@/lib/prisma";

export type SchedulePageData = {
  events: ScheduleEvent[];
};

type SavePayload = {
  events: ScheduleEvent[];
};

function fallbackData(): SchedulePageData {
  return {
    events: SCHEDULE_DEFAULT_EVENTS,
  };
}

function normalizeEvent(event: ScheduleEvent, index: number): ScheduleEvent {
  return {
    id: Number.isFinite(event.id)
      ? Math.max(1, Math.floor(event.id))
      : Date.now() + index,
    order: Number.isFinite(event.order)
      ? Math.max(1, Math.floor(event.order))
      : index + 1,
    date: event.date.trim(),
    title: event.title.trim(),
    summary: event.summary.trim(),
    track: event.track.trim(),
    sessionType: event.sessionType.trim(),
    time: event.time.trim(),
    location: event.location.trim(),
    ticketHref: event.ticketHref.trim() || "#",
  };
}

export async function getSchedulePageData(): Promise<SchedulePageData> {
  try {
    const config = await prisma.scheduleConfig.findUnique({
      where: { id: 1 },
      include: {
        events: {
          orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
        },
      },
    });

    if (!config) {
      return { events: [] };
    }

    return {
      events: config.events.map((event: any) => ({
        id: event.id,
        order: event.displayOrder + 1,
        date: event.date,
        title: event.title,
        summary: event.summary,
        track: event.track,
        sessionType: event.sessionType,
        time: event.time,
        location: event.location,
        ticketHref: event.ticketHref,
      })),
    };
  } catch {
    return { events: [] };
  }
}

export async function saveSchedulePageData(
  payload: SavePayload,
): Promise<SchedulePageData> {
  const normalizedEvents = payload.events
    .map((event, index) => normalizeEvent(event, index))
    .sort((a, b) => a.order - b.order)
    .map((event, index) => ({
      ...event,
      displayOrder: index,
    }));

  await prisma.$transaction(async (tx: any) => {
    await tx.scheduleConfig.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1 },
    });

    await tx.scheduleEvent.deleteMany({ where: { configId: 1 } });

    if (normalizedEvents.length > 0) {
      await tx.scheduleEvent.createMany({
        data: normalizedEvents.map((event) => ({
          displayOrder: event.displayOrder,
          date: event.date,
          title: event.title,
          summary: event.summary,
          track: event.track,
          sessionType: event.sessionType,
          time: event.time,
          location: event.location,
          ticketHref: event.ticketHref,
          configId: 1,
        })),
      });
    }
  });

  return getSchedulePageData();
}
