"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { copy, data as DDI_DATA, type Lang } from "@/lib/ddi-data";
import { DDIcon } from "@/components/ddi-ui";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Credibility } from "@/components/Credibility";
import { ProcessBand } from "@/components/ProcessBand";
import { PrepCenter } from "@/components/PrepCenter";
import { Trust } from "@/components/Trust";
import { SocialProof } from "@/components/SocialProof";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [lang, setLangState] = useState<Lang>("es");
  const [aurora, setAuroraState] = useState(false);
  const partnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLang = localStorage.getItem("ddi-lang") as Lang | null;
    if (storedLang === "es" || storedLang === "en") setLangState(storedLang);
    setAuroraState(localStorage.getItem("ddi-aurora") === "on");
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("ddi-lang", l);
  }, []);

  const setAurora = useCallback((on: boolean) => {
    setAuroraState(on);
    if (typeof window !== "undefined")
      localStorage.setItem("ddi-aurora", on ? "on" : "off");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const c = copy[lang];

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 70,
        behavior: "smooth",
      });
    }
  }, []);

  const onCatalog = useCallback(() => scrollTo("contact"), [scrollTo]);
  const onPartner = useCallback(() => {
    scrollTo("contact");
    setTimeout(() => {
      const el = partnerRef.current;
      if (!el) return;
      el.classList.add("ddi-flash");
      setTimeout(() => el.classList.remove("ddi-flash"), 1400);
    }, 480);
  }, [scrollTo]);

  return (
    <div
      className="ddi-root"
      data-theme="dark"
      data-accent="champagne"
      data-bg="malla"
      data-aurora={aurora ? "on" : "off"}
    >
      <Header
        c={c}
        lang={lang}
        setLang={setLang}
        onCatalog={onCatalog}
        onPartner={onPartner}
        aurora={aurora}
        setAurora={setAurora}
      />
      <main>
        <Hero c={c} aurora={aurora} />
        <Credibility c={c} />
        <ProcessBand c={c} lang={lang} />
        <PrepCenter c={c} onPartner={onPartner} />
        <Trust c={c} lang={lang} />
        <SocialProof c={c} lang={lang} />
        <Contact c={c} partnerRef={partnerRef} />
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
