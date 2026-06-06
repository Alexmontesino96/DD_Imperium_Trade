"use client";

import { useSprite } from "@/lib/animations";

export const COL = {
  bg: "#0c0a07",
  panel: "#15110b",
  gold: "#d4b56e",
  goldLight: "#efdcae",
  goldDark: "#8d6a33",
  text: "#ece6da",
  dim: "#a69c8a",
  dimmer: "#7b7261",
  line: "rgba(212,181,110,0.16)",
  ok: "#4ade80",
  plat: "#cedbee",
};
export const MONO = "'JetBrains Mono', ui-monospace, monospace";
export const SANS = "'DM Sans', system-ui, sans-serif";

export function ParcelBox({
  size = 120,
  scan = 0,
  label = 0,
  check = 0,
}: {
  size?: number;
  scan?: number;
  label?: number;
  check?: number;
}) {
  return (
    <div style={{ position: "relative", width: size, height: size * 0.84 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: size * 0.1,
          background: "linear-gradient(158deg, #e9d29a, #c2a063 55%, #a9854b)",
          boxShadow:
            "inset 0 2px 0 rgba(255,255,255,0.45), inset 0 -10px 18px rgba(120,85,30,0.45), 0 18px 34px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: size * 0.17,
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.2)",
            borderTop: "1px solid rgba(255,255,255,0.28)",
            borderBottom: "1px solid rgba(80,55,15,0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: size * 0.17,
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -4,
            right: -4,
            top: scan * 112 - 6 + "%",
            height: 4,
            opacity: scan > 0 && scan < 1 ? 1 : 0,
            background: `linear-gradient(90deg, transparent, ${COL.goldLight}, transparent)`,
            boxShadow: `0 0 14px ${COL.gold}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "12%",
            bottom: "12%",
            width: "34%",
            height: "22%",
            borderRadius: 3,
            background: "#fff",
            backgroundImage:
              "repeating-linear-gradient(90deg, #14110c 0 1.5px, transparent 1.5px 4px)",
            opacity: label,
            transform: `scale(${0.5 + label * 0.5})`,
            transformOrigin: "bottom left",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: -size * 0.1,
          top: -size * 0.1,
          width: size * 0.34,
          height: size * 0.34,
          borderRadius: "50%",
          background: COL.ok,
          display: "grid",
          placeItems: "center",
          opacity: check,
          transform: `scale(${0.3 + check * 0.7})`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.45)",
        }}
      >
        <svg
          width={size * 0.2}
          height={size * 0.2}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#06281a"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12l5 5L20 6" />
        </svg>
      </div>
    </div>
  );
}

export function Vehicle({
  kind,
  w = 230,
  driving = false,
}: {
  kind: "van" | "truck";
  w?: number;
  driving?: boolean;
}) {
  const isTruck = kind === "truck";
  const vb = isTruck ? "0 0 168 92" : "0 0 132 86";
  const wheels: Array<[number, number, number]> = isTruck
    ? [
        [40, 68, 13],
        [124, 68, 13],
      ]
    : [
        [32, 64, 12],
        [100, 64, 12],
      ];
  return (
    <svg
      width={w}
      height={w * (isTruck ? 92 / 168 : 86 / 132)}
      viewBox={vb}
      fill="none"
    >
      {isTruck ? (
        <>
          <rect
            x="6"
            y="14"
            width="100"
            height="50"
            rx="5"
            fill={COL.panel}
            stroke={COL.gold}
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
          <line
            x1="6"
            y1="30"
            x2="106"
            y2="30"
            stroke={COL.line}
            strokeWidth={1.5}
          />
          <path
            d="M106 28 h26 l24 18 v18 h-50 z"
            fill="rgba(212,181,110,0.14)"
            stroke={COL.gold}
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
          <path d="M133 32 h16 l13 11 h-29 z" fill="rgba(212,181,110,0.18)" />
        </>
      ) : (
        <>
          <rect
            x="6"
            y="20"
            width="70"
            height="42"
            rx="5"
            fill={COL.panel}
            stroke={COL.gold}
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
          <path
            d="M76 30 h22 l20 16 v16 h-42 z"
            fill="rgba(212,181,110,0.14)"
            stroke={COL.gold}
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
          <path d="M99 34 h13 l11 9 h-24 z" fill="rgba(212,181,110,0.18)" />
          <line
            x1="40"
            y1="22"
            x2="40"
            y2="60"
            stroke={COL.line}
            strokeWidth={1.5}
          />
        </>
      )}
      {wheels.map(([cx, cy, r], i) => (
        <g
          key={i}
          style={
            driving
              ? {
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: "ddiVidSpin 0.5s linear infinite",
                }
              : undefined
          }
        >
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="#161009"
            stroke={COL.dimmer}
            strokeWidth={2}
          />
          <circle cx={cx} cy={cy} r={r * 0.38} fill={COL.gold} />
          <line
            x1={cx}
            y1={cy - r * 0.7}
            x2={cx}
            y2={cy + r * 0.7}
            stroke="#161009"
            strokeWidth={1.5}
          />
          <line
            x1={cx - r * 0.7}
            y1={cy}
            x2={cx + r * 0.7}
            y2={cy}
            stroke="#161009"
            strokeWidth={1.5}
          />
        </g>
      ))}
    </svg>
  );
}

export function useVehicleAt() {
  return useSprite();
}
