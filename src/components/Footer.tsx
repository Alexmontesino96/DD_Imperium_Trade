"use client";

import { data as DDI_DATA, type Copy } from "@/lib/ddi-data";
import { DDIcon, DDILogo } from "./ddi-ui";

type NavKey = "home" | "catalog" | "prep" | "about" | "contact";
const NAV: NavKey[] = ["home", "catalog", "prep", "about", "contact"];

export function Footer({ c }: { c: Copy }) {
  return (
    <footer className="ddi-footer">
      <div className="ddi-container ddi-footer-in">
        <div className="ddi-footer-brand">
          <DDILogo size={34} />
          <p className="ddi-footer-tagline">{c.footer.tagline}</p>
          <p className="ddi-footer-legalname mono">{DDI_DATA.legalName}</p>
        </div>
        <div className="ddi-footer-col">
          <h4>{c.footer.explore}</h4>
          {NAV.map((k) => (
            <a
              key={k}
              href={
                "#" + (k === "home" ? "top" : k === "about" ? "trust" : k === "catalog" ? "prep" : k)
              }
            >
              {c.nav[k]}
            </a>
          ))}
        </div>
        <div className="ddi-footer-col">
          <h4>{c.footer.contactL}</h4>
          <a href={"mailto:" + DDI_DATA.email}>{DDI_DATA.email}</a>
          <a href={"tel:" + DDI_DATA.phone.replace(/[^0-9+]/g, "")}>{DDI_DATA.phone}</a>
          <span className="ddi-footer-addr">{DDI_DATA.address}</span>
        </div>
        <div className="ddi-footer-col">
          <h4>{c.footer.legal}</h4>
          <span className="ddi-footer-addr">{DDI_DATA.legalName}</span>
          <span className="ddi-footer-addr">{DDI_DATA.hq}</span>
          <a
            href="https://instagram.com/ddimperium"
            target="_blank"
            rel="noreferrer"
            className="ddi-footer-ig"
          >
            <DDIcon name="camera" size={15} stroke="currentColor" />
            {DDI_DATA.instagram}
          </a>
        </div>
      </div>
      <div className="ddi-container ddi-footer-bottom">
        <p className="ddi-footer-disclaimer">{c.footer.disclaimer}</p>
        <p className="ddi-footer-rights">© 2026 {DDI_DATA.company}. {c.footer.rights}</p>
      </div>
    </footer>
  );
}
