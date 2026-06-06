"use client";

import { FormEvent, RefObject, useState } from "react";
import { data as DDI_DATA, type Copy } from "@/lib/ddi-data";
import { DDIcon, Field, PillChoice, SectionLabel } from "./ddi-ui";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SellerForm({ c }: { c: Copy }) {
  const f = c.contact.seller;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    q1: "",
    q2: "",
    q3: "",
  });
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof typeof form>(k: K) => (v: (typeof form)[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const errs = {
    name: form.name.trim().length < 2,
    email: !emailRe.test(form.email),
    phone: form.phone.trim().length < 6,
    q1: !form.q1,
    q2: !form.q2,
    q3: !form.q3,
  };
  const valid = !Object.values(errs).some(Boolean);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="ddi-form-success">
        <div className="ddi-success-icon">
          <DDIcon name="check" size={30} stroke="var(--ok-soft)" />
        </div>
        <h3 className="ddi-success-title">{f.success}</h3>
        <p className="ddi-success-sub">{f.successSub}</p>
        <a
          className="ddi-btn ddi-btn-whatsapp ddi-btn-lg"
          href={"https://wa.me/" + DDI_DATA.whatsapp.replace(/[^0-9]/g, "")}
          target="_blank"
          rel="noreferrer"
        >
          <DDIcon name="whatsapp" size={19} />
          {f.whatsapp}
        </a>
      </div>
    );
  }

  const showErr = (k: keyof typeof errs) => touched && errs[k];

  return (
    <form className="ddi-seller-form" onSubmit={submit} noValidate>
      <div className="ddi-pathtag ddi-pathtag--seller">{f.tag}</div>
      <h3 className="ddi-path-title">{f.title}</h3>
      <p className="ddi-path-sub">{f.sub}</p>

      <div className="ddi-form-rows">
        <div className="ddi-form-2col">
          <Field label={f.name}>
            <input
              className={"ddi-input" + (showErr("name") ? " err" : "")}
              value={form.name}
              onChange={(e) => set("name")(e.target.value)}
              placeholder="—"
            />
          </Field>
          <Field label={f.phone}>
            <input
              className={"ddi-input" + (showErr("phone") ? " err" : "")}
              value={form.phone}
              onChange={(e) => set("phone")(e.target.value)}
              placeholder="+1 …"
            />
          </Field>
        </div>
        <Field label={f.email}>
          <input
            className={"ddi-input" + (showErr("email") ? " err" : "")}
            value={form.email}
            type="email"
            onChange={(e) => set("email")(e.target.value)}
            placeholder="tu@email.com"
          />
        </Field>

        <Field label={f.q1}>
          <PillChoice options={f.q1opts} value={form.q1} onChange={set("q1")} />
        </Field>
        <Field label={f.q2}>
          <PillChoice options={f.q2opts} value={form.q2} onChange={set("q2")} />
        </Field>
        <Field label={f.q3}>
          <PillChoice options={f.q3opts} value={form.q3} onChange={set("q3")} />
        </Field>
      </div>

      {touched && !valid && <p className="ddi-form-hint">{c.formHint}</p>}

      <div className="ddi-form-actions">
        <button type="submit" className="ddi-btn ddi-btn-primary ddi-btn-lg">
          {f.submit}
          <DDIcon name="arrow" size={18} />
        </button>
        <a
          className="ddi-btn ddi-btn-whatsapp-outline ddi-btn-lg"
          href={"https://wa.me/" + DDI_DATA.whatsapp.replace(/[^0-9]/g, "")}
          target="_blank"
          rel="noreferrer"
        >
          <DDIcon name="whatsapp" size={18} />
          {f.whatsapp}
        </a>
      </div>
    </form>
  );
}

function PartnerCard({ c }: { c: Copy }) {
  const p = c.contact.partner;
  return (
    <aside className="ddi-partner-card ddi-partner-card--col">
      <div className="ddi-pathtag ddi-pathtag--partner">{p.tag}</div>
      <h3 className="ddi-path-title">{p.title}</h3>
      <p className="ddi-path-sub">{p.sub}</p>
      <ul className="ddi-partner-bullets">
        {(["b1", "b2", "b3"] as const).map((b) => (
          <li key={b}>
            <DDIcon name="badgeCheck" size={17} stroke="var(--brand-mid)" />
            {p[b]}
          </li>
        ))}
      </ul>
      <div className="ddi-partner-actions">
        <a className="ddi-btn ddi-btn-outline ddi-btn-lg" href="mailto:alianzas@ddimperium.com">
          <DDIcon name="mail" size={18} />
          {p.emailCta}
        </a>
        <a
          className="ddi-btn ddi-btn-ghost ddi-btn-lg"
          href="mailto:alianzas@ddimperium.com?subject=Reuni%C3%B3n"
        >
          <DDIcon name="calendar" size={18} />
          {p.meetCta}
        </a>
      </div>
    </aside>
  );
}

export function Contact({
  c,
  partnerRef,
}: {
  c: Copy;
  partnerRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <section className="ddi-section ddi-contact" id="contact">
      <div className="ddi-container">
        <div className="ddi-section-head">
          <SectionLabel>{c.contact.label}</SectionLabel>
          <h2 className="ddi-h2">{c.contact.title}</h2>
          <p className="ddi-section-sub">{c.contact.sub}</p>
        </div>
        <div className="ddi-contact-layout">
          <div className="ddi-contact-seller">
            <SellerForm c={c} />
          </div>
          <div className="ddi-contact-partner" ref={partnerRef}>
            <PartnerCard c={c} />
          </div>
        </div>
      </div>
    </section>
  );
}
