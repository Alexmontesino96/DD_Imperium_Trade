"use client";

import {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export const DDI_ICONS: Record<string, string> = {
  source: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10",
  prep: "M9 11l3 3 8-8M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  ship: "M1 3h15v13H1zM16 8h4l3 3v5h-7M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  shield: "M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z",
  eye: "M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7zM12 15a3 3 0 100-6 3 3 0 000 6z",
  badgeCheck:
    "M12 2l2.4 1.8 3-.2 1 2.8 2.4 1.8-1 2.8 1 2.8-2.4 1.8-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8L3.2 16l1-2.8-1-2.8 2.4-1.8 1-2.8 3 .2L12 2zM9 12l2 2 4-4",
  chat: "M21 11.5a8.4 8.4 0 01-9 8.4 9 9 0 01-4-1L3 20l1.1-3.3A8.4 8.4 0 0121 11.5z",
  dollar: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  building:
    "M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2",
  ruler: "M21 3L3 21M9 6l2 2M13 4l3 3M6 9l2 2M4 13l3 3M9 16l2 2",
  clipboard:
    "M9 3h6a1 1 0 011 1v1h2a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V4a1 1 0 011-1zM9 5h6",
  camera:
    "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowDown: "M12 5v14M6 13l6 6 6-6",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  calendar:
    "M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zM4 10h16M9 3v4M15 3v4",
  whatsapp:
    "M12 2a10 10 0 00-8.6 15l-1.4 5 5.2-1.4A10 10 0 1012 2zM8.5 7.8c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.5.8c-.1.2-.1.4 0 .6a6 6 0 003 3c.2.1.4.1.6 0l.8-.6c.2-.1.4-.1.6 0l1.9.9c.4.2.5.3.5.6 0 .8-.6 1.7-1.4 1.9-.7.2-1.6.2-4.4-1.3a9 9 0 01-3.6-3.6C5.5 11 5.4 10 5.6 9.3c.2-.8 1.1-1.5 1.9-1.5z",
  spark: "M12 2l1.6 6.8L20 10l-6.4 1.2L12 18l-1.6-6.8L4 10l6.4-1.2L12 2z",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 018 0v4",
  check: "M5 12l5 5L20 6",
  close: "M6 6l12 12M18 6L6 18",
};

export type DDIconProps = {
  name: keyof typeof DDI_ICONS | string;
  size?: number;
  stroke?: string;
  fill?: string;
  style?: CSSProperties;
};

export function DDIcon({ name, size = 22, stroke, fill = "none", style }: DDIconProps) {
  const d = DDI_ICONS[name];
  const filled = name === "whatsapp";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? (fill === "none" ? "currentColor" : fill) : "none"}
      stroke={filled ? "none" : stroke || "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export function DDILogo({ size = 36, showWord = true, color }: { size?: number; showWord?: boolean; color?: string }) {
  const h = Math.round(size * 1.16);
  return (
    <span className="ddi-logo" style={{ display: "inline-flex", alignItems: "center", gap: size * 0.32 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="ddi-logo-mark"
        src="/ddi-logo.png"
        alt="D&D Imperium Trade"
        style={{
          height: h,
          width: "auto",
          display: "block",
          flexShrink: 0,
          filter: "drop-shadow(0 2px 8px rgba(154,124,67,0.35))",
        }}
      />
      {showWord && (
        <span
          style={{
            fontWeight: 700,
            fontSize: size * 0.5,
            letterSpacing: "-0.3px",
            color: color || "var(--fg-1)",
            lineHeight: 1.05,
            whiteSpace: "nowrap",
          }}
        >
          Imperium <span style={{ color: "var(--brand-primary)" }}>Trade</span>
        </span>
      )}
    </span>
  );
}

export function MarketplaceBadges({ items, size = "md" }: { items: readonly string[]; size?: "sm" | "md" }) {
  const pad = size === "sm" ? "5px 11px" : "7px 14px";
  const fs = size === "sm" ? 11.5 : 12.5;
  return (
    <div className="ddi-mkts" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map((m) => (
        <span
          key={m}
          style={{
            padding: pad,
            fontSize: fs,
            fontWeight: 600,
            color: "var(--fg-2)",
            border: "1px solid var(--border-3)",
            borderRadius: "var(--r-pill)",
            background: "var(--surface-2)",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.2px",
          }}
        >
          {m}
        </span>
      ))}
    </div>
  );
}

export function SectionLabel({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <div
      className="ddi-seclabel"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      <span style={{ width: 22, height: 1, background: "var(--brand-mid)", opacity: 0.7 }} />
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1.6px",
          color: "var(--brand-mid)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="ddi-field" style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--fg-3)",
          marginBottom: 7,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

export function PillChoice({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(opt)}
            className={"ddi-pillchoice" + (active ? " active" : "")}
            style={{
              padding: "9px 14px",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              borderRadius: "var(--r-md)",
              fontFamily: "inherit",
              border: "1px solid " + (active ? "var(--border-brand-strong)" : "var(--border-3)"),
              background: active ? "var(--brand-tint-strong)" : "var(--surface-2)",
              color: active ? "var(--brand-light)" : "var(--fg-3)",
              transition: "all var(--d-fast)",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function useCountUp(to: number, run: boolean, dur = 1900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) {
      setV(0);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, dur]);
  return v;
}

export function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, shown };
}
