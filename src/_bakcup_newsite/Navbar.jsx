import { NavLink } from "react-router-dom";

const linkBase =
  "text-sm font-semibold transition-colors hover:text-slate-900";
const linkInactive = "text-slate-600";
const linkActive =
  "text-slate-900 underline underline-offset-8 decoration-2";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? linkActive : linkInactive}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-900" />
          <div className="leading-tight">
            <div className="text-sm font-extrabold text-slate-900">DuoMate</div>
            <div className="text-xs text-slate-500">English Coaching • BD</div>
          </div>
        </NavLink>

        {/* Links (desktop) */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/practice/duolingo">Duolingo</NavItem>
          <NavItem to="/practice/ielts">IELTS</NavItem>
          <NavItem to="/practice/pte">PTE</NavItem>
          <NavItem to="/free-learning">Free Learning</NavItem>
          <NavItem to="/book-test">Book Test</NavItem>
        </nav>

        {/* Right CTA */}
        <a
          href="https://wa.me/8801300153200?text=Hi%20DuoMate!%20I%20have%20a%20question."
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
