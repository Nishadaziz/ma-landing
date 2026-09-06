import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
import DuolingoAPI from "../components/duolingoPage/DuolingoAPI";

export default function Duolingo() {
  return (
    <div className="space-y-6">
      <SEO
        title="Get 16% OFF on Duolingo English Test Registration | Duomate"
        description="Claim your exclusive DET discount code through WhatsApp."
        canonicalPath="/practice/duolingo"
        ogImage="https://www.duomatebd.com/og-duolingo-discount.png"
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-slate-600">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/" className="hover:text-slate-900 hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link to="/programs" className="hover:text-slate-900 hover:underline">
            Programs
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Duolingo</span>
        </div>
      </nav>

      <DuolingoAPI />
    </div>
  );
}
