import { supabase } from "../../../lib/supabase";
import {
  trackLead,
  trackCustomEvent,
  trackCompleteRegistration,
} from "../../../lib/facebookPixel";

export async function createEnrollment(payload) {
  const { error } = await supabase.from("enrollments").insert([payload]);

  if (error) {
    throw error;
  }

  if (payload.course_slug === "duolingo-15-days-crash-course") {
    trackCompleteRegistration({
      content_name: payload.course_name,
      content_ids: [payload.course_slug],
      course_slug: payload.course_slug,
      currency: "BDT",
      value: payload.payment_amount || 0,
      status: true,
      enrollment_status: payload.status || "pending",
    });
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
