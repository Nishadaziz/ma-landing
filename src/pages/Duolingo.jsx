import { Link } from "react-router-dom";
import DuolingoAPI from "../components/duolingoPage/DuolingoAPI";

export default function Duolingo() {
  return (
    <div className="space-y-6">
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
