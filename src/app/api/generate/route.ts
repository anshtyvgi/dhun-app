import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.SUNO_API_BASE!;
const KEY = process.env.SUNO_API_KEY!;

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Build prompt — append style tag if one is selected
  const promptText = body.style && body.style !== "Auto"
    ? `${body.prompt}, ${body.style} style`
    : body.prompt;

  const res = await fetch(`${BASE}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify({
      prompt: promptText,
      instrumental: body.instrumental ?? false,
      customMode: false,
      model: "V4",
      callBackUrl: "https://example.com/callback",
    }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.ok ? 200 : res.status });
}
