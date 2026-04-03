import { NextResponse } from "next/server";
import { isValidConfigCode } from "@/lib/config-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { code?: string } | null;

  const code = body?.code?.trim();
  if (!code) {
    return NextResponse.json({ error: "Code is required." }, { status: 400 });
  }

  if (!process.env.CONFIG_ACCESS_CODE) {
    return NextResponse.json(
      { error: "CONFIG_ACCESS_CODE is not set on the server." },
      { status: 500 },
    );
  }

  if (!isValidConfigCode(code)) {
    return NextResponse.json({ error: "Invalid access code." }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
