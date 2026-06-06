"use client";

import { useEffect, useState } from "react";
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
}: {
  c: Copy;
  lang: Lang;
  setLang: (l: Lang) => void;
  onCatalog: () => void;
  onPartner: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
                <a key={k} href="#catalog" className="ddi-navlink-btn">
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
        </div>
      </div>
    </header>
  );
}
