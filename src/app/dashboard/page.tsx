"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Plus, ArrowRight, Sparkles, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const recentCreations = [
  { title: "Midnight Drift", genre: "Lo-Fi", duration: "2:47", color: "#7B61FF" },
  { title: "Solar Pulse", genre: "EDM", duration: "3:12", color: "#C94F14" },
  { title: "Warm Evenings", genre: "Jazz", duration: "1:58", color: "#2D9E6B" },
  { title: "Neon Haze", genre: "Hip-Hop", duration: "2:31", color: "#4DAFFF" },
];

const suggestedPrompts = [
  "Upbeat pop for a summer road trip",
  "Dark cinematic score for a thriller",
  "Acoustic folk ballad about the ocean",
  "Lo-fi hip hop for late night coding",
];

const quickStats = [
  { label: "Tracks created", value: "12" },
  { label: "Beats remaining", value: "48" },
  { label: "Total plays", value: "1.2K" },
];

const fade = { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, ease: "easeOut" as const } };

export default function DashboardHome() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>

      {/* Header */}
      <motion.div {...fade} style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", color: "#1A1714", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 4 }}>
          {greeting}, Rumi.
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-3)" }}>What are you making today?</p>
      </motion.div>

      {/* Create banner */}
      <motion.div
        {...fade}
        transition={{ duration: 0.2, delay: 0.05, ease: "easeOut" as const }}
        style={{
          borderRadius: 8,
          background: "linear-gradient(135deg, #1A1714 0%, #2D2018 50%, #1A1714 100%)",
          padding: "28px 32px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Mesh glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 90% 50%, rgba(201,79,20,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 60% at 10% 20%, rgba(245,203,69,0.06) 0%, transparent 55%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Quick create</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2vw, 30px)", color: "white", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 6 }}>
              Create a new track.
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
              Describe any vibe — Dhun handles the rest.
            </p>
          </div>
          <Link href="/dashboard/create" style={{ textDecoration: "none", flexShrink: 0 }}>
            <Button variant="default" size="default" style={{ whiteSpace: "nowrap" }}>
              <Sparkles size={13} />
              Start creating
              <ArrowRight size={13} />
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        {...fade}
        transition={{ duration: 0.2, delay: 0.08, ease: "easeOut" as const }}
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}
      >
        {quickStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent style={{ padding: "16px 18px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#1A1714", lineHeight: 1, marginBottom: 3 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500 }}>{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Recent + Prompts */}
      <motion.div
        {...fade}
        transition={{ duration: 0.2, delay: 0.11, ease: "easeOut" as const }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
      >
        {/* Recent */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Clock size={13} color="var(--text-3)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1A1714" }}>Recent</span>
            </div>
            <Link href="/dashboard/library" style={{ fontSize: 11, color: "var(--text-3)", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: 2 }}>
              See all <ArrowRight size={10} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {recentCreations.map((track) => (
              <div
                key={track.title}
                style={{
                  background: "white",
                  borderRadius: 6,
                  padding: "11px 13px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  border: "1px solid var(--border)",
                  transition: "border-color 0.12s, box-shadow 0.12s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-mid)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-sm)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div style={{ width: 30, height: 30, borderRadius: 6, background: `${track.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Play size={11} color={track.color} fill={track.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1714", marginBottom: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{track.title}</div>
                  <div style={{ fontSize: 10, color: "var(--text-3)" }}>{track.genre}</div>
                </div>
                <span style={{ fontSize: 10, color: "var(--text-3)", flexShrink: 0 }}>{track.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prompts */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <Sparkles size={13} color="var(--text-3)" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#1A1714" }}>Try these prompts</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {suggestedPrompts.map((prompt) => (
              <Link key={prompt} href={`/dashboard/create?prompt=${encodeURIComponent(prompt)}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "white",
                    borderRadius: 6,
                    padding: "11px 13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    border: "1px solid var(--border)",
                    transition: "border-color 0.12s, box-shadow 0.12s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-mid)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-sm)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ width: 22, height: 22, borderRadius: 4, background: "rgba(28,24,20,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Plus size={11} color="var(--text-2)" />
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.4 }}>{prompt}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
