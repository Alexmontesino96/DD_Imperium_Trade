"use client";

import { CSSProperties, useEffect, useState } from "react";
import { data as DDI_DATA, type Copy, type Lang } from "@/lib/ddi-data";
import { DDIcon, DDILogo } from "./ddi-ui";

type NavKey = "home" | "catalog" | "prep" | "about" | "contact";
const NAV: Array<[NavKey, string]> = [
  ["home", "#top"],
  ["catalog", "/catalogo"],
  ["prep", "#prep"],
  ["about", "#trust"],
  ["contact", "#contact"],
];

export function Header({
  c,
  lang,
  setLang,
  onCatalog,
  onPartner,
  aurora = false,
  setAurora,
}: {
  c: Copy;
  lang: Lang;
  setLang: (l: Lang) => void;
  onCatalog: () => void;
  onPartner: () => void;
  aurora?: boolean;
  setAurora?: (on: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const closeMenu = () => setMenu(false);

  return (
    <header className="ddi-header" data-scrolled={scrolled} id="top">
      <div className="ddi-topbar">
        <div className="ddi-container ddi-topbar-in">
          <span>
            <DDIcon name="building" size={13} stroke="var(--brand-mid)" style={{ verticalAlign: "-2px", marginRight: 6 }} />
            {DDI_DATA.hq}
          </span>
          <span className="ddi-topbar-sep">·</span>
          <a href={"mailto:" + DDI_DATA.email}>
            <DDIcon name="mail" size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />
            {DDI_DATA.email}
          </a>
          {setAurora && (
            <button
              type="button"
              className={"ddi-aurora-toggle" + (aurora ? " active" : "")}
              onClick={() => setAurora(!aurora)}
              aria-pressed={aurora}
              aria-label="Toggle Aurora hero variant"
              title="Variante Aurora (prueba)"
            >
              <DDIcon name="spark" size={11} stroke={aurora ? "var(--cta-fg)" : "var(--brand-mid)"} />
              <span>Aurora</span>
              <span className="ddi-aurora-beta">BETA</span>
            </button>
          )}
        </div>
      </div>
      <div className="ddi-navbar">
        <div className="ddi-container ddi-nav-in">
          <a href="#top" className="ddi-brand">
            <DDILogo size={34} />
          </a>
          <nav className="ddi-nav-links">
            {NAV.map(([k, href]) =>
              k === "catalog" ? (
                <a key={k} href="/catalogo" className="ddi-navlink-btn">
                  {c.nav[k]}
                </a>
              ) : (
                <a key={k} href={href}>
                  {c.nav[k]}
                </a>
              )
            )}
          </nav>
          <div className="ddi-nav-actions">
            <div className="ddi-langtoggle" role="group" aria-label="language">
              {(["es", "en"] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={lang === l ? "active" : ""}>
                  {c.lang[l]}
                </button>
              ))}
            </div>
            <button className="ddi-link-partner" onClick={onPartner}>
              {c.header.partnerLink}
            </button>
            <a className="ddi-nav-login" href="#contact">
              {c.header.login}
            </a>
            <button className="ddi-btn ddi-btn-primary ddi-btn-sm" onClick={onCatalog}>
              {c.header.primaryCta}
            </button>
          </div>
          <button
            className="ddi-burger"
            aria-label="Menú"
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            <span className={"ddi-burger-box" + (menu ? " open" : "")}>
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div className={"ddi-mobile-menu" + (menu ? " open" : "")} aria-hidden={!menu}>
        <div className="ddi-mobile-scrim" onClick={closeMenu} />
        <div className="ddi-mobile-panel">
          <div className="ddi-mobile-top">
            <a href="#top" className="ddi-brand" onClick={closeMenu}>
              <DDILogo size={32} />
            </a>
            <button className="ddi-mobile-close" aria-label="Cerrar" onClick={closeMenu}>
              <DDIcon name="close" size={20} />
            </button>
          </div>
          <nav className="ddi-mobile-nav">
            {NAV.map(([k, href], i) => (
              <a
                key={k}
                href={k === "catalog" ? "/catalogo" : href}
                onClick={closeMenu}
                style={{ "--mi": i } as CSSProperties}
              >
                <span>{c.nav[k]}</span>
                <DDIcon name="arrow" size={17} stroke="var(--brand-mid)" />
              </a>
            ))}
          </nav>
          <div className="ddi-mobile-foot">
            <div className="ddi-langtoggle ddi-langtoggle--lg" role="group" aria-label="language">
              {(["es", "en"] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={lang === l ? "active" : ""}>
                  {c.lang[l]}
                </button>
              ))}
            </div>
            <a className="ddi-btn ddi-btn-ghost ddi-btn-lg ddi-mobile-login" href="#contact" onClick={closeMenu}>
              {c.header.login}
            </a>
            <button
              className="ddi-btn ddi-btn-primary ddi-btn-lg"
              onClick={() => {
                closeMenu();
                onCatalog();
              }}
            >
              {c.header.primaryCta}
            </button>
            <a
              className="ddi-mobile-wa"
              href={"https://wa.me/" + DDI_DATA.whatsapp.replace(/[^0-9]/g, "")}
              target="_blank"
              rel="noreferrer"
            >
              <DDIcon name="whatsapp" size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
