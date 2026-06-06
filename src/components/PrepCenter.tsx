"use client";

import { useEffect, useRef, useState } from "react";
import { type Copy, type PrepMetric } from "@/lib/ddi-data";
import { DDIcon, SectionLabel } from "./ddi-ui";

function usePrepCount(to: number, run: boolean, dur = 1700) {
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
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, dur]);
  return v;
}

function PrepMetricCmp({ m, run }: { m: PrepMetric; run: boolean }) {
  const v = usePrepCount(m.value, run);
  const num = m.comma ? Math.round(v).toLocaleString("en-US") : v.toFixed(m.decimals || 0);
  return (
    <div className="ddi-prepm">
      <div className="ddi-prepm-num mono">{(m.prefix || "") + num + (m.suffix || "")}</div>
      <div className="ddi-prepm-label">{m.label}</div>
    </div>
  );
}

const PREP_IMAGES: Record<"warehouse" | "qc" | "labeling" | "shipping", string> = {
  warehouse: "/prep-warehouse.jpg",
  qc: "/prep-receiving.jpg",
  labeling: "/prep-labeling.jpg",
  shipping: "/prep-warehouse.jpg",
};

function PrepImage({
  alt,
  variant = "warehouse",
}: {
  alt: string;
  variant?: "warehouse" | "qc" | "labeling" | "shipping";
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={PREP_IMAGES[variant]}
      alt={alt}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}

export function PrepCenter({ c, onPartner }: { c: Copy; onPartner: () => void }) {
  const secRef = useRef<HTMLElement | null>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setRun(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRun(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const variants: Array<"warehouse" | "qc" | "labeling" | "shipping"> = [
    "warehouse",
    "qc",
    "labeling",
    "shipping",
  ];

  return (
    <section className="ddi-section ddi-prep" id="prep" ref={secRef}>
      <div className="ddi-container">
        <div className="ddi-section-head">
          <SectionLabel>{c.prep.label}</SectionLabel>
          <h2 className="ddi-h2">{c.prep.title}</h2>
          <p className="ddi-section-sub">{c.prep.sub}</p>
        </div>

        <div className="ddi-feature">
          <div className="ddi-feature-media">
            <video
              className="ddi-feature-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/prep-warehouse-poster.jpg"
              aria-label={c.prep.photoNote}
            >
              <source src="/prep-warehouse.webm" type="video/webm" />
              <source src="/prep-warehouse.mp4" type="video/mp4" />
            </video>
            <div className="ddi-feature-chip">
              <span className="ddi-livedot" />
              <div className="ddi-feature-chip-lbl">{c.prep.chip}</div>
            </div>
          </div>
          <div className="ddi-feature-body">
            <div className="ddi-prepm-grid">
              {c.prep.metrics.map((m, i) => (
                <PrepMetricCmp key={i} m={m} run={run} />
              ))}
            </div>
          </div>
        </div>

        <div className="ddi-prep-evid-label">{c.prep.evidenceLabel}</div>
        <div className="ddi-prep-evid">
          {c.prep.evidence.map((ev, i) => (
            <figure className="ddi-evid-tile" key={i}>
              <PrepImage alt={ev.stage} variant={variants[i]} />
              <div className="ddi-evid-scrim" />
              <figcaption>
                <span className="ddi-evid-step mono">0{i + 1}</span>
                <span className="ddi-evid-stage">{ev.stage}</span>
                <span className="ddi-evid-note">{ev.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <button className="ddi-prep-visit" onClick={onPartner}>
          <DDIcon name="building" size={17} stroke="var(--brand-primary)" />
          {c.prep.visitCta}
          <DDIcon name="arrow" size={16} stroke="currentColor" />
        </button>
      </div>
    </section>
  );
}
