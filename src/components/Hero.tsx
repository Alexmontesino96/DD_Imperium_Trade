"use client";

import Link from "next/link";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { data as DDI_DATA, type Copy, type HeroStat as HeroStatType } from "@/lib/ddi-data";
import { DDIcon, useCountUp } from "./ddi-ui";

function HeroStat({
  stat,
  label,
  sub,
  run,
}: {
  stat: HeroStatType;
  label: string;
  sub?: string;
  run: boolean;
}) {
  const v = useCountUp(stat.to, run);
  const txt = stat.prefix + v.toFixed(stat.decimals) + stat.suffix;
  return (
    <div className={"ddi-hero-stat" + (run ? " run" : "")}>
      <div className="ddi-hero-stat-num mono">{txt}</div>
      <div className="ddi-hero-stat-label">{label}</div>
      {sub && <div className="ddi-hero-stat-sub">{sub}</div>}
    </div>
  );
}

export function Hero({ c }: { c: Copy; onSample?: () => void }) {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsRun, setStatsRun] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setStatsRun(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStatsRun(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = c.hero.emph.split(" ");

  return (
    <section className="ddi-hero ddi-hero--statement">
      <div className="ddi-hero-fx" aria-hidden="true">
        <div className="ddi-hero-aurora" />
        <div className="ddi-hero-grain" />
        <div className="ddi-hero-glow" />
        <div className="ddi-hero-grid" />
        <div className="ddi-hero-vline" />
        <div className="ddi-hero-lines">
          <span
            className="ddi-route"
            style={{ top: "32%", "--dur": "11s", "--delay": "0s" } as CSSProperties}
          />
          <span
            className="ddi-route"
            style={{ top: "68%", "--dur": "14s", "--delay": "3.5s" } as CSSProperties}
          />
        </div>
        <span className="ddi-hero-watermark" aria-hidden="true">
          D&amp;D
        </span>
      </div>
      <span className="ddi-hero-rail" aria-hidden="true">
        {DDI_DATA.address}
      </span>
      <div className="ddi-container ddi-hero-statement-in">
        <div className="ddi-hero-eyebrow">
          <span className="ddi-livedot" />
          {c.hero.eyebrow}
        </div>
        <div className="ddi-hero-3words">
          {words.map((w, i) => (
            <span key={i} className="ddi-3w" style={{ "--wi": i } as CSSProperties}>
              {w}
            </span>
          ))}
        </div>
        <p className="ddi-hero-sub">{c.hero.sub}</p>
        <div className="ddi-hero-cta-row">
          <Link href="/#contact" className="ddi-btn ddi-btn-primary ddi-btn-hero">
            <span className="ddi-btn-hero-label">{c.hero.ctaSecondary}</span>
            <span className="ddi-cta-arrow">
              <DDIcon name="arrow" size={18} />
            </span>
          </Link>
        </div>
        <p className="ddi-hero-ctanote">{c.hero.note}</p>
        <div className="ddi-hero-stats" ref={statsRef}>
          {DDI_DATA.heroStats.map((s, i) => (
            <HeroStat
              key={i}
              stat={s}
              label={c.hero.proofLabels[i]}
              sub={c.hero.proofSubs?.[i]}
              run={statsRun}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
