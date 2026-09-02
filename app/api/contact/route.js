const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = {
    intent: String(body.intent || "").trim(),
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    phone: String(body.phone || "").trim(),
    message: String(body.message || "").trim(),
    source: "inspirestarsacademyrwanda.com",
  };

  if (!payload.intent || !payload.name || !emailPattern.test(payload.email) || payload.message.length < 8) {
    return Response.json({ error: "Please provide your name, a valid email and a clear message." }, { status: 422 });
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return Response.json({ error: "The message service is temporarily unavailable." }, { status: 502 });
    }
  } else {
    console.info("ISAR contact submission", payload);
  }

  return Response.json({ ok: true });
}
