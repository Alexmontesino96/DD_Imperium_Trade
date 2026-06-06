"use client";

import { FormEvent, useEffect, useState } from "react";
import { data as DDI_DATA, type Copy, type Lang } from "@/lib/ddi-data";
import { DDIcon } from "./ddi-ui";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SampleModal({
  c,
  lang,
  open,
  onClose,
}: {
  c: Copy;
  lang: Lang;
  open: boolean;
  onClose: () => void;
}) {
  const m = c.contact.sampleModal;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail("");
      setDone(false);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const valid = emailRe.test(email);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (valid) setDone(true);
  };

  return (
    <div className="ddi-modal-scrim" onClick={onClose}>
      <div
        className="ddi-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="ddi-modal-close" onClick={onClose} aria-label="close">
          <DDIcon name="close" size={18} />
        </button>
        <div className="ddi-modal-head">
          <h3 className="ddi-modal-title">{m.title}</h3>
          <p className="ddi-modal-sub">{m.sub}</p>
        </div>
        <div className="ddi-sample-table">
          <div className="ddi-sample-row ddi-sample-head">
            <span>{m.col.product}</span>
            <span>{m.col.category}</span>
            <span>{m.col.brand}</span>
          </div>
          {DDI_DATA.sampleCatalog.map((row, i) => (
            <div className="ddi-sample-row" key={i}>
              <span className="ddi-sample-prod">
                <span className="ddi-sample-thumb">
                  <DDIcon name="source" size={15} stroke="var(--fg-4)" />
                </span>
                {row.product}
              </span>
              <span className="ddi-sample-cat">{row.cat[lang]}</span>
              <span className="ddi-sample-mkt">{row.brand}</span>
            </div>
          ))}
        </div>
        {done ? (
          <div className="ddi-sample-gate ddi-sample-gate--done">
            <DDIcon name="check" size={22} stroke="var(--ok-soft)" />
            <span>{c.sampleModalDone}</span>
          </div>
        ) : (
          <form className="ddi-sample-gate" onSubmit={onSubmit}>
            <span className="ddi-sample-gate-label">{m.gate}</span>
            <div className="ddi-sample-gate-row">
              <input
                className="ddi-input"
                value={email}
                type="email"
                placeholder="tu@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="ddi-btn ddi-btn-primary" disabled={!valid}>
                {m.unlock}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
