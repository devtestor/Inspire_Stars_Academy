const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value) {
  return String(value || "").trim();
}

export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = {
    athleteName: text(body.athleteName),
    athleteAge: text(body.athleteAge),
    ageGroup: text(body.ageGroup),
    guardianName: text(body.guardianName),
    guardianPhone: text(body.guardianPhone),
    guardianEmail: text(body.guardianEmail),
    sportInterest: text(body.sportInterest),
    experienceLevel: text(body.experienceLevel),
    schoolName: text(body.schoolName),
    goals: text(body.goals),
    medicalNotes: text(body.medicalNotes),
    consent: Boolean(body.consent),
    source: "academy-registration",
  };

  if (
    !payload.athleteName ||
    !payload.athleteAge ||
    !payload.guardianName ||
    !payload.guardianPhone ||
    !emailPattern.test(payload.guardianEmail) ||
    payload.goals.length < 12 ||
    !payload.consent
  ) {
    return Response.json({ error: "Please complete the athlete, guardian and goals fields before submitting." }, { status: 422 });
  }

  try {
    const webhookUrl = process.env.REGISTRATION_WEBHOOK_URL || process.env.CONTACT_WEBHOOK_URL;

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return Response.json({ error: "The registration service is temporarily unavailable." }, { status: 502 });
      }
    } else {
      console.info("ISAR registration submission", payload);
    }
  } catch {
    return Response.json({ error: "The registration service is temporarily unavailable." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
