import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/facebookPixel";

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

export default function FacebookPixel() {
  const location = useLocation();

  useEffect(() => {
    if (!PIXEL_ID) {
      console.warn("Meta Pixel ID is missing");
      return;
    }

    if (window.fbq) return;

    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script");

    window.fbq("init", PIXEL_ID);
    trackPageView();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [location.pathname, location.search]);

  return null;
}