"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { data as DDI_DATA, type Copy } from "@/lib/ddi-data";
import { DDIcon, useCountUp } from "./ddi-ui";

function parseCredValue(value: string) {
  const isM = /M\s*$/i.test(value);
  const comma = value.includes(",");
  const num = parseFloat(value.replace(/,/g, ""));
  const decimals = isM && value.includes(".") ? 1 : 0;
  return { to: isNaN(num) ? 0 : num, isM, comma, decimals };
}

function CredNum({ value, suffix, run }: { value: string; suffix: string; run: boolean }) {
  const p = parseCredValue(value);
  const v = useCountUp(p.to, run, 1700);
  let txt: string;
  if (p.isM) txt = v.toFixed(p.decimals) + "M";
  else if (p.comma) txt = Math.round(v).toLocaleString("en-US");
  else txt = Math.round(v).toString();
  return (
    <div className="ddi-cred-num mono">
      <span>{txt}</span>
      <em>{suffix}</em>
    </div>
  );
}

export function Credibility({ c }: { c: Copy }) {
  const secRef = useRef<HTMLElement | null>(null);
  const wmRef = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = secRef.current;
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const sec = secRef.current;
    const wm = wmRef.current;
    if (!sec || !wm) return;
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onScroll = () => {
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const prog = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      const sweep = Math.max(0, Math.min(1, (prog - 0.12) / 0.42));
      wm.style.transform = "translateY(" + ((prog - 0.5) * 22).toFixed(1) + "px)";
      const gold = wm.firstElementChild as HTMLElement | null;
      const plat = wm.lastElementChild as HTMLElement | null;
      if (gold) gold.style.opacity = (1 - sweep).toFixed(3);
      if (plat) plat.style.opacity = sweep.toFixed(3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const labelFor = (key: string) => (c.cred as unknown as Record<string, string>)[key];

  return (
    <section
      className={"ddi-cred ddi-cred--strip" + (shown ? " shown" : "")}
      id="cred"
      ref={secRef}
    >
      <span className="ddi-cred-wm" aria-hidden="true" ref={wmRef}>
        <span className="ddi-cred-wm-l ddi-cred-wm-gold">D&amp;D</span>
        <span className="ddi-cred-wm-l ddi-cred-wm-plat">D&amp;D</span>
      </span>
      <span className="ddi-cred-line" aria-hidden="true" />
      <div className="ddi-container">
        <div className="ddi-cred-strip-row">
          {DDI_DATA.stats.map((s, i) => (
            <Fragment key={s.key}>
              {i > 0 && <span className="ddi-cred-divider" />}
              <div className="ddi-cred-strip-item">
                <CredNum value={s.value} suffix={s.suffix} run={shown} />
                <div className="ddi-cred-lbl">{labelFor(s.key)}</div>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="ddi-cred-foot">
          <DDIcon name="shield" size={15} stroke="var(--brand-mid)" />
          <span>{c.cred.foot}</span>
        </div>
      </div>
    </section>
  );
}
