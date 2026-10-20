import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function VisitTracker({ enabled }) {
  const { pathname } = useLocation();
  const lastPath = useRef(null);

  useEffect(() => {
    if (!enabled || /^\/(admin|auth|student|my-courses)(\/|$)/.test(pathname)) {
      lastPath.current = null;
      return;
    }
    if (lastPath.current === pathname) return;
    const entry = lastPath.current === null;
    lastPath.current = pathname;
    // Store a random browser identifier, never an email, IP, or full referrer URL.
    let visitorId;
    try {
      visitorId = localStorage.getItem("duomate-visitor-id");
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("duomate-visitor-id", visitorId);
      }
    } catch {
      visitorId = crypto.randomUUID();
    }
    let source = "Direct";
    try {
      const campaign = new URLSearchParams(window.location.search).get("utm_source");
      const referrer = document.referrer ? new URL(document.referrer) : null;
      const incoming = entry ? (campaign?.slice(0, 100) ||
        (referrer && referrer.hostname !== window.location.hostname ? referrer.hostname.slice(0, 100) : null)) : null;
      if (incoming) sessionStorage.setItem("duomate-visit-source", incoming);
      source = incoming || sessionStorage.getItem("duomate-visit-source") || "Direct";
    } catch { /* Tracking must never interrupt browsing. */ }
    const ua = navigator.userAgent;
    const device = /iPad|Tablet|Android(?!.*Mobile)/i.test(ua) ||
      (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)
      ? "Tablet" : /Mobi|iPhone|Android/i.test(ua) ? "Mobile" : "Desktop";
    void supabase.from("site_visits").insert({
      visitor_id: visitorId, path: pathname.slice(0, 500), source, device,
    }).then(() => {}, () => {});
  }, [enabled, pathname]);

  return null;
}
