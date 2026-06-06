"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { copy, data as DDI_DATA, type Lang } from "@/lib/ddi-data";
import { DDIcon, SectionLabel } from "./ddi-ui";
import { Header } from "./Header";
import { Footer } from "./Footer";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CATEGORY_LABELS: Record<Lang, Record<string, string>> = {
  es: {
    "Beauty & Personal Care": "Belleza y cuidado personal",
    Grocery: "Alimentos y bebidas",
    "House & Hold": "Hogar",
  },
  en: {
    "Beauty & Personal Care": "Beauty & Personal Care",
    Grocery: "Grocery",
    "House & Hold": "House & Hold",
  },
};

const T: Record<Lang, {
  pageTitle: string;
  pageSub: string;
  badge: string;
  back: string;
  sampleLabel: string;
  unlock: string;
  unlockSub: string;
  bullets: string[];
  formLabel: string;
  formCta: string;
  formNote: string;
  done: string;
  doneSub: string;
  lockTitle: string;
}> = {
  es: {
    pageTitle: "Catálogo de muestra",
    pageSub:
      "Una selección de las tres categorías que distribuimos. El catálogo completo se desbloquea cuando te registras como vendedor verificado.",
    badge: "Muestra · sin precios",
    back: "Volver al inicio",
    sampleLabel: "Muestra disponible",
    unlock: "Desbloquea el catálogo completo",
    unlockSub:
      "Regístrate como vendedor y, una vez verificado, accedes a precios, stock y disponibilidad de todas las referencias.",
    bullets: [
      "Precios mayoristas por unidad",
      "Stock y disponibilidad en tiempo real",
      "Asesor directo asignado",
    ],
    formLabel: "Déjanos tu email y un asesor te contacta hoy mismo.",
    formCta: "Solicitar acceso completo",
    formNote: "Sin costo · Sin compromiso · Atención directa",
    done: "¡Listo! Recibimos tu solicitud.",
    doneSub:
      "En las próximas horas un asesor te contacta para verificarte y darte acceso al catálogo completo.",
    lockTitle: "Catálogo completo",
  },
  en: {
    pageTitle: "Sample catalog",
    pageSub:
      "A selection across the three categories we distribute. The full catalog unlocks when you register as a verified seller.",
    badge: "Sample · no pricing",
    back: "Back to home",
    sampleLabel: "Sample available",
    unlock: "Unlock the full catalog",
    unlockSub:
      "Register as a seller and, once verified, you get pricing, stock, and availability for every SKU.",
    bullets: [
      "Wholesale per-unit pricing",
      "Real-time stock and availability",
      "Direct advisor assigned",
    ],
    formLabel: "Leave your email and an advisor reaches out today.",
    formCta: "Request full access",
    formNote: "No cost · No commitment · Direct support",
    done: "Done! We received your request.",
    doneSub:
      "An advisor will reach out in the next few hours to verify you and grant access to the full catalog.",
    lockTitle: "Full catalog",
  },
};

function CategoryIcon({ name }: { name: string }) {
  return (
    <DDIcon
      name={
        name === "Beauty & Personal Care"
          ? "spark"
          : name === "Grocery"
          ? "source"
          : "building"
      }
      size={16}
      stroke="var(--brand-mid)"
    />
  );
}

export function CatalogClient() {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("ddi-lang")) as Lang | null;
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

  const grouped: Record<string, typeof DDI_DATA.sampleCatalog> = {};
  for (const row of DDI_DATA.sampleCatalog) {
    const key = row.cat[lang] || row.cat.es;
    grouped[key] = grouped[key] || [];
    grouped[key].push(row);
  }

  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const valid = emailRe.test(email);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (valid) setDone(true);
  };

  const noop = () => {};

  return (
    <div className="ddi-root" data-theme="dark" data-accent="champagne" data-bg="malla">
      <Header c={c} lang={lang} setLang={setLang} onCatalog={noop} onPartner={noop} />

      <main>
        <section className="ddi-cat-hero">
          <div className="ddi-container">
            <Link href="/" className="ddi-cat-back">
              <DDIcon name="arrow" size={14} style={{ transform: "rotate(180deg)" }} />
              {t.back}
            </Link>
            <SectionLabel>{t.badge}</SectionLabel>
            <h1 className="ddi-cat-title">{t.pageTitle}</h1>
            <p className="ddi-cat-sub">{t.pageSub}</p>
          </div>
        </section>

        <section className="ddi-cat-body">
          <div className="ddi-container">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="ddi-cat-section">
                <div className="ddi-cat-section-head">
                  <CategoryIcon name={items[0].cat.es} />
                  <h2 className="ddi-cat-section-title">{CATEGORY_LABELS[lang][items[0].cat.es] || category}</h2>
                  <span className="ddi-cat-count mono">
                    {items.length} {lang === "es" ? "muestras" : "samples"}
                  </span>
                </div>
                <div className="ddi-cat-grid">
                  {items.map((row, i) => (
                    <article key={i} className="ddi-cat-card">
                      <div className="ddi-cat-card-media">
                        <DDIcon name="source" size={28} stroke="var(--brand-mid)" />
                        <span className="ddi-cat-card-badge">{row.market}</span>
                      </div>
                      <div className="ddi-cat-card-body">
                        <div className="ddi-cat-card-brand">{row.brand}</div>
                        <h3 className="ddi-cat-card-name">{row.product}</h3>
                        <div className="ddi-cat-card-meta">
                          <span className="ddi-cat-card-sample">
                            <DDIcon name="check" size={12} stroke="var(--ok-soft)" />
                            {t.sampleLabel}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ddi-cat-gate" id="acceso">
          <div className="ddi-container">
            <div className="ddi-cat-gate-card">
              <div className="ddi-cat-gate-lock">
                <DDIcon name="lock" size={22} stroke="var(--brand-primary)" />
                <span>{t.lockTitle}</span>
              </div>
              <h2 className="ddi-cat-gate-title">{t.unlock}</h2>
              <p className="ddi-cat-gate-sub">{t.unlockSub}</p>
              <ul className="ddi-cat-gate-list">
                {t.bullets.map((b) => (
                  <li key={b}>
                    <DDIcon name="badgeCheck" size={16} stroke="var(--brand-mid)" />
                    {b}
                  </li>
                ))}
              </ul>
              {done ? (
                <div className="ddi-cat-gate-done">
                  <div className="ddi-success-icon">
                    <DDIcon name="check" size={26} stroke="var(--ok-soft)" />
                  </div>
                  <div>
                    <h3 className="ddi-cat-gate-done-title">{t.done}</h3>
                    <p className="ddi-cat-gate-done-sub">{t.doneSub}</p>
                  </div>
                </div>
              ) : (
                <form className="ddi-cat-gate-form" onSubmit={onSubmit}>
                  <label className="ddi-cat-gate-label" htmlFor="cat-email">
                    {t.formLabel}
                  </label>
                  <div className="ddi-cat-gate-row">
                    <input
                      id="cat-email"
                      className="ddi-input"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="ddi-btn ddi-btn-primary ddi-btn-lg" disabled={!valid}>
                      {t.formCta}
                      <DDIcon name="arrow" size={16} />
                    </button>
                  </div>
                  <p className="ddi-cat-gate-note">{t.formNote}</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer c={c} />

      <a
        className="ddi-wa-fab"
        href={"https://wa.me/" + DDI_DATA.whatsapp.replace(/[^0-9]/g, "")}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <DDIcon name="whatsapp" size={26} />
      </a>
    </div>
  );
}
