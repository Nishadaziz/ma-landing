import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  MessageCircle,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-4 py-10 lg:px-8">
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          {/* Top CTA strip */}
          <div className="grid gap-6 border-b border-white/10 py-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                DuoMate Bangladesh
              </div>

             
             
            </div>

          </div>

          {/* Main footer */}
          <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:pr-6">
              <h3 className="text-2xl font-extrabold tracking-tight text-white">
                DuoMate
              </h3>
             

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  Duolingo
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  IELTS
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  PTE
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  Mock Test
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">
                Quick Links
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <Link
                  to="/"
                  className="block text-slate-300 transition hover:text-white"
                >
                  Home
                </Link>
                <Link
                  to="/programs"
                  className="block text-slate-300 transition hover:text-white"
                >
                  Programs
                </Link>
                <Link
                  to="/practice/duolingo"
                  className="block text-slate-300 transition hover:text-white"
                >
                  Duolingo Discount
                </Link>
                <Link
                  to="/book-test"
                  className="block text-slate-300 transition hover:text-white"
                >
                  Book a Test
                </Link>
                <Link
                  to="/free-learning"
                  className="block text-slate-300 transition hover:text-white"
                >
                  Free Learning
                </Link>
              </div>
            </div>

            {/* Programs */}
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">
                Programs
              </div>

              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <Link
                  to="/programs/21-days"
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <BookOpen size={18} className="mt-0.5 shrink-0" />
                  <span>21 Days Crash Course</span>
                </Link>

                <Link
                  to="/programs/3-months"
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <GraduationCap size={18} className="mt-0.5 shrink-0" />
                  <span>3 Months Complete Course</span>
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">
                Contact
              </div>

              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <a
                  href="mailto:info@duomatebd.com"
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <Mail size={18} className="mt-0.5 shrink-0" />
                  <span>info@duomatebd.com</span>
                </a>

                <a
                  href="tel:+8801300153200"
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <Phone size={18} className="mt-0.5 shrink-0" />
                  <span>+880 1300-153200</span>
                </a>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0" />
                  <span>Dhaka, Bangladesh</span>
                </div>

                <a
                  href="https://wa.me/8801300153200?text=Hi%20DuoMate!"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-bold text-white transition hover:bg-white/15"
                >
                  Chat on WhatsApp
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} DuoMate. All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <Link to="/programs" className="transition hover:text-white">
                Programs
              </Link>
              <Link to="/book-test" className="transition hover:text-white">
                Enroll
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}