"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Music2, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  { label: "Generate Music", desc: "Full tracks from text in under 60 seconds." },
  { label: "Extend & Remix", desc: "Build on any track. Loop, extend, or transform." },
  { label: "Vocal Separation", desc: "Isolate stems and extract vocals instantly." },
  { label: "WAV Export", desc: "Lossless audio, ready for production." },
];

const plans = [
  {
    name: "Free",
    price: "0",
    beats: "10 Beats / month",
    features: ["Music generation", "MP3 export", "Community feed"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "12",
    beats: "150 Beats / month",
    features: ["Everything in Free", "WAV export", "Vocal separation", "Extend & remix", "No watermark"],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Scale",
    price: "49",
    beats: "Unlimited Beats",
    features: ["Everything in Pro", "API access", "Team workspace", "Dedicated support"],
    cta: "Contact us",
    highlight: false,
  },
];

const genres = ["Lo-Fi", "Hip-Hop", "Pop", "Jazz", "EDM", "Ambient", "Rock", "R&B", "Classical", "Folk", "Trap", "Indie", "Lo-Fi", "Hip-Hop", "Pop", "Jazz", "EDM", "Ambient", "Rock", "R&B"];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.22, delay, ease: "easeOut" as const },
});

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "var(--font-body)" }} className="mesh-bg">

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,242,236,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", height: 52, display: "flex", alignItems: "center", gap: 24 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none" }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: "#1A1714", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Music2 size={12} color="white" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "#1A1714" }}>Dhun</span>
          </Link>

          <div style={{ flex: 1 }} />

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/auth" style={{ textDecoration: "none" }}>
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/auth" style={{ textDecoration: "none" }}>
              <Button variant="default" size="sm">Get started <ArrowRight size={12} /></Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <motion.div {...fade(0)}>
              <Badge variant="secondary" style={{ marginBottom: 18 }}>
                <Sparkles size={9} style={{ marginRight: 4 }} /> Powered by Suno AI
              </Badge>
            </motion.div>

            <motion.h1 {...fade(0.05)} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 4.5vw, 60px)", color: "#1A1714", lineHeight: 1.06, letterSpacing: "-0.03em", marginBottom: 14 }}>
              Make music<br />
              <span style={{ fontStyle: "italic" }}>from a thought.</span>
            </motion.h1>

            <motion.p {...fade(0.1)} style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28, maxWidth: 400 }}>
              Describe any sound — a vibe, a mood, a genre. Dhun creates full tracks in seconds using AI.
            </motion.p>

            <motion.div {...fade(0.13)} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Link href="/auth" style={{ textDecoration: "none" }}>
                <Button variant="default" size="lg">
                  Start for free <ArrowRight size={14} />
                </Button>
              </Link>
              <span style={{ fontSize: 12, color: "var(--text-3)" }}>No credit card required</span>
            </motion.div>
          </div>

          {/* Product preview panel */}
          <motion.div {...fade(0.08)} style={{ position: "relative" }}>
            <div style={{
              borderRadius: 8,
              background: "#1A1714",
              padding: 24,
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Inner mesh */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 100% 0%, rgba(201,79,20,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 50% at 0% 100%, rgba(245,203,69,0.06) 0%, transparent 55%)", pointerEvents: "none" }} />

              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 12 }}>Describe your track</div>

                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "10px 13px", marginBottom: 16, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, border: "1px solid rgba(255,255,255,0.08)" }}>
                  chill lofi beat with warm piano and soft rain in the background
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                  {["Lo-Fi", "Jazz", "Ambient"].map((g, i) => (
                    <div key={g} style={{ padding: "4px 10px", borderRadius: 4, border: "1px solid", borderColor: i === 0 ? "#C94F14" : "rgba(255,255,255,0.1)", background: i === 0 ? "rgba(201,79,20,0.15)" : "transparent", fontSize: 11, color: i === 0 ? "#E8703A" : "rgba(255,255,255,0.35)", fontWeight: i === 0 ? 600 : 400 }}>{g}</div>
                  ))}
                </div>

                <div style={{ background: "#C94F14", borderRadius: 6, padding: "9px", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16 }}>
                  <Sparkles size={13} /> Generate
                </div>

                {/* Track result */}
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 8, display: "flex", alignItems: "center", gap: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    <Sparkles size={9} color="#C94F14" /> Track ready
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 6, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 0, height: 0, borderLeft: "10px solid white", borderTop: "6px solid transparent", borderBottom: "6px solid transparent", marginLeft: 2 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "white", marginBottom: 6 }}>Chill Lofi Beat</div>
                      <div style={{ display: "flex", gap: 0.8, alignItems: "center", height: 18 }}>
                        {Array.from({ length: 36 }).map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ scaleY: [1, 0.4 + Math.random() * 0.6, 1] }}
                            transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.025 }}
                            style={{ flex: 1, height: `${7 + Math.sin(i * 0.5) * 5}px`, borderRadius: 1, background: i < 12 ? "#C94F14" : "rgba(255,255,255,0.12)", transformOrigin: "center" }}
                          />
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>2:47</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Genre marquee */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "12px 0", background: "white", overflow: "hidden" }}>
        <div className="marquee-track">
          {genres.map((g, i) => (
            <span key={i} style={{ fontSize: 12, fontWeight: 500, color: "var(--text-3)", marginRight: 32, whiteSpace: "nowrap" }}>{g}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 32px" }}>
        <motion.div {...fade()} style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", color: "#1A1714", letterSpacing: "-0.025em", marginBottom: 6 }}>
            Everything you need.
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-3)" }}>From idea to final track — all in one place.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              {...fade(i * 0.04)}
              style={{
                background: "white",
                borderRadius: 8,
                padding: "18px 20px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(201,79,20,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Zap size={13} color="#C94F14" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1714", marginBottom: 4 }}>{f.label}</div>
              <div style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: "#1A1714", padding: "72px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 90% 50%, rgba(201,79,20,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <motion.div {...fade()} style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", color: "white", letterSpacing: "-0.025em", marginBottom: 6 }}>
              Simple pricing.
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Beats are your currency — pay for what you use.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fade(i * 0.06)}
                style={{
                  padding: "22px 20px",
                  borderRadius: 8,
                  background: plan.highlight ? "#C94F14" : "rgba(255,255,255,0.05)",
                  border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 600, color: plan.highlight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 6 }}>{plan.name}</div>
                <div style={{ marginBottom: 3 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "white", lineHeight: 1 }}>${plan.price}</span>
                  <span style={{ fontSize: 12, color: plan.highlight ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)", marginLeft: 3 }}>/mo</span>
                </div>
                <div style={{ fontSize: 11, color: plan.highlight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)", marginBottom: 18 }}>{plan.beats}</div>
                <div style={{ marginBottom: 20 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                      <Check size={10} color={plan.highlight ? "white" : "rgba(255,255,255,0.4)"} />
                      <span style={{ fontSize: 11, color: plan.highlight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/auth" style={{ textDecoration: "none" }}>
                  <button style={{
                    width: "100%",
                    padding: "9px",
                    borderRadius: 6,
                    background: plan.highlight ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)",
                    border: "none",
                    color: "white",
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "background 0.12s",
                  }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = plan.highlight ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = plan.highlight ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)")}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: 4, background: "#1A1714", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Music2 size={10} color="white" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "#1A1714" }}>Dhun</span>
          </div>
          <span style={{ fontSize: 11, color: "var(--text-3)" }}>© 2025 Dhun. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
