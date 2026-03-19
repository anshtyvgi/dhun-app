"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Music2, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const intents = [
  { id: "songs", label: "Songs", desc: "Full tracks with lyrics" },
  { id: "beats", label: "Beats", desc: "Instrumentals & loops" },
  { id: "background", label: "Background Music", desc: "Ambience & underscore" },
];

const genres = ["Pop", "Hip-Hop", "Lo-Fi", "Jazz", "EDM", "Ambient", "Rock", "R&B", "Classical", "Folk", "Trap", "Indie"];

const moods = ["Energetic", "Chill", "Happy", "Melancholic", "Dark", "Romantic"];

const steps = ["Intent", "Style", "First Track"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const toggleGenre = (g: string) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : prev.length < 3 ? [...prev, g] : prev
    );
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/dashboard/create");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }} className="mesh-bg">

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 32 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "#1A1714", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Music2 size={13} color="white" />
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#1A1714" }}>Dhun</span>
      </div>

      {/* Progress steps */}
      <div style={{ display: "flex", gap: 6, marginBottom: 28, alignItems: "center" }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: i <= step ? "#1A1714" : "var(--bg-alt)",
              border: `1px solid ${i <= step ? "transparent" : "var(--border)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: i <= step ? "white" : "var(--text-3)",
              transition: "all 0.2s",
            }}>
              {i < step ? <Check size={11} /> : i + 1}
            </div>
            <span style={{ fontSize: 12, fontWeight: i === step ? 600 : 400, color: i === step ? "#1A1714" : "var(--text-3)" }}>{s}</span>
            {i < steps.length - 1 && (
              <div style={{ width: 24, height: 1, background: i < step ? "#1A1714" : "var(--border)", margin: "0 2px", transition: "background 0.2s" }} />
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" as const }}
        style={{ width: "100%", maxWidth: 480, background: "white", borderRadius: 8, border: "1px solid var(--border)", padding: 28, boxShadow: "var(--shadow-lg)" }}
      >
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#1A1714", marginBottom: 4, letterSpacing: "-0.025em" }}>What do you want to create?</h2>
              <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 22, lineHeight: 1.5 }}>We'll personalize your experience based on your goal.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 24 }}>
                {intents.map((intent) => (
                  <button
                    key={intent.id}
                    onClick={() => setSelectedIntent(intent.id)}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 6,
                      border: `1.5px solid ${selectedIntent === intent.id ? "#1A1714" : "var(--border)"}`,
                      background: selectedIntent === intent.id ? "rgba(26,23,20,0.04)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "border-color 0.12s, background 0.12s",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "#1A1714" }}>{intent.label}</div>
                      <div style={{ fontSize: 12, color: "var(--text-3)" }}>{intent.desc}</div>
                    </div>
                    {selectedIntent === intent.id && (
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: "#1A1714", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={10} color="white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <Button variant="default" onClick={() => setStep(1)} disabled={!selectedIntent} style={{ width: "100%", justifyContent: "center" }}>
                Continue <ChevronRight size={14} />
              </Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#1A1714", marginBottom: 4, letterSpacing: "-0.025em" }}>Your style</h2>
              <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 22, lineHeight: 1.5 }}>Pick up to 3 genres and a mood.</p>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-3)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.09em" }}>Genres</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {genres.map((g) => (
                    <button key={g} onClick={() => toggleGenre(g)} style={{
                      padding: "5px 12px",
                      borderRadius: 4,
                      border: `1px solid ${selectedGenres.includes(g) ? "#1A1714" : "var(--border)"}`,
                      background: selectedGenres.includes(g) ? "#1A1714" : "transparent",
                      fontSize: 12,
                      fontWeight: selectedGenres.includes(g) ? 600 : 400,
                      color: selectedGenres.includes(g) ? "white" : "var(--text-2)",
                      cursor: "pointer",
                      transition: "all 0.12s",
                      fontFamily: "var(--font-body)",
                    }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-3)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.09em" }}>Mood</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {moods.map((m) => (
                    <button key={m} onClick={() => setSelectedMood(m)} style={{
                      padding: "5px 12px",
                      borderRadius: 4,
                      border: `1px solid ${selectedMood === m ? "#C94F14" : "var(--border)"}`,
                      background: selectedMood === m ? "rgba(201,79,20,0.08)" : "transparent",
                      fontSize: 12,
                      fontWeight: selectedMood === m ? 600 : 400,
                      color: selectedMood === m ? "#C94F14" : "var(--text-2)",
                      cursor: "pointer",
                      transition: "all 0.12s",
                      fontFamily: "var(--font-body)",
                    }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="secondary" onClick={() => setStep(0)} style={{ flex: 1, justifyContent: "center" }}>Back</Button>
                <Button variant="default" onClick={() => setStep(2)} style={{ flex: 2, justifyContent: "center" }}>
                  Continue <ChevronRight size={14} />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#1A1714", marginBottom: 4, letterSpacing: "-0.025em" }}>Your first creation</h2>
              <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 22, lineHeight: 1.5 }}>We've pre-filled a prompt. Hit Generate to start.</p>

              <div style={{
                padding: "13px 14px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                fontSize: 13,
                color: "#1A1714",
                marginBottom: 24,
                lineHeight: 1.55,
              }}>
                {selectedGenres[0] || "Lo-Fi"} {selectedMood ? selectedMood.toLowerCase() : "chill"} {selectedIntent === "background" ? "background music" : selectedIntent === "beats" ? "beat" : "song"} with soft textures and warm vibes
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="secondary" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: "center" }}>Back</Button>
                <Button
                  variant="default"
                  onClick={handleGenerate}
                  style={{ flex: 2, justifyContent: "center" }}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        style={{ width: 13, height: 13, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white" }}
                      />
                      Generating...
                    </>
                  ) : (
                    <>Generate my first track</>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
