import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

const baseLink =
  "rounded-lg px-4 py-2 text-[15px] font-semibold text-slate-700 transition-colors hover:bg-amber-500 hover:text-white";
const activeLink = "bg-amber-500 text-white";

function MenuLink({ to, children, end = false, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-neutral-200/70 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2 lg:px-8">
        <Link to="/" className="flex items-center shrink-0" onClick={closeMobileMenu}>
          <img
            src={logo}
            alt="DuoMate Logo"
            className="h-14 w-auto object-contain md:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <MenuLink to="/" end>Home</MenuLink>
          <MenuLink to="/programs">Courses</MenuLink>
          <MenuLink to="/practice/duolingo">Discounts</MenuLink>
          <MenuLink to="/free-learning">Free Learning</MenuLink>
          <MenuLink to="/book-test">Book Test</MenuLink>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/8801300153200?text=Hi%20DuoMate!%20I%20have%20a%20question."
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-green-600 hover:text-white md:inline-flex"
          >
            Contact
          </a>

          <Link
            to="/programs/21-days"
            className="hidden rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-green-500 hover:text-white md:inline-flex"
          >
            Enroll Now
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-4">
            <MenuLink to="/" end onClick={closeMobileMenu}>Home</MenuLink>
            <MenuLink to="/programs" onClick={closeMobileMenu}>Courses</MenuLink>
            <MenuLink to="/practice/duolingo" onClick={closeMobileMenu}>Discounts</MenuLink>
            <MenuLink to="/free-learning" onClick={closeMobileMenu}>Free Learning</MenuLink>
            <MenuLink to="/book-test" onClick={closeMobileMenu}>Book Test</MenuLink>

            <a
              href="https://wa.me/8801300153200?text=Hi%20DuoMate!%20I%20have%20a%20question."
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-green-600 hover:text-white"
            >
              Contact
            </a>

            <Link
              to="/programs/21-days"
              onClick={closeMobileMenu}
              className="rounded-md border border-slate-300 px-4 py-3 text-center text-sm font-bold text-slate-700 transition-colors hover:bg-green-500 hover:text-white"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}