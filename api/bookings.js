import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Basic CORS (safe for your own site)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const {
      name,
      phone,
      service,
      preferred_date = null,
      preferred_slot = null,
      message = null,
    } = body || {};

    if (!name || !phone || !service) {
      return res.status(400).json({ error: "name, phone, service are required" });
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([{ name, phone, service, preferred_date, preferred_slot, message }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });

    return res.status(201).json({ ok: true, booking: data });
  } catch  {
    return res.status(500).json({ error: "Server error" });
  }
}