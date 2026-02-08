import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<div className="p-10 text-3xl font-bold flex justify-center text-slate-300 mt-20">Content goes here</div>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
