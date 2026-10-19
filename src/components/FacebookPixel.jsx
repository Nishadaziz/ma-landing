import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/facebookPixel";

// index.html initializes the pixel and tracks the initial page load.
let lastTrackedUrl = window.location.pathname + window.location.search;

export default function FacebookPixel() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const url = pathname + search;
    if (url === lastTrackedUrl || !window.fbq) return;

    trackPageView();
    lastTrackedUrl = url;
  }, [pathname, search]);

  return null;
}
