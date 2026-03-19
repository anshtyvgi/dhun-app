"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Music2, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient, isSupabaseConfigured, DEMO_EMAIL, DEMO_PASSWORD, DEMO_COOKIE } from "@/lib/supabase";
import { Suspense } from "react";

type AuthStep = "select" | "email";

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [step, setStep] = useState<AuthStep>("select");
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  const handleOAuth = async () => {
    setLoading(true);
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
    } else {
      // Demo mode
      document.cookie = `${DEMO_COOKIE}=1; path=/; max-age=86400; SameSite=Lax`;
      router.push(next === "/dashboard" ? "/onboarding" : next);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError(null);

    // Demo credentials bypass
    if (email.trim() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      document.cookie = `${DEMO_COOKIE}=1; path=/; max-age=86400; SameSite=Lax`;
      router.push(next.startsWith("/dashboard") ? next : "/onboarding");
      return;
    }

    if (!isSupabaseConfigured()) {
      setError("Use test credentials: test@dhun.app / demo1234");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    if (mode === "signup") {
      const { error: err } = await supabase.auth.signUp({ email, password });
      if (err) { setError(err.message); setLoading(false); return; }
      router.push("/onboarding");
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); setLoading(false); return; }
      router.push(next);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      position: "relative",
      overflow: "hidden",
    }} className="mesh-bg">

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 80% 30%, rgba(201,79,20,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" as const }}
        style={{
          width: "100%",
          maxWidth: 380,
          padding: "32px 28px",
          background: "white",
          borderRadius: 8,
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none", marginBottom: 28, justifyContent: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "#1A1714", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Music2 size={13} color="white" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#1A1714" }}>Dhun</span>
        </Link>

        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {/* Tab switcher */}
              <div style={{ display: "flex", background: "var(--bg)", borderRadius: 6, padding: 3, marginBottom: 24 }}>
                {(["signup", "signin"] as const).map((m) => (
                  <button key={m} onClick={() => setMode(m)} style={{
                    flex: 1,
                    padding: "7px 0",
                    borderRadius: 4,
                    border: "none",
                    background: mode === m ? "white" : "transparent",
                    fontWeight: mode === m ? 600 : 400,
                    fontSize: 12,
                    color: mode === m ? "#1A1714" : "var(--text-3)",
                    cursor: "pointer",
                    boxShadow: mode === m ? "var(--shadow-sm)" : "none",
                    transition: "all 0.15s",
                    fontFamily: "var(--font-body)",
                  }}>
                    {m === "signup" ? "Create account" : "Sign in"}
                  </button>
                ))}
              </div>

              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#1A1714", marginBottom: 4, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                {mode === "signup" ? "Start creating music." : "Welcome back."}
              </h2>
              <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 22, lineHeight: 1.5 }}>
                {mode === "signup" ? "Join Dhun and make your first beat." : "Sign in to continue creating."}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button onClick={handleOAuth} disabled={loading} style={{
                  width: "100%",
                  padding: "10px 16px",
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#1A1714",
                  transition: "border-color 0.12s, background 0.12s",
                  fontFamily: "var(--font-body)",
                  opacity: loading ? 0.7 : 1,
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--bg)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "white"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 18 18">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>

                <button onClick={handleOAuth} disabled={loading} style={{
                  width: "100%",
                  padding: "10px 16px",
                  borderRadius: 6,
                  border: "none",
                  background: "#1A1714",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "white",
                  transition: "background 0.12s",
                  fontFamily: "var(--font-body)",
                  opacity: loading ? 0.7 : 1,
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#2D2620"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#1A1714"; }}
                >
                  <svg width="14" height="16" viewBox="0 0 814 1000" fill="white">
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.4-57.7-155.5-127.4C46 790.9 0 663.8 0 541.4c0-207.3 134.2-316.5 266.8-316.5 84.1 0 154.1 54.3 206 54.3 48 0 124.6-57.3 217.3-57.3zM719.4 108.4c0-47.4-3.2-107.1-39.5-146.9C647.7-79.2 587.3-103 539.4-103c-6.5 0-13.5.6-20.5 1.6C542.5-58.1 589.3-6.4 589.3 62.8c0 50.3-16.5 97.7-48.5 135.2 31.4 29.7 72.9 48.5 118.9 48.5 14.2 0 27.4-1.3 39.7-3.9z" />
                  </svg>
                  Continue with Apple
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0" }}>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                <span style={{ fontSize: 11, color: "var(--text-3)" }}>or</span>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              </div>

              <button onClick={() => { setStep("email"); setError(null); }} style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                fontSize: 13,
                fontWeight: 500,
                color: "#1A1714",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "border-color 0.12s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-mid)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
              >
                <Mail size={13} /> Continue with Email
              </button>
            </motion.div>
          )}

          {step === "email" && (
            <motion.div key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <button onClick={() => { setStep("select"); setError(null); setEmail(""); setPassword(""); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", fontSize: 12, marginBottom: 20, display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-body)" }}>
                ← Back
              </button>

              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#1A1714", marginBottom: 18, letterSpacing: "-0.025em" }}>
                {mode === "signup" ? "Create account." : "Sign in."}
              </h2>

              {/* Test credentials hint */}
              <div
                onClick={fillDemo}
                style={{
                  marginBottom: 16,
                  padding: "10px 12px",
                  borderRadius: 6,
                  background: "rgba(201,79,20,0.05)",
                  border: "1px solid rgba(201,79,20,0.2)",
                  cursor: "pointer",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(201,79,20,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(201,79,20,0.05)"; }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, color: "#C94F14", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>
                  Try demo — click to fill
                </div>
                <div style={{ fontSize: 11, color: "var(--text-2)", fontFamily: "var(--font-body)" }}>
                  test@dhun.app &nbsp;/&nbsp; demo1234
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                <div style={{ position: "relative" }}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    style={{ paddingRight: 36 }}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-3)",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>

              {error && (
                <p style={{ fontSize: 12, color: "#dc2626", marginBottom: 10, lineHeight: 1.4 }}>{error}</p>
              )}

              <Button
                variant="dark"
                onClick={handleSubmit}
                disabled={!email || !password || loading}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {loading ? "Signing in..." : <><span>{mode === "signup" ? "Create account" : "Sign in"}</span><ArrowRight size={13} /></>}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <p style={{ fontSize: 10, color: "var(--text-3)", textAlign: "center", marginTop: 20, lineHeight: 1.5 }}>
          By continuing, you agree to our{" "}
          <a href="#" style={{ color: "#1A1714", textDecoration: "underline" }}>Terms</a> and{" "}
          <a href="#" style={{ color: "#1A1714", textDecoration: "underline" }}>Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="mesh-bg" style={{ minHeight: "100vh" }} />}>
      <AuthPageContent />
    </Suspense>
  );
}
