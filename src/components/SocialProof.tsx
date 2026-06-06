"use client";

import { CSSProperties, ReactNode } from "react";
import { data as DDI_DATA, type Copy, type Lang, type Partner } from "@/lib/ddi-data";
import { DDIcon, SectionLabel } from "./ddi-ui";

function renderSampleLogo(p: Partner) {
  const c = "var(--fg-2)";
  if (p.kind === "monogram") {
    return (
      <span className="ddi-slogo">
        <span
          className="ddi-slogo-mark"
          style={{ background: "var(--brand-gradient)", color: "var(--cta-fg)" }}
        >
          {p.mk}
        </span>
        <span className="ddi-slogo-word" style={{ fontWeight: 800, letterSpacing: "-0.5px" }}>
          {p.name}
        </span>
      </span>
    );
  }
  if (p.kind === "dot") {
    return (
      <span
        className="ddi-slogo"
        style={{ fontWeight: 700, letterSpacing: "-0.3px", color: c } as CSSProperties}
      >
        {p.name}
        <span style={{ color: "var(--brand-primary)" }}>.</span>
      </span>
    );
  }
  if (p.kind === "icon") {
    return (
      <span className="ddi-slogo" style={{ color: c } as CSSProperties}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={p.d} />
        </svg>
        <span className="ddi-slogo-word" style={{ fontWeight: 700 }}>
          {p.name}
        </span>
      </span>
    );
  }
  if (p.kind === "serif") {
    return (
      <span
        className="ddi-slogo"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 700,
          fontStyle: "italic",
          letterSpacing: "0.2px",
          color: c,
        }}
      >
        {p.name}
      </span>
    );
  }
  if (p.kind === "spaced") {
    return (
      <span
        className="ddi-slogo"
        style={{
          fontWeight: 600,
          letterSpacing: "3px",
          textTransform: "uppercase",
          fontSize: 14,
          color: c,
        }}
      >
        {p.name}
      </span>
    );
  }
  return (
    <span
      className="ddi-slogo"
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        letterSpacing: "-0.5px",
        color: c,
      }}
    >
      {p.name}
    </span>
  );
}

function Star({ filled }: { filled: boolean }): ReactNode {
  return (
    <DDIcon
      name="spark"
      size={14}
      stroke="none"
      fill={filled ? "var(--brand-primary)" : "var(--fg-5)"}
      style={{ color: filled ? "var(--brand-primary)" : "var(--fg-5)" }}
    />
  );
}

export function SocialProof({ c, lang }: { c: Copy; lang: Lang }) {
  return (
    <section className="ddi-section ddi-social" id="social">
      <div className="ddi-container">
        <div className="ddi-section-head">
          <SectionLabel>{c.social.label}</SectionLabel>
          <h2 className="ddi-h2">{c.social.title}</h2>
        </div>

        <div className="ddi-social-stats">
          {DDI_DATA.socialStats.map((s) => (
            <div className="ddi-soc-stat" key={s.key}>
              <div className="ddi-soc-stat-num mono">{s.value.toFixed(s.decimals) + s.suffix}</div>
              <div className="ddi-soc-stat-lbl">{c.social.statLabels[s.key]}</div>
            </div>
          ))}
        </div>

        <div className="ddi-social-grid">
          {DDI_DATA.testimonials.map((tm) => (
            <figure className="ddi-quote-card" key={tm.id}>
              <div className="ddi-quote-stars">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} filled={s < tm.rating} />
                ))}
              </div>
              <blockquote className="ddi-quote-text">&ldquo;{tm.quote[lang]}&rdquo;</blockquote>
              <figcaption className="ddi-quote-by">
                <span className="ddi-avatar">
                  <span className="ddi-avatar-initials">{tm.initials}</span>
                </span>
                <span>
                  <span className="ddi-quote-name">{tm.name}</span>
                  <span className="ddi-quote-role">{tm.role[lang]}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="ddi-partners">
          <span className="ddi-partners-label">{c.social.partners}</span>
          <div className="ddi-partners-row">
            {DDI_DATA.partners.map((p) => (
              <div className="ddi-partner-logo" key={p.id} title={p.name}>
                <span className="ddi-partner-sample">{renderSampleLogo(p)}</span>
              </div>
            ))}
          </div>
          <span className="ddi-partners-note">{c.social.partnersNote}</span>
        </div>
      </div>
    </section>
  );
}
