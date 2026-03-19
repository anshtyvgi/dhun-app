"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Heart, Share2, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const communityTracks = [
  { id: 1, title: "Coastal Drive", user: "maya_beats", genre: "Lo-Fi", plays: "2.4K", color: "#7B61FF", liked: false },
  { id: 2, title: "Burning Skies", user: "solarflare", genre: "EDM", plays: "5.1K", color: "#C94F14", liked: true },
  { id: 3, title: "Slow Burn", user: "jazzcat99", genre: "Jazz", plays: "1.8K", color: "#2D9E6B", liked: false },
  { id: 4, title: "Chrome Dreams", user: "neonwave", genre: "Synthwave", plays: "3.7K", color: "#4DAFFF", liked: true },
  { id: 5, title: "Last Summer", user: "indie_r", genre: "Indie Pop", plays: "987", color: "#E8B840", liked: false },
  { id: 6, title: "Gravity Pull", user: "deepspace", genre: "Ambient", plays: "2.2K", color: "#9B8EA0", liked: false },
];

export default function CommunityPage() {
  const [tab, setTab] = useState<"trending" | "latest">("trending");
  const [playing, setPlaying] = useState<number | null>(null);
  const [likes, setLikes] = useState<Set<number>>(new Set(communityTracks.filter((t) => t.liked).map((t) => t.id)));

  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18, ease: "easeOut" as const }}
        style={{ marginBottom: 24 }}
      >
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", color: "#1A1714", lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: 4 }}>
          The Flow.
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-3)" }}>Tracks from the community.</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18, delay: 0.04, ease: "easeOut" as const }}
        style={{ display: "flex", gap: 5, marginBottom: 20 }}
      >
        {(["trending", "latest"] as const).map((t) => (
          <Button key={t} variant={tab === t ? "dark" : "outline"} size="sm" onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </motion.div>

      {/* Track list */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18, delay: 0.07, ease: "easeOut" as const }}
        style={{ background: "white", borderRadius: 8, border: "1px solid var(--border)", overflow: "hidden" }}
      >
        {communityTracks.map((track, i) => (
          <div
            key={track.id}
            style={{
              padding: "13px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderBottom: i < communityTracks.length - 1 ? "1px solid var(--border)" : "none",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "var(--bg)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
          >
            {/* Play button */}
            <button
              onClick={() => setPlaying(playing === track.id ? null : track.id)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 6,
                background: `${track.color}12`,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${track.color}28`)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${track.color}12`)}
            >
              {playing === track.id
                ? <Pause size={13} color={track.color} fill={track.color} />
                : <Play size={13} color={track.color} fill={track.color} />
              }
            </button>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1714", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{track.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 16, borderRadius: 3, background: track.color, fontSize: 8, fontWeight: 700, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {track.user.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: 11, color: "var(--text-3)" }}>@{track.user}</span>
                <Badge variant="secondary" style={{ fontSize: 9 }}>{track.genre}</Badge>
              </div>
            </div>

            {/* Mini waveform */}
            <div style={{ display: "flex", alignItems: "center", gap: 0.8, height: 22, width: 56 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={playing === track.id ? { scaleY: [1, 0.4 + Math.random() * 0.6, 1] } : { scaleY: 1 }}
                  transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.02 }}
                  style={{
                    flex: 1,
                    height: `${8 + Math.sin(i * 0.5) * 6}px`,
                    borderRadius: 1,
                    background: playing === track.id ? track.color : "rgba(28,24,20,0.1)",
                    transformOrigin: "center",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>

            <span style={{ fontSize: 11, color: "var(--text-3)", width: 36, textAlign: "right", flexShrink: 0 }}>{track.plays}</span>

            {/* Actions */}
            <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
              <button
                onClick={() => setLikes((prev) => { const n = new Set(prev); n.has(track.id) ? n.delete(track.id) : n.add(track.id); return n; })}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 4,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(28,24,20,0.05)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
              >
                <Heart size={13} color={likes.has(track.id) ? "#C94F14" : "var(--text-3)"} fill={likes.has(track.id) ? "#C94F14" : "none"} />
              </button>
              <Button variant="ghost" size="icon-sm"><Repeat2 size={12} /></Button>
              <Button variant="ghost" size="icon-sm"><Share2 size={12} /></Button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
