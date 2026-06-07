"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { copy, data as DDI_DATA, type Lang } from "@/lib/ddi-data";
import { DDIcon, SectionLabel } from "./ddi-ui";
import { Header } from "./Header";
import { Footer } from "./Footer";

const T: Record<Lang, {
  badge: string;
  heroTitleA: string;
  heroTitleEm: string;
  heroTitleB: string;
  heroSub: string;
  teamLabel: string;
  teamTitle: string;
  teamSub: string;
  factsLabel: string;
  factsTitle: string;
  factsSub: string;
  factsRows: Array<{ k: string; v: string }>;
  ctaTitleA: string;
  ctaTitleEm: string;
  ctaTitleB: string;
  ctaSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
}> = {
  es: {
    badge: "Sobre nosotros",
    heroTitleA: "Las personas detrás de ",
    heroTitleEm: "D&D Imperium",
    heroTitleB: ".",
    heroSub:
      "Una distribuidora familiar con operación propia en Miami. Conectamos marcas con Amazon y Walmart y respondemos por cada envío.",
    teamLabel: "El equipo",
    teamTitle: "Quiénes operan tu inventario.",
    teamSub:
      "Pocas personas, mucho contacto directo. Cuando algo pasa, hablas con quien decide.",
    factsLabel: "Empresa verificable",
    factsTitle: "Una empresa real, verificable.",
    factsSub:
      "Constituida y activa en Florida. Cualquier dato lo puedes comprobar en el registro público del estado.",
    factsRows: [
      { k: "Razón social", v: "D&D Imperium Trade LLC" },
      { k: "Estado", v: "Florida (FL), EE.UU." },
      { k: "Sede", v: "Doral, FL 33122" },
      { k: "Constituida", v: "3 oct 2025" },
      { k: "Estatus", v: "Activa" },
      { k: "Documento", v: "L25000455620" },
    ],
    ctaTitleA: "¿Hablamos de tu ",
    ctaTitleEm: "operación",
    ctaTitleB: "?",
    ctaSub:
      "Cuéntanos qué necesitas. Te respondemos el mismo día hábil con un plan concreto.",
    ctaPrimary: "Solicita el catálogo",
    ctaSecondary: "Escríbenos por WhatsApp",
  },
  en: {
    badge: "About us",
    heroTitleA: "The people behind ",
    heroTitleEm: "D&D Imperium",
    heroTitleB: ".",
    heroSub:
      "A family-run distributor with our own operation in Miami. We connect brands with Amazon and Walmart and answer for every shipment.",
    teamLabel: "The team",
    teamTitle: "Who runs your inventory.",
    teamSub:
      "Few people, lots of direct contact. When something happens, you talk to the person who decides.",
    factsLabel: "Verifiable company",
    factsTitle: "A real, verifiable company.",
    factsSub:
      "Incorporated and active in Florida. Every field can be confirmed in the state's public registry.",
    factsRows: [
      { k: "Legal name", v: "D&D Imperium Trade LLC" },
      { k: "State", v: "Florida (FL), U.S." },
      { k: "Headquarters", v: "Doral, FL 33122" },
      { k: "Incorporated", v: "Oct 3, 2025" },
      { k: "Status", v: "Active" },
      { k: "Document", v: "L25000455620" },
    ],
    ctaTitleA: "Let's talk about your ",
    ctaTitleEm: "operation",
    ctaTitleB: ".",
    ctaSub:
      "Tell us what you need. We reply the same business day with a concrete plan.",
    ctaPrimary: "Request the catalog",
    ctaSecondary: "Message us on WhatsApp",
  },
};

export function AboutClient() {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("ddi-lang") as Lang | null;
    if (stored === "es" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("ddi-lang", l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const c = copy[lang];
  const t = T[lang];
  const noop = () => {};
  const waHref = "https://wa.me/" + DDI_DATA.whatsapp.replace(/[^0-9]/g, "");

  return (
    <div
      className="ddi-root"
      data-theme="dark"
      data-accent="champagne"
      data-bg="aurora"
    >
      <Header c={c} lang={lang} setLang={setLang} onCatalog={noop} onPartner={noop} />

      <main>
        <section className="ddi-about-hero">
          <div className="ddi-hero-fx" aria-hidden="true">
            <div className="ddi-hero-aurora" />
            <div className="ddi-hero-grid" />
          </div>
          <div className="ddi-container">
            <Link href="/" className="ddi-about-back">
              <DDIcon name="arrow" size={14} style={{ transform: "rotate(180deg)" }} />
              {lang === "es" ? "Volver al inicio" : "Back to home"}
            </Link>
            <SectionLabel>{t.badge}</SectionLabel>
            <h1 className="ddi-about-h1">
              {t.heroTitleA}
              <em>{t.heroTitleEm}</em>
              {t.heroTitleB}
            </h1>
            <p className="ddi-about-sub">{t.heroSub}</p>
          </div>
        </section>

        <section className="ddi-about-section">
          <div className="ddi-container">
            <div className="ddi-about-sec-head">
              <SectionLabel>{t.teamLabel}</SectionLabel>
              <h2 className="ddi-h2">{t.teamTitle}</h2>
              <p className="ddi-section-sub">{t.teamSub}</p>
            </div>
            <div className="ddi-team-grid">
              {DDI_DATA.team.map((m) => (
                <article key={m.name} className="ddi-team-card">
                  <div className="ddi-team-card-head">
                    <span className="ddi-team-card-avatar">{m.initials}</span>
                    <div>
                      <h3 className="ddi-team-card-name">{m.name}</h3>
                      <p className="ddi-team-card-role">{m.role[lang]}</p>
                    </div>
                  </div>
                  <p className="ddi-team-card-bio">{m.bio[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ddi-about-section ddi-about-facts">
          <div className="ddi-container">
            <div className="ddi-about-sec-head">
              <SectionLabel>{t.factsLabel}</SectionLabel>
              <h2 className="ddi-h2">{t.factsTitle}</h2>
              <p className="ddi-section-sub">{t.factsSub}</p>
            </div>
            <div className="ddi-facts-card">
              <div className="ddi-facts-head">
                <DDIcon name="badgeCheck" size={18} stroke="var(--brand-primary)" />
                <span>D&amp;D Imperium Trade LLC</span>
              </div>
              <dl className="ddi-facts-list">
                {t.factsRows.map((r) => (
                  <div className="ddi-facts-row" key={r.k}>
                    <dt>{r.k}</dt>
                    <dd className="mono">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="ddi-about-cta">
          <div className="ddi-container">
            <h2 className="ddi-about-cta-title">
              {t.ctaTitleA}
              <em>{t.ctaTitleEm}</em>
              {t.ctaTitleB}
            </h2>
            <p className="ddi-about-cta-sub">{t.ctaSub}</p>
            <div className="ddi-about-cta-row">
              <Link href="/#contact" className="ddi-btn ddi-btn-primary ddi-btn-lg">
                {t.ctaPrimary}
                <DDIcon name="arrow" size={18} />
              </Link>
              <a
                className="ddi-btn ddi-btn-whatsapp-outline ddi-btn-lg"
                href={waHref}
                target="_blank"
                rel="noreferrer"
              >
                <DDIcon name="whatsapp" size={18} />
                {t.ctaSecondary}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer c={c} />

      <a
        className="ddi-wa-fab"
        href={waHref}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <DDIcon name="whatsapp" size={26} />
      </a>
    </div>
  );
}
