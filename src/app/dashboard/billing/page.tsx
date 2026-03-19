"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const plans = [
  {
    name: "Free",
    price: "0",
    beats: "10 Beats / month",
    features: ["Music generation", "MP3 export", "Community feed", "15-day storage"],
    current: false,
    cta: "Downgrade",
  },
  {
    name: "Pro",
    price: "12",
    beats: "150 Beats / month",
    features: ["Everything in Free", "WAV export", "Vocal separation", "Extend & remix", "No watermark", "Priority queue"],
    current: true,
    cta: "Current plan",
    highlight: true,
  },
  {
    name: "Scale",
    price: "49",
    beats: "Unlimited Beats",
    features: ["Everything in Pro", "API access", "Team workspace", "Custom styles", "Dedicated support"],
    current: false,
    cta: "Upgrade",
  },
];

const usageHistory = [
  { action: "Generated track", beats: -3, date: "Today, 2:34 PM" },
  { action: "Extended track", beats: -2, date: "Today, 11:20 AM" },
  { action: "Lyrics generation", beats: -1, date: "Yesterday" },
  { action: "Monthly refill", beats: 150, date: "Mar 1, 2025" },
  { action: "Generated track", beats: -3, date: "Feb 28" },
];

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.18, ease: "easeOut" as const } };

export default function BillingPage() {
  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>

      <motion.div {...fade} style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", color: "#1A1714", lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: 4 }}>
          Billing.
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-3)" }}>Manage your plan and Beats balance.</p>
      </motion.div>

      {/* Beats balance */}
      <motion.div {...fade} transition={{ duration: 0.18, delay: 0.05, ease: "easeOut" as const }} style={{ marginBottom: 24 }}>
        <Card>
          <CardContent style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
                  <Zap size={12} color="#C94F14" fill="#C94F14" />
                  <span style={{ fontSize: 10, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Beats balance</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "#1A1714", lineHeight: 1 }}>48</span>
                  <span style={{ fontSize: 13, color: "var(--text-3)" }}>/ 150</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 4 }}>Resets Apr 1</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#1A1714" }}>102 remaining</div>
              </div>
            </div>
            <Progress value={32} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Plans */}
      <motion.div {...fade} transition={{ duration: 0.18, delay: 0.08, ease: "easeOut" as const }} style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#1A1714", marginBottom: 14, letterSpacing: "-0.02em" }}>Plans</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10 }}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              style={{
                padding: "20px 18px",
                borderRadius: 8,
                background: plan.highlight ? "#1A1714" : "white",
                border: plan.highlight ? "none" : "1px solid var(--border)",
                boxShadow: plan.highlight ? "0 4px 24px rgba(0,0,0,0.2)" : "var(--shadow-sm)",
                position: "relative",
              }}
            >
              {plan.current && (
                <div style={{
                  position: "absolute",
                  top: -9,
                  right: 14,
                  background: "#C94F14",
                  color: "white",
                  fontSize: 9,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 3,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}>
                  Active
                </div>
              )}
              <div style={{ fontSize: 10, fontWeight: 600, color: plan.highlight ? "rgba(255,255,255,0.35)" : "var(--text-3)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{plan.name}</div>
              <div style={{ marginBottom: 3 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 34, color: plan.highlight ? "white" : "#1A1714", lineHeight: 1 }}>${plan.price}</span>
                <span style={{ fontSize: 12, color: plan.highlight ? "rgba(255,255,255,0.35)" : "var(--text-3)", marginLeft: 3 }}>/mo</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 500, color: plan.highlight ? "rgba(255,255,255,0.45)" : "var(--text-2)", marginBottom: 16 }}>{plan.beats}</div>
              <div style={{ marginBottom: 18 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: plan.highlight ? "rgba(255,255,255,0.08)" : "rgba(28,24,20,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={8} color={plan.highlight ? "rgba(255,255,255,0.6)" : "var(--text-2)"} />
                    </div>
                    <span style={{ fontSize: 11, color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--text-2)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button style={{
                width: "100%",
                padding: "9px",
                borderRadius: 6,
                background: plan.current
                  ? (plan.highlight ? "rgba(255,255,255,0.07)" : "rgba(28,24,20,0.04)")
                  : (plan.highlight ? "#C94F14" : "#1A1714"),
                border: plan.current && !plan.highlight ? "1px solid var(--border)" : "none",
                color: plan.current && !plan.highlight ? "var(--text-3)" : "white",
                fontWeight: 600,
                fontSize: 12,
                cursor: plan.current ? "default" : "pointer",
                fontFamily: "var(--font-body)",
                transition: "background 0.12s",
              }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Usage history */}
      <motion.div {...fade} transition={{ duration: 0.18, delay: 0.11, ease: "easeOut" as const }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#1A1714", marginBottom: 14, letterSpacing: "-0.02em" }}>Usage history</h2>
        <div style={{ background: "white", borderRadius: 8, border: "1px solid var(--border)", overflow: "hidden" }}>
          {usageHistory.map((item, i) => (
            <div key={i} style={{
              padding: "11px 16px",
              display: "flex",
              alignItems: "center",
              gap: 11,
              borderBottom: i < usageHistory.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 6, background: item.beats > 0 ? "rgba(45,158,107,0.08)" : "rgba(28,24,20,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.beats > 0 ? <Zap size={12} color="#2D9E6B" /> : <Sparkles size={12} color="var(--text-2)" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#1A1714" }}>{item.action}</div>
                <div style={{ fontSize: 10, color: "var(--text-3)" }}>{item.date}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: item.beats > 0 ? "#2D9E6B" : "var(--text-2)" }}>
                {item.beats > 0 ? "+" : ""}{item.beats}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
