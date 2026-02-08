import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-4 lg:px-8 py-10">

        <Outlet />
      </main>

      <footer className="border-t">
<div className="mx-auto max-w-[1440px] px-4 lg:px-8 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} DuoMate • Dhaka • Bangladesh •{" "}
          <a className="underline" href="mailto:info@duomatebd.com">
            info@duomatebd.com
          </a>
        </div>
      </footer>
    </div>
  );
}
