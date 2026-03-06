import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import ScrollManager from "../components/ScrollManager";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Programs from "../pages/Programs";
import FreeLearning from "../pages/FreeLearning";
import BookTest from "../pages/BookTest";
import Program21Days from "../components/Program21Days";
import Program3Months from "../components/Program3Months";
import Duolingo from "../pages/Duolingo";
import CheckoutDuolingo from "../pages/CheckoutDuolingo";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollManager />
      <Routes>
        {/* New site with layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/21-days" element={<Program21Days />} />
          <Route path="/programs/3-months" element={<Program3Months />} />
          <Route path="/free-learning" element={<FreeLearning />} />
          <Route path="/book-test" element={<BookTest />} />
         <Route path="/practice/duolingo" element={<Duolingo />} />
        <Route path="/checkout/duolingo" element={<CheckoutDuolingo />} />

        </Route>
        {/* Old site (untouched) */}
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
