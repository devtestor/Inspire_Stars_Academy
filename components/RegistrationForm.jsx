"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const sportOptions = [
  "Football",
  "Basketball",
  "Swimming",
  "Table Tennis",
  "Karate",
  "Taekwondo",
  "Badminton",
];

const ageGroupOptions = ["Under 8", "Under 10", "Under 12", "Under 14", "Under 16", "Under 18"];
const experienceOptions = ["Beginner", "Developing", "Competitive", "School Team", "Elite Pathway"];

const initialState = {
  athleteName: "",
  athleteAge: "",
  ageGroup: ageGroupOptions[2],
  guardianName: "",
  guardianPhone: "",
  guardianEmail: "",
  sportInterest: sportOptions[0],
  experienceLevel: experienceOptions[0],
  schoolName: "",
  medicalNotes: "",
  goals: "",
  consent: false,
};

export default function RegistrationForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [notice, setNotice] = useState("");

  const isDisabled = status === "loading";
  const sportLabel = useMemo(() => `${form.sportInterest} registration`, [form.sportInterest]);

  const update = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setNotice("");

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setNotice(result.error || "Please review the registration details and try again.");
        return;
      }

      setStatus("success");
      setNotice("Registration request received. The academy team can follow up with the next steps.");
      setForm(initialState);
    } catch {
      setStatus("error");
      setNotice("The registration service is temporarily unavailable.");
    }
  };

  return (
    <form className="registration-form" onSubmit={submit}>
      <div className="registration-form-head">
        <span>Academy Registration</span>
        <strong>{sportLabel}</strong>
        <p>Share the athlete profile and parent or guardian details. The academy can review placement and program fit from here.</p>
      </div>

      <label className="field">
        <span>Athlete full name</span>
        <input name="athleteName" value={form.athleteName} onChange={update} autoComplete="name" required />
      </label>

      <label className="field">
        <span>Athlete age</span>
        <input name="athleteAge" type="number" min="4" max="19" value={form.athleteAge} onChange={update} inputMode="numeric" required />
      </label>

      <label className="field">
        <span>Age category</span>
        <select name="ageGroup" value={form.ageGroup} onChange={update}>
          {ageGroupOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Primary sport</span>
        <select name="sportInterest" value={form.sportInterest} onChange={update}>
          {sportOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Parent or guardian</span>
        <input name="guardianName" value={form.guardianName} onChange={update} autoComplete="name" required />
      </label>

      <label className="field">
        <span>Guardian phone</span>
        <input name="guardianPhone" value={form.guardianPhone} onChange={update} autoComplete="tel" required />
      </label>

      <label className="field">
        <span>Guardian email</span>
        <input name="guardianEmail" type="email" value={form.guardianEmail} onChange={update} autoComplete="email" required />
      </label>

      <label className="field">
        <span>Experience level</span>
        <select name="experienceLevel" value={form.experienceLevel} onChange={update}>
          {experienceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="field field-wide">
        <span>School name</span>
        <input name="schoolName" value={form.schoolName} onChange={update} autoComplete="organization" />
      </label>

      <label className="field field-wide">
        <span>Athlete goals</span>
        <textarea name="goals" value={form.goals} onChange={update} rows={5} required />
      </label>

      <label className="field field-wide">
        <span>Medical notes or support needs</span>
        <textarea name="medicalNotes" value={form.medicalNotes} onChange={update} rows={4} />
      </label>

      <label className="registration-consent field-wide">
        <input name="consent" type="checkbox" checked={form.consent} onChange={update} required />
        <span>I confirm these details are accurate and I am authorized to submit this athlete registration.</span>
      </label>

      <button className="btn primary" type="submit" disabled={isDisabled}>
        {isDisabled ? "Submitting..." : "Submit Registration"} <ArrowRight size={18} />
      </button>

      {notice && (
        <p className={`form-status ${status}`}>
          {status === "success" && <CheckCircle2 size={18} />}
          {notice}
        </p>
      )}
    </form>
  );
}
