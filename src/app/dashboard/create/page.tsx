"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Sparkles, Download, Repeat2, Layers, Play, Pause, RefreshCw, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

type GenerationState = "idle" | "generating" | "success" | "failed";

const styleOptions = [
  { label: "Auto", color: "#78716C" },
  { label: "Pop", color: "#C94F14" },
  { label: "Hip-Hop", color: "#7B61FF" },
  { label: "Lo-Fi", color: "#2D9E6B" },
  { label: "Jazz", color: "#4DAFFF" },
  { label: "EDM", color: "#E8B840" },
  { label: "Ambient", color: "#9B8EA0" },
  { label: "Rock", color: "#C94F14" },
  { label: "Classical", color: "#78716C" },
  { label: "R&B", color: "#7B61FF" },
];

const generatingMessages = [
  "cooking something good...",
  "vibing with the AI...",
  "your track is forming...",
  "mixing it all together...",
  "almost there...",
];

const placeholders = [
  "a heartbreak song but make it danceable",
  "chill lofi beat for late night coding sessions",
  "upbeat pop song about a road trip at sunrise",
  "dark cinematic hip-hop instrumental",
  "jazzy cafe vibes with soft piano",
];

function CreatePageContent() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState(searchParams.get("prompt") || "");
  const [style, setStyle] = useState("Auto");
  const [instrumental, setInstrumental] = useState(false);
  const [state, setState] = useState<GenerationState>("idle");
  const [playing, setPlaying] = useState(false);
  const [generated, setGenerated] = useState<{ title: string; duration: string; audioUrl?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [msgIndex, setMsgIndex] = useState(0);
  const [placeholderIndex] = useState(() => Math.floor(Math.random() * placeholders.length));
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (state !== "generating") return;
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % generatingMessages.length), 2500);
    return () => clearInterval(id);
  }, [state]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setState("generating");
    setMsgIndex(0);
    setPlaying(false);
    setError(null);

    try {
      const genRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, instrumental }),
      });
      const genData = await genRes.json();
      const taskId = genData?.data?.taskId;
      if (!taskId) throw new Error(genData?.msg || "No taskId returned");

      let audioUrl: string | undefined;
      let title = deriveTitle(prompt);
      let duration = "—";
      for (let i = 0; i < 80; i++) {
        await new Promise((r) => setTimeout(r, 3000));
        const statusRes = await fetch(`/api/status?taskId=${taskId}`);
        const statusData = await statusRes.json();

        if (statusData.failed) throw new Error(statusData.errorMessage || "Generation failed");

        if (statusData.done && statusData.tracks?.length > 0) {
          const track = statusData.tracks[0];
          audioUrl = track.audioUrl;
          title = track.title || title;
          if (track.duration) {
            const m = Math.floor(track.duration / 60);
            const s = Math.floor(track.duration % 60);
            duration = `${m}:${s.toString().padStart(2, "0")}`;
          }
          break;
        }

        if (statusData.status === "FIRST_SUCCESS" && statusData.tracks?.[0]?.audioUrl) {
          const track = statusData.tracks[0];
          audioUrl = track.audioUrl;
          title = track.title || title;
          duration = "~3:00";
          break;
        }
      }

      setState("success");
      setGenerated({ title, duration, audioUrl });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      setState("failed");
    }
  };

  const deriveTitle = (p: string) => {
    const words = p.split(" ").slice(0, 3).map((w) => w.charAt(0).toUpperCase() + w.slice(1));
    return words.join(" ");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: "easeOut" as const }}
        style={{ marginBottom: 24 }}
      >
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.5vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#1A1714", marginBottom: 4 }}>
          Create a track.
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-3)", fontStyle: "italic", fontFamily: "var(--font-display)" }}>Describe the vibe. Get a full song.</p>
      </motion.div>

      {/* Input card */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.06, ease: "easeOut" as const }}
        style={{ background: "white", borderRadius: 8, padding: 24, marginBottom: 12, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        {/* Prompt */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 10, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: 8 }}>
            Describe your track
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholders[placeholderIndex]}
            rows={3}
            style={{
              width: "100%",
              padding: "11px 13px",
              borderRadius: 6,
              border: "1px solid var(--border)",
              background: "var(--bg)",
              fontSize: 13,
              color: "#1A1714",
              outline: "none",
              resize: "none",
              lineHeight: 1.65,
              fontFamily: "var(--font-body)",
              transition: "border-color 0.12s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--border-mid)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Style chips */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 10, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: 8 }}>
            Genre
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {styleOptions.map((s) => {
              const isActive = style === s.label;
              return (
                <button
                  key={s.label}
                  onClick={() => setStyle(s.label)}
                  style={{
                    padding: "5px 11px",
                    borderRadius: 4,
                    border: `1px solid ${isActive ? s.color : "var(--border)"}`,
                    background: isActive ? `${s.color}12` : "transparent",
                    color: isActive ? s.color : "var(--text-2)",
                    fontSize: 12,
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.12s",
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instrumental toggle */}
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => setInstrumental(!instrumental)}
            style={{
              padding: "6px 14px",
              borderRadius: 4,
              border: `1px solid ${instrumental ? "#1A1714" : "var(--border)"}`,
              background: instrumental ? "#1A1714" : "transparent",
              fontSize: 12,
              fontWeight: instrumental ? 600 : 400,
              color: instrumental ? "white" : "var(--text-2)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-body)",
              transition: "all 0.12s",
            }}
          >
            <Mic size={12} />
            {instrumental ? "No vocals ✓" : "No vocals"}
          </button>
        </div>

        {/* Generate button */}
        <button
          className={`btn-gradient ${state === "generating" ? "generating" : ""}`}
          onClick={handleGenerate}
          disabled={!prompt.trim() || state === "generating"}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 14,
            padding: "11px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            borderRadius: 6,
          }}
        >
          {state === "generating" ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 2, height: 14 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                    style={{ width: 2, height: "100%", borderRadius: 1, background: "rgba(255,255,255,0.85)", transformOrigin: "center" }}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.span key={msgIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {generatingMessages[msgIndex]}
                </motion.span>
              </AnimatePresence>
            </>
          ) : (
            <>
              <Sparkles size={14} />
              Generate
              {style !== "Auto" && <span style={{ fontSize: 11, opacity: 0.7, fontWeight: 500 }}>· {style}</span>}
            </>
          )}
        </button>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {state === "failed" && error && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              marginBottom: 12,
              padding: "11px 14px",
              borderRadius: 6,
              background: "rgba(220,38,38,0.05)",
              border: "1px solid rgba(220,38,38,0.15)",
              fontSize: 12,
              color: "#dc2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{error}</span>
            <button onClick={() => setState("idle")} style={{ fontSize: 11, color: "#dc2626", fontWeight: 600, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "var(--font-body)" }}>
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {state === "success" && generated && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            style={{
              background: "white",
              borderRadius: 8,
              padding: 24,
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-3)", marginBottom: 16, display: "flex", alignItems: "center", gap: 5, textTransform: "uppercase", letterSpacing: "0.09em" }}>
              <Sparkles size={11} color="#C94F14" />
              Track ready
            </div>

            {generated.audioUrl && (
              <audio ref={audioRef} src={generated.audioUrl} onEnded={() => setPlaying(false)} />
            )}

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <button
                onClick={() => {
                  if (!audioRef.current) return;
                  if (playing) { audioRef.current.pause(); setPlaying(false); }
                  else { audioRef.current.play(); setPlaying(true); }
                }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 6,
                  background: "#1A1714",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#2D2620")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1714")}
              >
                {playing ? <Pause size={16} color="white" fill="white" /> : <Play size={16} color="white" fill="white" />}
              </button>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1714", marginBottom: 7, letterSpacing: "-0.01em" }}>{generated.title}</div>
                <div style={{ height: 28, display: "flex", alignItems: "center", gap: 1 }}>
                  {Array.from({ length: 60 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={playing ? { scaleY: [1, 0.3 + Math.random() * 0.7, 1] } : { scaleY: 1 }}
                      transition={{ duration: 0.6 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.018 }}
                      style={{
                        flex: 1,
                        height: `${10 + Math.sin(i * 0.4) * 8 + Math.sin(i * 0.9) * 4}px`,
                        borderRadius: 1,
                        background: i < 20 ? "#1A1714" : "rgba(28,24,20,0.08)",
                        transformOrigin: "center",
                      }}
                    />
                  ))}
                </div>
              </div>
              <span style={{ fontSize: 11, color: "var(--text-3)", flexShrink: 0 }}>{generated.duration}</span>
            </div>

            <div style={{ display: "flex", gap: 7 }}>
              {[
                { icon: Layers, label: "Extend" },
                { icon: Repeat2, label: "Remix" },
              ].map(({ icon: Icon, label }) => (
                <Button key={label} variant="secondary" size="sm" style={{ flex: 1 }}>
                  <Icon size={12} /> {label}
                </Button>
              ))}
              <a href={generated.audioUrl ?? "#"} download={`${generated.title}.mp3`} style={{ flex: 1, textDecoration: "none" }}>
                <Button variant="default" size="sm" style={{ width: "100%" }}>
                  <Download size={12} /> Save
                </Button>
              </a>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setState("idle")}
              >
                <RefreshCw size={12} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div />}>
      <CreatePageContent />
    </Suspense>
  );
}
