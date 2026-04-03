import { NextResponse } from "next/server";
import { CONFIG_AUTH_HEADER, isValidConfigCode } from "@/lib/config-auth";
import {
  getSchedulePageData,
  saveSchedulePageData,
  type SchedulePageData,
} from "@/lib/schedule-data";

function isAuthorized(request: Request): boolean {
  return isValidConfigCode(request.headers.get(CONFIG_AUTH_HEADER));
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const data = await getSchedulePageData();

  return NextResponse.json(data, {
    headers: {
      "cache-control": "no-store",
    },
  });
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request
    .json()
    .catch(() => null)) as SchedulePageData | null;

  if (!body || !Array.isArray(body.events)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const updated = await saveSchedulePageData(body);
  return NextResponse.json(updated);
}
