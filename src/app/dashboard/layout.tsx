"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Sparkles,
  Library,
  Wrench,
  Users,
  CreditCard,
  ChevronLeft,
  Search,
  Bell,
  Music2,
  Zap,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured, DEMO_COOKIE } from "@/lib/supabase";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/create", icon: Sparkles, label: "Create" },
  { href: "/dashboard/library", icon: Library, label: "Library" },
  { href: "/dashboard/tools", icon: Wrench, label: "Tools" },
  { href: "/dashboard/community", icon: Users, label: "Community" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    document.cookie = `${DEMO_COOKIE}=; path=/; max-age=0`;
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/auth");
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>

      {/* Sidebar */}
      <div
        style={{
          width: collapsed ? 56 : 220,
          transition: "width 220ms cubic-bezier(0.4, 0, 0.2, 1)",
          flexShrink: 0,
          background: "#1A1714",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo row */}
        <div style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 10,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          flexShrink: 0,
        }}>
          <div style={{
            width: 30,
            height: 30,
            borderRadius: 6,
            background: "#C94F14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <Music2 size={14} color="white" />
          </div>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            color: "white",
            whiteSpace: "nowrap",
            opacity: collapsed ? 0 : 1,
            transition: "opacity 150ms ease",
            overflow: "hidden",
          }}>Dhun</span>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "8px", display: "flex", flexDirection: "column", gap: 1 }}>
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "7px 8px",
                    borderRadius: 6,
                    background: isActive ? "rgba(255,255,255,0.09)" : "transparent",
                    transition: "background 0.12s",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  {isActive && (
                    <div style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 2,
                      height: 14,
                      borderRadius: "0 2px 2px 0",
                      background: "#C94F14",
                    }} />
                  )}
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={14} color={isActive ? "white" : "rgba(255,255,255,0.35)"} />
                  </div>
                  <span style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "white" : "rgba(255,255,255,0.4)",
                    whiteSpace: "nowrap",
                    opacity: collapsed ? 0 : 1,
                    transition: "opacity 120ms ease",
                    overflow: "hidden",
                  }}>{label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Beats widget */}
        <div style={{
          margin: "0 8px 8px",
          padding: "10px 12px",
          borderRadius: 6,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.05)",
          opacity: collapsed ? 0 : 1,
          transition: "opacity 150ms ease",
          overflow: "hidden",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
            <Zap size={10} color="#C94F14" fill="#C94F14" />
            <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Beats</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>48 / 150</span>
          </div>
          <div style={{ height: 2, borderRadius: 1, background: "rgba(255,255,255,0.08)" }}>
            <div style={{ width: "32%", height: "100%", background: "#C94F14", borderRadius: 1 }} />
          </div>
        </div>

        {/* User row */}
        <div style={{
          padding: "10px 12px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: 9,
          flexShrink: 0,
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: "#C94F14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 11,
            fontWeight: 700,
            color: "white",
          }}>R</div>
          <div style={{
            flex: 1,
            opacity: collapsed ? 0 : 1,
            transition: "opacity 120ms ease",
            overflow: "hidden",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "white", whiteSpace: "nowrap" }}>Rumi</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", whiteSpace: "nowrap" }}>Pro plan</div>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
              borderRadius: 4,
              opacity: collapsed ? 0 : 0.4,
              transition: "opacity 120ms ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = collapsed ? "0" : "0.4"; }}
          >
            <LogOut size={12} color="white" />
          </button>
        </div>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* Topbar */}
        <div style={{
          height: 52,
          borderBottom: "1px solid var(--border)",
          background: "rgba(245,242,236,0.92)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 10,
          flexShrink: 0,
          zIndex: 5,
        }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1px solid var(--border)",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-alt)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            <ChevronLeft
              size={13}
              color="var(--text-3)"
              style={{
                transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 220ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </button>

          <div style={{ flex: 1, maxWidth: 320, position: "relative" }}>
            <Search size={12} color="var(--text-3)" style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Search tracks, tools..."
              style={{
                width: "100%",
                height: 30,
                paddingLeft: 28,
                paddingRight: 10,
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "white",
                fontSize: 12,
                color: "var(--text)",
                outline: "none",
                fontFamily: "var(--font-body)",
                transition: "border-color 0.12s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--border-mid)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          <div style={{ flex: 1 }} />

          <button style={{
            width: 30,
            height: 30,
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.12s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-alt)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            <Bell size={13} color="var(--text-3)" />
          </button>

          <div style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: "#C94F14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "white",
            cursor: "pointer",
            flexShrink: 0,
          }}>R</div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflow: "auto" }} className="mesh-bg">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, ease: "easeOut" as const }}
              style={{ padding: "28px 32px", maxWidth: 1040, margin: "0 auto", minHeight: "100%" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
