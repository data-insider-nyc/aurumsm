/* ============================================================
   Vercel Serverless Function — Contact Form handler
   Receives JSON from contact.html and sends email via Resend.

   SETUP (one-time):
   1. Sign up at https://resend.com (free: 3,000 emails/month)
   2. Add & verify aurumsm.com as a sending domain in Resend
   3. Create an API key in the Resend dashboard
   4. In Vercel project settings → Environment Variables, add:
        RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxx
   5. Set formEndpoint: "/api/contact" in js/data.js
   ============================================================ */

export const config = { runtime: "edge" };

const ALLOWED_ORIGIN = "https://aurumsm.com";
const TO_ADDRESS = "Sophia@aurumsm.com";
const FROM_ADDRESS = "Aurum Contact Form <contact@aurumsm.com>";

export default async function handler(req) {
  const origin = req.headers.get("origin") ?? "";

  // ── CORS preflight ─────────────────────────────────────────
  const corsHeaders = {
    "Access-Control-Allow-Origin":
      origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  // ── Parse body ─────────────────────────────────────────────
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ── Honeypot (bot trap) ────────────────────────────────────
  // Return 200 silently so bots think they succeeded.
  if (body.companyTrap) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ── Server-side validation ─────────────────────────────────
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || message.length < 12) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Basic email format guard
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    console.error("[contact] RESEND_API_KEY is not set");
    return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ── Build email ────────────────────────────────────────────
  const roleLabel =
    {
      sponsor: "Sponsor / Brand",
      player: "Golfer seeking representation",
      media: "Media / Press",
      other: "Other",
    }[body.role] ??
    body.role ??
    "Unknown";

  const lines = [
    `From: ${name} <${email}>`,
    `Role: ${roleLabel}`,
    body.playerName ? `Player of interest: ${body.playerName}` : null,
    "",
    message,
    "",
    "─".repeat(48),
    `Page: ${body.page ?? ""}`,
    `Time: ${body.submittedAt ?? new Date().toISOString()}`,
    `Lang: ${body.lang ?? "en"}`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const subject = [
    "Aurum Inquiry",
    `— ${roleLabel}`,
    body.playerName ? ` (${body.playerName})` : "",
  ].join("");

  // ── Send via Resend REST API ───────────────────────────────
  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      reply_to: email,
      subject,
      text: lines,
    }),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text();
    console.error("[contact] Resend error:", resendRes.status, errText);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
