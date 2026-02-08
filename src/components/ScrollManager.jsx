import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ Routes where you WANT to preserve scroll
    const preserveScrollRoutes = ["/programs"];

    const shouldPreserve = preserveScrollRoutes.includes(pathname);

    if (!shouldPreserve) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // If "instant" is not supported in your browser, use:
      // window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
