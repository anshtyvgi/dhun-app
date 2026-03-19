import { NextResponse } from "next/server";

const BASE = process.env.SUNO_API_BASE!;
const KEY = process.env.SUNO_API_KEY!;

export async function GET() {
  const res = await fetch(`${BASE}/get-credits`, {
    headers: { Authorization: `Bearer ${KEY}` },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
