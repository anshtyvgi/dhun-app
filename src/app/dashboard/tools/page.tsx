"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Music2, Mic2, Layers, Upload, Scissors, FileAudio, Video, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tools = [
  {
    href: "/dashboard/create",
    icon: Music2,
    label: "Generate Music",
    desc: "Create full tracks from a text description using AI.",
    badge: null,
    accent: "#C94F14",
  },
  {
    href: "/dashboard/tools/lyrics",
    icon: Mic2,
    label: "Lyrics Generator",
    desc: "Generate lyrics for any genre, mood, or theme.",
    badge: null,
    accent: "#7B61FF",
  },
  {
    href: "/dashboard/tools/extend",
    icon: Layers,
    label: "Extend Track",
    desc: "Add 30–120 seconds to any existing track.",
    badge: null,
    accent: "#2D9E6B",
  },
  {
    href: "/dashboard/tools/remix",
    icon: Upload,
    label: "Upload & Remix",
    desc: "Upload a track and transform it with AI.",
    badge: "Pro",
    accent: "#4DAFFF",
  },
  {
    href: "/dashboard/tools/vocal",
    icon: Scissors,
    label: "Vocal Separation",
    desc: "Isolate vocals and instrumentals from any song.",
    badge: "Pro",
    accent: "#E8B840",
  },
  {
    href: "/dashboard/tools/wav",
    icon: FileAudio,
    label: "Convert to WAV",
    desc: "Export any track in lossless WAV format.",
    badge: "Pro",
    accent: "#9B8EA0",
  },
  {
    href: "/dashboard/tools/video",
    icon: Video,
    label: "Music Video",
    desc: "Generate a visual music video from your track.",
    badge: "Soon",
    accent: "#78716C",
  },
];

export default function ToolsPage() {
  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18, ease: "easeOut" as const }}
        style={{ marginBottom: 28 }}
      >
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", color: "#1A1714", lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: 4 }}>
          Tools.
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-3)" }}>Everything you need to create, edit, and export music.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18, delay: 0.05, ease: "easeOut" as const }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}
      >
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isDisabled = tool.badge === "Soon";

          return (
            <Link
              key={tool.label}
              href={isDisabled ? "#" : tool.href}
              style={{ textDecoration: "none", pointerEvents: isDisabled ? "none" : "auto" }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: 8,
                  padding: "18px 18px",
                  border: "1px solid var(--border)",
                  cursor: isDisabled ? "default" : "pointer",
                  opacity: isDisabled ? 0.55 : 1,
                  transition: "border-color 0.12s, box-shadow 0.12s",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled) {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-mid)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-sm)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{
                    width: 34,
                    height: 34,
                    borderRadius: 6,
                    background: `${tool.accent}12`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Icon size={15} color={tool.accent} />
                  </div>
                  {tool.badge && (
                    <Badge variant={tool.badge === "Pro" ? "pro" : "soon"}>
                      {tool.badge}
                    </Badge>
                  )}
                </div>

                <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1714", marginBottom: 4 }}>{tool.label}</div>
                <div style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5, flex: 1 }}>{tool.desc}</div>

                {!isDisabled && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 14, fontSize: 11, fontWeight: 600, color: tool.accent }}>
                    Open <ArrowRight size={11} />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
