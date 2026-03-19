import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.SUNO_API_BASE!;
const KEY = process.env.SUNO_API_KEY!;

// Suno status values: PENDING → TEXT_SUCCESS → FIRST_SUCCESS → SUCCESS
// Error values: CREATE_TASK_FAILED, GENERATE_AUDIO_FAILED, SENSITIVE_WORD_ERROR, CALLBACK_EXCEPTION

export async function GET(req: NextRequest) {
  const taskId = req.nextUrl.searchParams.get("taskId");
  if (!taskId) return NextResponse.json({ error: "Missing taskId" }, { status: 400 });

  const res = await fetch(`${BASE}/generate/record-info?taskId=${taskId}`, {
    headers: { Authorization: `Bearer ${KEY}` },
  });

  const raw = await res.json();
  const record = raw?.data;

  if (!record) return NextResponse.json(raw, { status: 200 });

  const status: string = record.status ?? "";
  const sunoData: any[] = record.response?.sunoData ?? [];

  // Normalize to a clean shape the frontend can use
  const done = status === "SUCCESS" || status === "FIRST_SUCCESS";
  const failed = ["CREATE_TASK_FAILED", "GENERATE_AUDIO_FAILED", "SENSITIVE_WORD_ERROR"].includes(status);

  const tracks = sunoData.map((t: any) => ({
    id: t.id,
    title: t.title,
    audioUrl: t.audioUrl || t.streamAudioUrl || t.sourceStreamAudioUrl || "",
    imageUrl: t.imageUrl || t.sourceImageUrl || "",
    duration: t.duration ?? null,
  }));

  return NextResponse.json({ status, done, failed, tracks, errorMessage: record.errorMessage });
}
