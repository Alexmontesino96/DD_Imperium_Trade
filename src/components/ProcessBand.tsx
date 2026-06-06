"use client";

import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { type Copy } from "@/lib/ddi-data";
import {
  Easing,
  Sprite,
  Stage,
  clamp,
  interpolate,
  useTime,
} from "@/lib/animations";
import { COL, MONO, SANS, ParcelBox, Vehicle } from "./ddi-video-parts";
import { SectionLabel } from "./ddi-ui";
import { ProcessVideo } from "./ProcessVideo";

const W = 1760;
const H = 440;
const DUR = 11;
const SX = [395, 880, 1365];
const TY = 336;
const PH: Array<[number, number]> = [
  [0.3, 3.5],
  [3.7, 6.9],
  [7.1, 10.2],
];
const ICONS = [
  "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10",
  "M9 11l3 3 8-8M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  "M1 3h15v13H1zM16 8h4l3 3v5h-7M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
];

function Ico(d: string, s = 30) {
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

function BandBG() {
  const t = useTime();
  const drift = (t * 26) % 110;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "linear-gradient(180deg, #100c08, #0c0a07)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.6,
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 109px, rgba(212,181,110,0.06) 109px 110px)",
          backgroundPositionX: -drift + "px",
          maskImage:
            "radial-gradient(90% 80% at 50% 45%, #000, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(90% 80% at 50% 45%, #000, transparent 85%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(46% 80% at 50% 4%, rgba(212,181,110,0.14), transparent 60%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 120,
          background:
            "linear-gradient(180deg, transparent, rgba(212,181,110,0.05))",
          borderTop: "1px solid rgba(212,181,110,0.10)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 160px 40px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}

function Track({ parcelX }: { parcelX: number }) {
  const left = 150;
  const right = 1610;
  const fillW = clamp(parcelX - left, 0, right - left);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left,
          right: W - right,
          top: TY,
          height: 3,
          transform: "translateY(-50%)",
          background:
            "repeating-linear-gradient(90deg, rgba(212,181,110,0.25) 0 10px, transparent 10px 20px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left,
          top: TY,
          height: 3,
          width: fillW,
          transform: "translateY(-50%)",
          background: `linear-gradient(90deg, ${COL.goldDark}, ${COL.gold})`,
          boxShadow: "0 0 16px rgba(212,181,110,0.6)",
        }}
      />
    </>
  );
}

function Station({
  i,
  active,
  done,
}: {
  i: number;
  active: boolean;
  done: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: SX[i],
        top: TY,
        transform: "translate(-50%,-50%)",
        width: 92,
        height: 92,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: active ? "rgba(212,181,110,0.18)" : COL.panel,
        border:
          "1px solid " +
          (active
            ? "rgba(212,181,110,0.55)"
            : done
            ? "rgba(212,181,110,0.3)"
            : COL.line),
        boxShadow: active
          ? "0 0 0 8px rgba(212,181,110,0.06)"
          : "none",
        color: active ? COL.goldLight : done ? COL.gold : COL.dimmer,
        transition: "none",
      }}
    >
      {Ico(ICONS[i], 32)}
    </div>
  );
}

function BigTitle({ i, word }: { i: number; word: string }) {
  const [tin, tout] = PH[i];
  return (
    <Sprite start={tin} end={tout + 0.5}>
      {({ localTime, duration }) => {
        const inP = Easing.easeOutBack(clamp(localTime / 0.55, 0, 1));
        const inFade = clamp(localTime / 0.4, 0, 1);
        const outStart = duration - 0.55;
        const out = clamp((localTime - outStart) / 0.55, 0, 1);
        const scale = (0.62 + 0.38 * inP) * (1 + 0.12 * Easing.easeInCubic(out));
        const opacity = inFade * (1 - out);
        const drift = (1 - inP) * 46 - out * 30;
        return (
          <div
            style={{
              position: "absolute",
              left: 132,
              top: 40,
              opacity,
              transform: `translateX(${drift}px) scale(${scale})`,
              transformOrigin: "left center",
              willChange: "transform, opacity",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 116,
                  fontWeight: 700,
                  lineHeight: 0.9,
                  letterSpacing: "-4px",
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(212,181,110,0.55)",
                }}
              >
                0{i + 1}
              </span>
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 138,
                  fontWeight: 800,
                  lineHeight: 0.86,
                  letterSpacing: "-5px",
                  background: `linear-gradient(135deg, ${COL.goldLight}, ${COL.gold} 55%, ${COL.goldDark})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 10px 50px rgba(0,0,0,0.5)",
                }}
              >
                {word}
              </span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

function SubLine({ i, text }: { i: number; text: string }) {
  const [tin, tout] = PH[i];
  return (
    <Sprite start={tin + 0.35} end={tout + 0.2}>
      {({ localTime, duration }) => {
        const e = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
        const out = clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
        return (
          <div
            style={{
              position: "absolute",
              left: 138,
              top: 196,
              opacity: e * (1 - out),
              transform: `translateX(${(1 - e) * 24}px)`,
              fontFamily: SANS,
              fontSize: 23,
              fontWeight: 500,
              color: COL.dim,
              letterSpacing: "0.2px",
            }}
          >
            {text}
          </div>
        );
      }}
    </Sprite>
  );
}

function Chapters() {
  const t = useTime();
  return (
    <div
      style={{
        position: "absolute",
        left: 138,
        bottom: 30,
        display: "flex",
        gap: 10,
      }}
    >
      {[0, 1, 2].map((i) => {
        const [s, e] = PH[i];
        const active = t >= s && t <= e;
        const done = t > e;
        const fill = active ? clamp((t - s) / (e - s), 0, 1) : done ? 1 : 0;
        return (
          <div key={i} style={{ width: 120 }}>
            <div
              style={{
                height: 3,
                borderRadius: 3,
                background: COL.line,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: fill * 100 + "%",
                  background: COL.gold,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Scene({
  words,
  subs,
  outroLead,
  outroEmph,
}: {
  words: [string, string, string];
  subs: [string, string, string];
  outroLead: string;
  outroEmph: string;
}) {
  const t = useTime();

  const px = interpolate(
    [0.3, 1.0, 3.5, 4.2, 6.9, 7.6, 10.0, 10.7],
    [SX[0] - 280, SX[0], SX[0], SX[1], SX[1], SX[2], SX[2], W + 260],
    [
      Easing.easeOutCubic,
      Easing.linear,
      Easing.easeInOutCubic,
      Easing.linear,
      Easing.easeInOutCubic,
      Easing.linear,
      Easing.easeInCubic,
      Easing.linear,
    ]
  )(t);

  const parcelVisible = t > 0.45 && t < 10.4;
  const drop = Easing.easeOutBack(clamp((t - 0.5) / 0.6, 0, 1));
  const scan = clamp((t - 4.4) / 1.1, 0, 1) * (t < 6.6 ? 1 : 0);
  const label = Easing.easeOutCubic(clamp((t - 5.6) / 0.5, 0, 1));
  const check = Easing.easeOutBack(clamp((t - 5.9) / 0.5, 0, 1));

  const vanX = interpolate(
    [0, 0.9, 3.2, 4.1],
    [-360, 70, 70, -360],
    [Easing.easeOutCubic, Easing.linear, Easing.easeInCubic]
  )(t);
  const vanShow = t < 4.1;

  const truckX = interpolate(
    [6.7, 7.5, 9.8, 10.9],
    [W + 40, SX[2] + 30, SX[2] + 30, W + 420],
    [Easing.easeOutCubic, Easing.linear, Easing.easeInCubic]
  )(t);
  const truckShow = t > 6.7 && t < 10.9;
  const driving =
    t < 0.9 || (t > 3.2 && t < 4.1) || t > 9.8;

  const activeIdx = PH.findIndex(([a, b]) => t >= a && t <= b);

  const sceneStyle: CSSProperties = { position: "absolute", inset: 0 };

  return (
    <div style={sceneStyle}>
      <BandBG />
      <Track parcelX={px} />
      {[0, 1, 2].map((i) => (
        <Station
          key={i}
          i={i}
          active={activeIdx === i}
          done={t > PH[i][1]}
        />
      ))}

      {vanShow && (
        <div
          style={{
            position: "absolute",
            left: vanX,
            top: TY - 36,
            transform: "translateX(-50%)",
          }}
        >
          <Vehicle kind="van" w={210} driving={driving} />
        </div>
      )}
      {truckShow && (
        <div
          style={{
            position: "absolute",
            left: truckX,
            top: TY - 40,
            transform: "translateX(-50%)",
          }}
        >
          <Vehicle
            kind="truck"
            w={250}
            driving={t > 9.8 || (t > 6.7 && t < 7.5)}
          />
        </div>
      )}

      {parcelVisible && (
        <div
          style={{
            position: "absolute",
            left: px,
            top: TY,
            transform: `translate(-50%, ${-50 - (1 - drop) * 58}%)`,
            opacity: clamp((t - 0.45) / 0.2, 0, 1),
          }}
        >
          <ParcelBox
            size={92}
            scan={scan}
            label={label > 0.02 ? label : t > 5.6 ? 1 : 0}
            check={t > 5.9 ? check : 0}
          />
        </div>
      )}

      {[0, 1, 2].map((i) => (
        <BigTitle key={i} i={i} word={words[i]} />
      ))}
      <SubLine i={0} text={subs[0]} />
      <SubLine i={1} text={subs[1]} />
      <SubLine i={2} text={subs[2]} />

      <Sprite start={10.1} end={11}>
        {({ localTime }) => {
          const e = Easing.easeOutBack(clamp(localTime / 0.5, 0, 1));
          return (
            <div
              style={{
                position: "absolute",
                left: 132,
                top: 120,
                opacity: clamp(localTime / 0.35, 0, 1),
                transform: `scale(${0.7 + e * 0.3})`,
                transformOrigin: "left center",
              }}
            >
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 30,
                  fontWeight: 600,
                  color: COL.dim,
                }}
              >
                {outroLead}
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 96,
                  fontWeight: 800,
                  fontStyle: "italic",
                  letterSpacing: "-4px",
                  color: COL.gold,
                  lineHeight: 0.92,
                  textShadow: "0 10px 50px rgba(0,0,0,0.5)",
                }}
              >
                {outroEmph}
              </div>
            </div>
          );
        }}
      </Sprite>

      <Chapters />
    </div>
  );
}

export function ProcessBand({ c, lang }: { c: Copy; lang: "es" | "en" }) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= 700);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const words: [string, string, string] =
    lang === "es"
      ? ["Abastecemos", "Preparamos", "Enviamos"]
      : ["We source", "We prep", "We ship"];
  const subs: [string, string, string] =
    lang === "es"
      ? [
          "Producto verificado de marcas reales.",
          "Control de calidad y etiquetado en nuestro Prep Center.",
          "A los centros de Amazon y Walmart.",
        ]
      : [
          "Verified product from real brands.",
          "Quality control and labeling in our Prep Center.",
          "To Amazon and Walmart fulfillment centers.",
        ];
  const outroLead = lang === "es" ? "Tú vendes." : "You sell.";
  const outroEmph =
    lang === "es" ? "Nosotros nos encargamos." : "We take care of it.";

  // Avoid unused-variable warning; reference c for future copy hooks
  void c;

  return (
    <section className="ddi-section ddi-band-sec" id="proceso">
      <div className="ddi-container">
        <div className="ddi-band-head">
          <SectionLabel>
            {lang === "es" ? "El proceso en movimiento" : "The process in motion"}
          </SectionLabel>
        </div>
      </div>
      {mobile ? (
        <div className="ddi-vid-frame">
          <ProcessVideo />
        </div>
      ) : (
      <div className="ddi-band-frame">
        <Stage width={W} height={H} duration={DUR} background={COL.bg}>
          <Scene
            words={words}
            subs={subs}
            outroLead={outroLead}
            outroEmph={outroEmph}
          />
        </Stage>
      </div>
      )}
    </section>
  );
}
