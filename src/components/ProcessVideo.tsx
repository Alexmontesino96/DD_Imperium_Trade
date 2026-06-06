"use client";

import { CSSProperties, ReactNode } from "react";
import {
  Easing,
  Sprite,
  Stage,
  clamp,
  interpolate,
  useTime,
} from "@/lib/animations";
import {
  COL,
  Floor,
  LogoTile,
  MONO,
  MarketTag,
  ParcelBox,
  SANS,
  StationRing,
  StepCaption,
  Vehicle,
} from "./ddi-video-parts";

const W = 1280;
const H = 720;
const DUR = 23;

const I_SOURCE = "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10";
const I_PREP = "M9 11l3 3 8-8M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11";
const I_SHIP = "M1 3h15v13H1zM16 8h4l3 3v5h-7M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z";

function Ico(d: string): ReactNode {
  return (
    <svg width={34} height={34} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/* ---------------- Scene 1 — Intro ---------------- */
function SceneIntro() {
  return (
    <Sprite start={0} end={4}>
      {({ localTime }) => {
        const e = Easing.easeOutCubic(clamp(localTime / 0.7, 0, 1));
        const sub = Easing.easeOutCubic(clamp((localTime - 0.5) / 0.7, 0, 1));
        const tag = Easing.easeOutCubic(clamp((localTime - 1.0) / 0.7, 0, 1));
        const out = clamp((localTime - 3.4) / 0.6, 0, 1);
        const zoom = 1 + localTime * 0.012;
        const container: CSSProperties = {
          position: "absolute", inset: 0,
          opacity: 1 - out,
          transform: `scale(${zoom})`,
          transformOrigin: "center",
        };
        return (
          <div style={container}>
            <div style={{
              position: "absolute", left: 0, right: 0, top: 232,
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 22,
                opacity: e, transform: `translateY(${(1 - e) * 20}px)`,
              }}>
                <LogoTile size={86} />
                <div style={{
                  fontFamily: SANS, fontSize: 56, fontWeight: 700,
                  letterSpacing: "-0.5px", color: COL.text,
                }}>
                  Imperium <span style={{ color: COL.gold }}>Trade</span>
                </div>
              </div>
              <div style={{
                fontFamily: SANS, fontSize: 30, fontWeight: 500, color: COL.dim,
                marginTop: 30, opacity: sub, transform: `translateY(${(1 - sub) * 16}px)`,
              }}>
                El recorrido de tu producto, de principio a fin.
              </div>
              <div style={{
                display: "flex", gap: 12, marginTop: 30,
                opacity: tag, transform: `translateY(${(1 - tag) * 14}px)`,
              }}>
                {["Abastecemos", "Preparamos", "Enviamos"].map((s, i) => (
                  <span key={i} style={{
                    fontFamily: MONO, fontSize: 15, fontWeight: 600,
                    letterSpacing: "1px", color: COL.gold,
                    padding: "8px 16px",
                    border: "1px solid " + COL.line,
                    borderRadius: 999,
                    background: "rgba(212,181,110,0.05)",
                  }}>
                    0{i + 1} · {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

/* ---------------- Scene 2 — Abastecemos ---------------- */
function SceneSource() {
  return (
    <Sprite start={4} end={9}>
      {({ localTime }) => {
        const vanX = interpolate(
          [0, 1.3, 3.2, 5],
          [-420, 150, 150, -120],
          [Easing.easeOutCubic, Easing.linear, Easing.easeInCubic]
        )(localTime);
        const vanLeaving = localTime > 3.2;
        const parcelDrop = Easing.easeOutBack(clamp((localTime - 1.3) / 0.7, 0, 1));
        const parcelShow = clamp((localTime - 1.3) / 0.3, 0, 1);
        const capProg = (localTime - 1.7) / 0.6;
        const out = clamp((localTime - 4.5) / 0.5, 0, 1);
        return (
          <div style={{ position: "absolute", inset: 0, opacity: 1 - out }}>
            <div style={{ position: "absolute", left: 360, top: 392 }}>
              <StationRing icon={Ico(I_SOURCE)} />
            </div>
            <div style={{
              position: "absolute", left: 360 + 42, top: 392 + 42,
              transform: `translate(-50%, ${-78 - (1 - parcelDrop) * 220}%)`,
              opacity: parcelShow,
            }}>
              <ParcelBox size={96} />
            </div>
            <div style={{ position: "absolute", left: 250 + vanX, top: 372 }}>
              <Vehicle kind="van" w={250} driving={!vanLeaving ? localTime < 1.3 : true} />
            </div>
            <div style={{
              position: "absolute", left: 760, top: 250,
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              {["Marca A", "Marca B", "Proveedor C"].map((b, i) => {
                const ce = Easing.easeOutCubic(clamp((localTime - 0.4 - i * 0.18) / 0.5, 0, 1));
                return (
                  <span key={i} style={{
                    fontFamily: SANS, fontSize: 17, fontWeight: 600, color: COL.text,
                    padding: "10px 18px", borderRadius: 12,
                    background: COL.panel, border: "1px solid " + COL.line,
                    opacity: ce, transform: `translateX(${(1 - ce) * 40}px)`,
                  }}>
                    {b}
                  </span>
                );
              })}
            </div>
            <StepCaption num="01" title="Abastecemos"
              desc="Conectamos con marcas y conseguimos producto verificado. Tú eliges del catálogo; nosotros compramos y recibimos."
              x={120} y={140} prog={capProg} />
          </div>
        );
      }}
    </Sprite>
  );
}

/* ---------------- Scene 3 — Preparamos ---------------- */
function ScenePrep() {
  return (
    <Sprite start={9} end={14}>
      {({ localTime }) => {
        const capProg = (localTime - 0.3) / 0.6;
        const scan = clamp((localTime - 0.6) / 1.2, 0, 1);
        const check = Easing.easeOutBack(clamp((localTime - 2.0) / 0.5, 0, 1));
        const label = Easing.easeOutCubic(clamp((localTime - 2.4) / 0.5, 0, 1));
        const out = clamp((localTime - 4.5) / 0.5, 0, 1);
        const zoom = 1 + clamp(localTime / 5, 0, 1) * 0.06;
        const checklist: Array<[string, number]> = [
          ["Producto", 2.0],
          ["Empaque", 2.3],
          ["Conformidad FNSKU", 2.6],
        ];
        return (
          <div style={{
            position: "absolute", inset: 0, opacity: 1 - out,
            transform: `scale(${zoom})`, transformOrigin: "62% 56%",
          }}>
            <div style={{
              position: "absolute", left: 560, top: 470,
              width: 460, height: 22, borderRadius: 6,
              background: "linear-gradient(180deg, #221a10, #15110b)",
              border: "1px solid " + COL.line, transform: "translateX(-50%)",
            }} />
            <div style={{ position: "absolute", left: 560, top: 300, transform: "translateX(-50%)" }}>
              <ParcelBox size={150} scan={scan} label={label} check={check} />
            </div>
            <div style={{
              position: "absolute", left: 820, top: 300,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              {checklist.map(([lab, at], i) => {
                const on = localTime > at;
                const ce = Easing.easeOutBack(clamp((localTime - at) / 0.4, 0, 1));
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    fontFamily: SANS, fontSize: 19, fontWeight: 600,
                    color: on ? COL.text : COL.dimmer,
                  }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: 7,
                      display: "grid", placeItems: "center",
                      background: on ? "rgba(74,222,128,0.16)" : COL.panel,
                      border: "1px solid " + (on ? "rgba(74,222,128,0.4)" : COL.line),
                      transform: `scale(${0.6 + ce * 0.4})`,
                    }}>
                      <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
                        stroke={COL.ok} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
                        style={{ opacity: on ? 1 : 0 }}>
                        <path d="M5 12l5 5L20 6" />
                      </svg>
                    </span>
                    {lab}
                  </div>
                );
              })}
            </div>
            <StepCaption num="02" title="Preparamos"
              desc="Inspección, control de calidad y etiquetado conforme a Amazon y Walmart, en nuestro Prep Center propio."
              x={120} y={140} prog={capProg} />
          </div>
        );
      }}
    </Sprite>
  );
}

/* ---------------- Scene 4 — Enviamos ---------------- */
function SceneShip() {
  return (
    <Sprite start={14} end={18.6}>
      {({ localTime }) => {
        const capProg = (localTime - 0.3) / 0.6;
        const parcelX = interpolate([0.4, 1.5], [0, 250], Easing.easeInCubic)(localTime);
        const parcelFade = clamp(1 - (localTime - 1.2) / 0.4, 0, 1);
        const truckX = interpolate(
          [0, 2.0, 4.2],
          [120, 120, 1500],
          [Easing.linear, Easing.easeInCubic]
        )(localTime);
        const driving = localTime > 2.0;
        const out = clamp((localTime - 4.1) / 0.5, 0, 1);
        return (
          <div style={{ position: "absolute", inset: 0, opacity: 1 - out }}>
            <div style={{
              position: "absolute", right: 120, top: 250,
              display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end",
            }}>
              {["Amazon", "Walmart"].map((m, i) => {
                const ce = Easing.easeOutCubic(clamp((localTime - 0.6 - i * 0.2) / 0.5, 0, 1));
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    fontFamily: MONO, fontSize: 22, fontWeight: 600, color: COL.text,
                    padding: "12px 22px", borderRadius: 12,
                    background: COL.panel, border: "1px solid " + COL.line,
                    opacity: ce, transform: `translateX(${(1 - ce) * -30}px)`,
                  }}>
                    <span style={{
                      width: 9, height: 9, borderRadius: "50%",
                      background: COL.gold, boxShadow: "0 0 8px " + COL.gold,
                    }} />
                    {m}
                  </div>
                );
              })}
            </div>
            <div style={{
              position: "absolute", left: 330 + parcelX, top: 360,
              opacity: parcelFade,
            }}>
              <ParcelBox size={92} label={1} check={1} />
            </div>
            <div style={{ position: "absolute", left: truckX, top: 348 }}>
              <Vehicle kind="truck" w={300} driving={driving} />
            </div>
            <StepCaption num="03" title="Enviamos"
              desc="Despachamos a los centros de Amazon y Walmart. Tú te concentras en vender; nosotros operamos."
              x={120} y={140} prog={capProg} />
          </div>
        );
      }}
    </Sprite>
  );
}

/* Reference I_PREP / I_SHIP so unused-import lint stays quiet — they're embedded as data only. */
void I_PREP;
void I_SHIP;

/* ---------------- Scene 5 — Outro ---------------- */
function SceneOutro() {
  return (
    <Sprite start={18.6} end={23}>
      {({ localTime }) => {
        const e = Easing.easeOutCubic(clamp(localTime / 0.7, 0, 1));
        const sub = Easing.easeOutCubic(clamp((localTime - 0.6) / 0.7, 0, 1));
        const zoom = 1 + localTime * 0.01;
        return (
          <div style={{
            position: "absolute", inset: 0,
            transform: `scale(${zoom})`, transformOrigin: "center",
          }}>
            <div style={{
              position: "absolute", left: 0, right: 0, top: 210,
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>
              <div style={{
                fontFamily: SANS, fontSize: 30, fontWeight: 600, color: COL.dim,
                opacity: e, transform: `translateY(${(1 - e) * 16}px)`,
              }}>
                Tú vendes.
              </div>
              <div style={{
                fontFamily: SANS, fontSize: 62, fontWeight: 800,
                fontStyle: "italic", letterSpacing: "-2px", color: COL.gold,
                marginTop: 6, opacity: e,
                transform: `translateY(${(1 - e) * 16}px)`,
                textShadow: "0 6px 40px rgba(0,0,0,0.5)",
              }}>
                Nosotros nos encargamos.
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 18, marginTop: 40,
                opacity: sub, transform: `translateY(${(1 - sub) * 14}px)`,
              }}>
                <LogoTile size={56} />
                <span style={{
                  fontFamily: SANS, fontSize: 34, fontWeight: 700, color: COL.text,
                }}>
                  Imperium <span style={{ color: COL.gold }}>Trade</span>
                </span>
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 30 }}>
                <MarketTag label="Amazon" delay={1.0} />
                <MarketTag label="Walmart" delay={1.15} />
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

/* ---------------- chapter indicator (persistent) ---------------- */
function Chapters() {
  const t = useTime();
  const steps: Array<[string, string, number, number]> = [
    ["01", "Abastecemos", 4, 9],
    ["02", "Preparamos", 9, 14],
    ["03", "Enviamos", 14, 18.6],
  ];
  if (t < 4 || t > 18.6) return null;
  return (
    <div style={{
      position: "absolute", left: 120, bottom: 70,
      display: "flex", gap: 10,
    }}>
      {steps.map(([n, lab, s, e], i) => {
        const active = t >= s && t < e;
        const done = t >= e;
        const fill = active ? clamp((t - s) / (e - s), 0, 1) : done ? 1 : 0;
        return (
          <div key={i} style={{ width: 150 }}>
            <div style={{
              height: 3, borderRadius: 3,
              background: COL.line, overflow: "hidden",
            }}>
              <div style={{
                height: "100%", width: fill * 100 + "%",
                background: COL.gold,
                boxShadow: active ? "0 0 8px " + COL.gold : "none",
              }} />
            </div>
            <div style={{
              marginTop: 8, fontFamily: MONO, fontSize: 12, fontWeight: 600,
              letterSpacing: "0.5px",
              color: active ? COL.goldLight : done ? COL.dim : COL.dimmer,
            }}>
              {n} · {lab}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProcessVideo() {
  return (
    <Stage width={W} height={H} duration={DUR} background={COL.bg}>
      <Floor />
      <SceneIntro />
      <SceneSource />
      <ScenePrep />
      <SceneShip />
      <SceneOutro />
      <Chapters />
    </Stage>
  );
}
