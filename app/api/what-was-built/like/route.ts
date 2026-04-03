import { NextResponse } from "next/server";
import { toggleWhatWasBuiltProjectLike } from "@/lib/what-was-built-data";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { projectId?: number; deviceId?: string }
    | null;

  const projectId = Number(body?.projectId);
  const deviceId = body?.deviceId?.trim();

  if (!Number.isInteger(projectId) || projectId <= 0 || !deviceId) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  try {
    const result = await toggleWhatWasBuiltProjectLike(projectId, deviceId);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "Project not found.") {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ error: "Could not update like." }, { status: 500 });
  }
}
