"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Search, Layers, Repeat2, Download, Trash2, Bookmark, BookmarkCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const tracks = [
  { id: 1, title: "Midnight Drift", genre: "Lo-Fi", duration: "2:47", date: "Today", color: "#7B61FF", saved: true },
  { id: 2, title: "Solar Pulse", genre: "EDM", duration: "3:12", date: "Today", color: "#C94F14", saved: false },
  { id: 3, title: "Warm Evenings", genre: "Jazz", duration: "1:58", date: "Yesterday", color: "#2D9E6B", saved: true },
  { id: 4, title: "Neon Haze", genre: "Hip-Hop", duration: "2:31", date: "Mar 17", color: "#4DAFFF", saved: false },
  { id: 5, title: "Glass Rain", genre: "Ambient", duration: "4:02", date: "Mar 15", color: "#9B8EA0", saved: true },
  { id: 6, title: "Rust & Gold", genre: "Folk", duration: "3:44", date: "Mar 12", color: "#E8B840", saved: false },
];

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.18, ease: "easeOut" as const } };

export default function LibraryPage() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "saved">("all");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<Set<number>>(new Set(tracks.filter((t) => t.saved).map((t) => t.id)));

  const filtered = tracks.filter((t) => {
    if (filter === "saved" && !saved.has(t.id)) return false;
    if (query && !t.title.toLowerCase().includes(query.toLowerCase()) && !t.genre.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>

      <motion.div {...fade} style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", color: "#1A1714", lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: 4 }}>
          Library.
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-3)" }}>Your generated tracks.</p>
      </motion.div>

      {/* Controls */}
      <motion.div {...fade} transition={{ duration: 0.18, delay: 0.04, ease: "easeOut" as const }} style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 280 }}>
          <Search size={12} color="var(--text-3)" style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          <Input
            placeholder="Search tracks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: 28 }}
          />
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {(["all", "saved"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "dark" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All tracks" : "Saved"}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Track list */}
      <motion.div {...fade} transition={{ duration: 0.18, delay: 0.07, ease: "easeOut" as const }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", background: "white", borderRadius: 8, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 16 }}>No tracks found.</div>
            <Link href="/dashboard/create">
              <Button variant="default" size="sm">
                <Sparkles size={12} /> Create your first track
              </Button>
            </Link>
          </div>
        ) : (
          <div style={{ background: "white", borderRadius: 8, border: "1px solid var(--border)", overflow: "hidden" }}>
            {filtered.map((track, i) => (
              <div
                key={track.id}
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "var(--bg)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
              >
                <button
                  onClick={() => setPlaying(playing === track.id ? null : track.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: `${track.color}14`,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${track.color}28`)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${track.color}14`)}
                >
                  {playing === track.id
                    ? <Pause size={12} color={track.color} fill={track.color} />
                    : <Play size={12} color={track.color} fill={track.color} />
                  }
                </button>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1714", marginBottom: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{track.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Badge variant="secondary" style={{ fontSize: 9 }}>{track.genre}</Badge>
                    <span style={{ fontSize: 10, color: "var(--text-3)" }}>{track.date}</span>
                  </div>
                </div>

                {/* Mini waveform */}
                <div style={{ display: "flex", alignItems: "center", gap: 1, height: 24, width: 60 }}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} style={{
                      flex: 1,
                      height: `${8 + Math.sin(i * 0.5) * 6}px`,
                      borderRadius: 1,
                      background: playing === track.id ? track.color : "rgba(28,24,20,0.1)",
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>

                <span style={{ fontSize: 11, color: "var(--text-3)", flexShrink: 0, width: 32, textAlign: "right" }}>{track.duration}</span>

                {/* Actions */}
                <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                  <Button variant="ghost" size="icon-sm" title="Extend">
                    <Layers size={12} />
                  </Button>
                  <Button variant="ghost" size="icon-sm" title="Remix">
                    <Repeat2 size={12} />
                  </Button>
                  <Button variant="ghost" size="icon-sm" title="Download">
                    <Download size={12} />
                  </Button>
                  <button
                    onClick={() => setSaved((prev) => { const n = new Set(prev); n.has(track.id) ? n.delete(track.id) : n.add(track.id); return n; })}
                    style={{ width: 28, height: 28, borderRadius: 4, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.1s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(28,24,20,0.05)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
                  >
                    {saved.has(track.id)
                      ? <BookmarkCheck size={12} color="#C94F14" fill="rgba(201,79,20,0.15)" />
                      : <Bookmark size={12} color="var(--text-3)" />
                    }
                  </button>
                  <Button variant="ghost" size="icon-sm" style={{ color: "rgba(220,38,38,0.5)" }}>
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
