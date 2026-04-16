import { NextResponse } from "next/server";
import { CONFIG_AUTH_HEADER, isValidConfigCode } from "@/lib/config-auth";
import { deleteWhatWasBuiltProject } from "@/lib/what-was-built-data";

function isAuthorized(request: Request): boolean {
  return isValidConfigCode(request.headers.get(CONFIG_AUTH_HEADER));
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  try {
    await deleteWhatWasBuiltProject(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not delete project." }, { status: 500 });
  }
}
