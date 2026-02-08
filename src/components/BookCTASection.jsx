import { Link } from "react-router-dom";

export default function BookCTASection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-360 px-6">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
          Book Your DET With Confidence
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1 */}
          <Link
            to="/book-test"
            className="group rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              Take the Test at Our Center
            </h3>
            <p className="mb-6 text-gray-600">
              Get a distraction-free environment, technical support, and expert
              guidance by taking the Duolingo English Test at our certified
              center.
            </p>
            <span className="font-semibold text-blue-600 group-hover:underline">
              Book Now →
            </span>
          </Link>

          {/* Card 2 */}
          <Link
            to="/book-test"
            className="group rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              Get Discounts on DET Booking
            </h3>
            <p className="mb-6 text-gray-600">
              Save money with exclusive discounts when you book your Duolingo
              English Test through our platform.
            </p>
            <span className="font-semibold text-blue-600 group-hover:underline">
              Get Discount →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
