import { NextResponse } from "next/server";
import {
  getWhatWasBuiltPageData,
  submitPublicProject,
  type PublicSubmitPayload,
} from "@/lib/what-was-built-data";
import { COMMUNITIES } from "@/lib/config";

export async function GET() {
  const data = await getWhatWasBuiltPageData();
  return NextResponse.json(data, {
    headers: {
      "cache-control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<PublicSubmitPayload> | null;

  const name = body?.name?.trim();
  const community = body?.community?.trim();
  const description = body?.description?.trim();
  const techTags = Array.isArray(body?.techTags) ? body.techTags : [];
  const tags = Array.isArray(body?.tags) ? body.tags : [];
  const demoHref = body?.demoHref?.trim() ?? "#";

  if (!name || !community || !description) {
    return NextResponse.json({ error: "Name, community, and description are required." }, { status: 400 });
  }

  if (!COMMUNITIES.includes(community as never)) {
    return NextResponse.json({ error: "A valid community is required." }, { status: 400 });
  }

  if (name.length > 120 || description.length > 500 || community.length > 80) {
    return NextResponse.json({ error: "One or more fields exceed the maximum length." }, { status: 400 });
  }

  try {
    await submitPublicProject({
      name,
      community: community as PublicSubmitPayload["community"],
      description,
      techTags,
      tags,
      demoHref,
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "FORM_CLOSED") {
      return NextResponse.json({ error: "Submissions are not currently open." }, { status: 403 });
    }
    return NextResponse.json({ error: "Could not submit project." }, { status: 500 });
  }
}
