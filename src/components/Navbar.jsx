import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const baseLink =
  "rounded-lg px-4 py-2 text-base font-semibold text-slate-700 hover:bg-amber-500 transition-colors";
const activeLink = "bg-amber-500 text-white";

function MenuLink({ to, children, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-neutral-200/70 backdrop-blur-md shadow-lg ">
      <div className="flex w-full items-center justify-between gap-4">

        <Link to="/" className="ml-12 flex items-center">
          <img
            src={logo}
            alt="DuoMate Logo"
            className="ml-4 mt-1 h-24 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <MenuLink to="/" end>Home</MenuLink>
          <MenuLink to="/programs">Programs</MenuLink>
          <MenuLink to="/practice/duolingo">Duolingo</MenuLink>
          <MenuLink to="/free-learning">Free Learning</MenuLink>
          <MenuLink to="/book-test">Book Test</MenuLink>
        </nav>

        <div className="flex mr-8 items-center gap-3">
          <a
            href="https://wa.me/8801300153200?text=Hi%20DuoMate!%20I%20have%20a%20question."
            target="_blank"
            rel="noreferrer"
            className="hidden border border-slate-300 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-green-600 hover:text-white md:inline-flex"
          >
            Contact
          </a>

          <Link
            to="/book-test"
            className="rounded-md border border-slate-300  px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-green-500 hover:text-white"
          >
            Enroll Now
          </Link>
        </div>
      </div>

      <div className="border-t bg-white px-8 md:hidden">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto py-2">
          <MenuLink to="/" end>Home</MenuLink>
          <MenuLink to="/programs">Programs</MenuLink>
          <MenuLink to="/practice/duolingo">Duolingo</MenuLink>
          <MenuLink to="/free-learning">Free Learning</MenuLink>
          <MenuLink to="/book-test">Book Test</MenuLink>
        </div>
      </div>
    </header>
  );
}
