"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { data as DDI_DATA, type Copy, type HeroStat as HeroStatType } from "@/lib/ddi-data";
import { DDIcon, useCountUp } from "./ddi-ui";

function HeroStat({ stat, label, run }: { stat: HeroStatType; label: string; run: boolean }) {
  const v = useCountUp(stat.to, run);
  const txt = stat.prefix + v.toFixed(stat.decimals) + stat.suffix;
  return (
    <div className={"ddi-hero-stat" + (run ? " run" : "")}>
      <div className="ddi-hero-stat-num mono">{txt}</div>
      <div className="ddi-hero-stat-label">{label}</div>
    </div>
  );
}

function HeroAurora({ c }: { c: Copy }) {
  void c;
  return (
    <section className="ddi-hero ddi-hero--aurora" aria-label="Aurora hero">
      <div className="ddi-aurora-field" aria-hidden="true" />
      <div className="ddi-aurora-grain" aria-hidden="true" />
      <div className="ddi-container ddi-hero-aurora-in">
        <div className="ddi-aurora-words">
          <span className="ddi-aurora-w">
            Marcas<span className="ddi-aurora-dot">.</span>
          </span>
          <span className="ddi-aurora-w">
            Mercado<span className="ddi-aurora-dot">.</span>
          </span>
          <span className="ddi-aurora-w">
            Conexión<span className="ddi-aurora-dot">.</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export function Hero({ c, aurora = false }: { c: Copy; onSample?: () => void; aurora?: boolean }) {
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

  if (aurora) return <HeroAurora c={c} />;

  return (
    <section className="ddi-hero ddi-hero--statement">
      <div className="ddi-hero-fx" aria-hidden="true">
        <div className="ddi-hero-glow" />
        <div className="ddi-hero-grid" />
        <div className="ddi-hero-vline" />
        <div className="ddi-hero-lines">
          <span
            className="ddi-route"
            style={{ top: "32%", "--dur": "11s", "--delay": "0s" } as React.CSSProperties}
          />
          <span
            className="ddi-route"
            style={{ top: "68%", "--dur": "14s", "--delay": "3.5s" } as React.CSSProperties}
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
        <h1 className="ddi-hero-title ddi-hero-title--xl">
          <span className="ddi-lead">{c.hero.lead}</span>
          <em className="ddi-hero-emph ddi-hero-emph--shine">{c.hero.emph}</em>
        </h1>
        <p className="ddi-hero-sub" dangerouslySetInnerHTML={{ __html: c.hero.sub }} />
        <div className="ddi-hero-cta-row">
          <Link href="/catalogo" className="ddi-btn ddi-btn-primary ddi-btn-hero">
            <span className="ddi-btn-hero-label">{c.hero.ctaSecondary}</span>
            <span className="ddi-cta-arrow">
              <DDIcon name="arrow" size={18} />
            </span>
          </Link>
        </div>
        <p className="ddi-hero-ctanote">{c.hero.note}</p>
        <div className="ddi-hero-stats" ref={statsRef}>
          {DDI_DATA.heroStats.map((s, i) => (
            <HeroStat key={i} stat={s} label={c.hero.proofLabels[i]} run={statsRun} />
          ))}
        </div>
      </div>
    </section>
  );
}
