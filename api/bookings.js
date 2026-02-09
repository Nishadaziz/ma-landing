import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      phone,
      service,
      preferred_date = null,
      preferred_slot = null,
      message = null,
    } = req.body || {};

    // Minimal validation
    if (!name || !phone || !service) {
      return res.status(400).json({ error: "name, phone, service are required" });
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([{ name, phone, service, preferred_date, preferred_slot, message }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ ok: true, booking: data });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}
