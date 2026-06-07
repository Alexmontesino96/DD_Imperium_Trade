"use client";

import { type Copy } from "@/lib/ddi-data";
import { SectionLabel } from "./ddi-ui";

export function ProcessBand({ c, lang }: { c: Copy; lang: "es" | "en" }) {
  void c;

  return (
    <section className="ddi-section ddi-band-sec" id="proceso">
      <div className="ddi-container">
        <div className="ddi-band-head">
          <SectionLabel>
            {lang === "es" ? "El proceso en movimiento" : "The process in motion"}
          </SectionLabel>
        </div>
      </div>
      <div className="ddi-vid-frame">
        <video
          className="ddi-vid-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/prep-warehouse-poster.jpg"
          aria-label={
            lang === "es"
              ? "El proceso en movimiento"
              : "The process in motion"
          }
        >
          <source src="/prep-warehouse.webm" type="video/webm" />
          <source src="/prep-warehouse.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
