"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const initialState = {
  intent: "Join the Academy",
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm({ defaultIntent = "Join the Academy" }) {
  const [form, setForm] = useState({ ...initialState, intent: defaultIntent });
  const [status, setStatus] = useState("idle");
  const [notice, setNotice] = useState("");

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setNotice(result.error || "Please check the form and try again.");
        return;
      }

      setStatus("success");
      setNotice("Message received. The academy team can follow up from here.");
      setForm({ ...initialState, intent: defaultIntent });
    } catch {
      setStatus("error");
      setNotice("The contact service is temporarily unavailable.");
    }
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <label className="field">
        <span>Request type</span>
        <select name="intent" value={form.intent} onChange={update}>
          <option>Join the Academy</option>
          <option>Partner With Us</option>
          <option>School Partnership</option>
          <option>Sponsor Support</option>
          <option>International Opportunity</option>
        </select>
      </label>
      <label className="field">
        <span>Full name</span>
        <input name="name" value={form.name} onChange={update} autoComplete="name" required />
      </label>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" required />
      </label>
      <label className="field">
        <span>Phone</span>
        <input name="phone" value={form.phone} onChange={update} autoComplete="tel" />
      </label>
      <label className="field field-wide">
        <span>Message</span>
        <textarea name="message" value={form.message} onChange={update} rows={6} required />
      </label>
      <button className="btn primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Request"} <ArrowRight size={18} />
      </button>
      {notice && <p className={`form-status ${status}`}>{notice}</p>}
    </form>
  );
}
