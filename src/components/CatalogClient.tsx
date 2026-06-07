"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { copy, data as DDI_DATA, type Lang } from "@/lib/ddi-data";
import { Header } from "./Header";
import { Footer } from "./Footer";

type CategoryId = "all" | "beauty" | "grocery" | "house";

const CATEGORIES: Array<{ id: Exclude<CategoryId, "all">; name: string; matches: string }> = [
  { id: "beauty", name: "Beauty & Personal Care", matches: "Beauty & Personal Care" },
  { id: "grocery", name: "Grocery", matches: "Grocery" },
  { id: "house", name: "House & Hold", matches: "House & Hold" },
];

function BoxIcon() {
  return (
    <svg className="ic" width="34" height="34" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" />
    </svg>
  );
}

function LockIcon({ size = 13, stroke = "currentColor", strokeWidth = 2.2 }: { size?: number; stroke?: string; strokeWidth?: number }) {
  return (
    <svg className="ic" width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function CheckIcon({ size = 17 }: { size?: number }) {
  return (
    <svg className="ic" width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="var(--ok-soft)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="ic" width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function useReveal() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    root.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return rootRef;
}

export function CatalogClient() {
  const [active, setActive] = useState<CategoryId>("all");
  const [lang, setLangState] = useState<Lang>("es");
  const rootRef = useReveal();

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
  const noop = () => {};

  const products = DDI_DATA.sampleCatalog;

  const sections = useMemo(() => {
    const cats = active === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === active);
    return cats.map((c) => ({
      cat: c,
      items: products.filter((p) => p.cat.es === c.matches),
    }));
  }, [active, products]);

  // Re-trigger reveal when filter changes
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.remove("in"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active, rootRef]);

  return (
    <div
      ref={rootRef}
      className="ddi-root ddi-cat-page"
      data-theme="dark"
      data-accent="champagne"
      data-bg="aurora"
    >
      <Header c={c} lang={lang} setLang={setLang} onCatalog={noop} onPartner={noop} />

      <section className="cat-hero">
        <div className="wrap">
          <div className="eyebrow">
            <span />
            Catálogo
          </div>
          <h1>
            Producto verificado, listo para <em>Amazon y Walmart</em>.
          </h1>
          <p>
            Una muestra de lo que distribuimos en tres categorías. El catálogo completo —con
            precios, márgenes y disponibilidad— se desbloquea al registrarte como vendedor
            verificado.
          </p>
        </div>
      </section>

      <div className="filters">
        <div className="wrap filters-in">
          {([{ id: "all" as const, name: "Todos" }, ...CATEGORIES]).map((c) => (
            <button
              key={c.id}
              type="button"
              className={"chip" + (active === c.id ? " active" : "")}
              onClick={() => setActive(c.id as CategoryId)}
            >
              {c.name}
            </button>
          ))}
          <span className="filters-count">{products.length} productos de muestra</span>
        </div>
      </div>

      <main className="wrap">
        {sections.map(({ cat, items }) => (
          <section className="cat-sec" key={cat.id}>
            <div className="cat-sec-head reveal">
              <h2>{cat.name}</h2>
              <span className="cnt">{items.length} productos</span>
            </div>
            <div className="grid">
              {items.map((p, idx) => (
                <article
                  key={`${cat.id}-${idx}`}
                  className="card reveal"
                  style={{ transitionDelay: `${(idx % 4) * 0.05}s` }}
                >
                  <div className="card-media">
                    <div className="card-ph">
                      <BoxIcon />
                    </div>
                    <span className="card-badge">{p.market}</span>
                  </div>
                  <div className="card-body">
                    <div className="card-brand">{p.brand}</div>
                    <h3 className="card-name">{p.product}</h3>
                    <div className="card-locked">
                      <span className="lk">
                        <LockIcon />
                        Costo <span className="blur">$00.00</span>
                      </span>
                      <span className="unlock">Desbloquear</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <section className="wrap">
        <div className="gate">
          <div>
            <span className="gate-lock">
              <LockIcon size={15} stroke="var(--brand-mid)" strokeWidth={2} />
              Catálogo completo
            </span>
            <h3>Desbloquea precios, márgenes y disponibilidad.</h3>
            <p>
              Regístrate como vendedor. Una vez verificado, accedes al catálogo completo y un
              asesor te contacta. Sin costo, sin compromiso.
            </p>
          </div>
          <div>
            <ul className="gate-list" style={{ marginBottom: 18 }}>
              <li>
                <CheckIcon />
                Precio de costo y margen por producto
              </li>
              <li>
                <CheckIcon />
                Disponibilidad y volumen mínimo
              </li>
              <li>
                <CheckIcon />
                Mejor canal por producto
              </li>
            </ul>
            <div className="gate-form">
              <Link className="cat-btn" href="/#contact">
                Crear cuenta y desbloquear
                <ArrowRightIcon />
              </Link>
              <Link
                href="/#contact"
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--brand-mid)",
                  paddingTop: 4,
                }}
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer c={c} />
    </div>
  );
}
