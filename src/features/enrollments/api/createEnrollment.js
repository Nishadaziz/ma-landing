import { supabase } from "../../../lib/supabase";
import { trackLead, trackCustomEvent } from "../../../lib/facebookPixel";

export async function createEnrollment(payload) {
  const { error } = await supabase.from("enrollments").insert([payload]);

  if (error) {
    throw error;
  }

  trackLead({
    content_name: payload.course_name || "Enrollment",
    content_category: payload.course_slug || "course",
    source: "createEnrollment",
    payment_method: payload.payment_method || "",
    value: payload.payment_amount || 0,
    currency: "BDT",
    status: payload.status || "pending",
  });

  trackCustomEvent("EnrollmentCreated", {
    course_name: payload.course_name || "Enrollment",
    course_slug: payload.course_slug || "",
    payment_method: payload.payment_method || "",
    payment_amount: payload.payment_amount || 0,
    currency: "BDT",
    status: payload.status || "pending",
  });

  return true;
}