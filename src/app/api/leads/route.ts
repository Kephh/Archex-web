import { NextResponse } from "next/server";
import { createLead } from "@/features/leads/service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_000) {
    return NextResponse.json({ ok: false, message: "The enquiry is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const result = await createLead(payload);
  return NextResponse.json({ ok: result.ok, message: result.message }, { status: result.status });
}
