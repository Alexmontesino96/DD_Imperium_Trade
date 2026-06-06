"use client";

import { data as DDI_DATA, type Copy, type Lang } from "@/lib/ddi-data";
import { DDIcon, SectionLabel } from "./ddi-ui";

export function Trust({ c, lang }: { c: Copy; lang: Lang }) {
  const t = c.trust;
  return (
    <section className="ddi-section ddi-trust" id="trust">
      <div className="ddi-container">
        <div className="ddi-section-head">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="ddi-h2">{t.title}</h2>
          <p className="ddi-section-sub">{t.sub}</p>
        </div>

        <div className="ddi-trust-layout">
          <div className="ddi-trust-qa">
            {t.items.map((it, i) => (
              <div className="ddi-qa" key={i}>
                <div className="ddi-qa-icon">
                  <DDIcon name={it.icon} size={20} stroke="var(--brand-primary)" />
                </div>
                <div className="ddi-qa-body">
                  <div className="ddi-qa-fear">
                    <span className="ddi-qa-q">{c.yourConcern}</span>
                    {it.fear}
                  </div>
                  <div className="ddi-qa-answer">{it.answer}</div>
                </div>
              </div>
            ))}
          </div>

          <aside className="ddi-trust-company">
            <div className="ddi-company-head">
              <DDIcon name="badgeCheck" size={18} stroke="var(--brand-primary)" />
              <span>{t.company.label}</span>
            </div>
            <div className="ddi-company-name">{t.company.name}</div>
            <ul className="ddi-company-facts">
              {t.company.facts.map((f, i) => (
                <li key={i}>
                  <DDIcon name="check" size={14} stroke="var(--ok-soft)" />
                  {f}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="ddi-team-teaser">
          <div className="ddi-team-teaser-copy">
            <SectionLabel>{t.team.label}</SectionLabel>
            <h3 className="ddi-team-teaser-title">{t.team.title}</h3>
            <p className="ddi-team-teaser-sub">{t.team.sub}</p>
            <a className="ddi-btn ddi-btn-primary ddi-btn-sm ddi-team-cta" href="#trust">
              {t.team.cta}
              <DDIcon name="arrow" size={16} stroke="currentColor" />
            </a>
          </div>
          <div className="ddi-team-faces">
            {DDI_DATA.team.map((m) => (
              <a className="ddi-team-face" href="#trust" key={m.name}>
                <span className="ddi-team-avatar">{m.initials}</span>
                <span className="ddi-team-meta">
                  <span className="ddi-team-name">{m.name}</span>
                  <span className="ddi-team-role">{m.role[lang]}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
