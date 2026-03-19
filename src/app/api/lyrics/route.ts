import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.SUNO_API_BASE!;
const KEY = process.env.SUNO_API_KEY!;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const res = await fetch(`${BASE}/lyrics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
