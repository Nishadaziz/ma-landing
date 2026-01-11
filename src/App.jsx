import { useState } from "react";

import student1 from "./assets/reviews/student-1.jpeg";
import student2 from "./assets/reviews/student-2.jpeg";
import student3 from "./assets/reviews/student-3.jpeg";



const WHATSAPP_NUMBER = "8801300153200"; // no + sign
const WHATSAPP_MESSAGE =
  "Hi Meticulous Academy! I have a question about your courses.";

function App() {
  const [activeCourse, setActiveCourse] = useState(null);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  const courses = [
    {
      id: "crash",
      title: "10 Days Crash Course",
      price: "BDT 3,000",
      timeline: "10 classes (Friday off → total 11 days)",
      forWho: "Best for quick improvement and confidence boost.",
      includes: [
        "Speaking practice with guided corrections",
        "Common grammar fixes (daily mistakes)",
        "Vocabulary for daily conversation",
        "Pronunciation & fluency tips",
        "Short practice tasks after each class",
      ],
    },
    {
      id: "two-months",
      title: "2 Months Course",
      price: "BDT 6,000",
      timeline: "2 months structured program",
      forWho: "Best for building a strong foundation long-term.",
      includes: [
        "Speaking + listening practice (step-by-step)",
        "Grammar foundation (beginner to intermediate)",
        "Vocabulary building system",
        "Confidence-building activities",
        "Regular practice guidance and feedback",
      ],
    },
  ];

  function closeModal() {
    setActiveCourse(null);
  }

  return (
    <div>
      {/* NAVBAR */}
<div className="navbar">
  <div className="container nav-inner">
    <div className="brand">Meticulous Academy</div>

    <nav className="nav-links">
  <a className="nav-link" href="#courses">Courses</a>
  <a className="nav-link" href="#admission">Admission</a>

  <a className="nav-link" href="https://facebook.com/" target="_blank" rel="noreferrer">
    Facebook
  </a>

  <a className="nav-link" href="https://instagram.com/" target="_blank" rel="noreferrer">
    Instagram
  </a>

  <a className="nav-link" href={whatsappLink} target="_blank" rel="noreferrer">
    WhatsApp
  </a>
</nav>

  </div>
</div>


      {/* HERO SECTION */}
      <header className="hero">
        <div className="container hero-grid">
          <div>
            <span className="badge">English Proficiency Coaching • Bangladesh</span>

            <h1 className="h1">DuoMate by Nishad Aziz</h1>

            <p className="subtext">
              Improve speaking, grammar, vocabulary, and confidence with structured classes.
              Simple admission process. Learn at your own pace.
            </p>

           <div className="cta-row">
  <a className="btn btn-primary" href="#courses">
    View Courses
  </a>
  <a className="btn" href="#admission">
    Admission
  </a>
</div>

          </div>

          <div className="card">
            <div className="kpi">
              <div className="kpi-item">
                <div className="kpi-title">Fast Option</div>
                <div className="kpi-value">10 Days Crash Course</div>
              </div>

              <div className="kpi-item">
                <div className="kpi-title">Full Program</div>
                <div className="kpi-value">2 Months Course</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* COURSES SECTION */}
      <section id="courses" className="section">
        <div className="container">
          <h2 className="section-title">Courses</h2>
          <p className="section-subtitle">
            Tap “View details” to see timeline and what you’ll get in each course.
            If you need help, use the WhatsApp button in the corner.
          </p>

          <div className="grid-2">
            {courses.map((c) => (
              <div key={c.id} className="course-card">
                <div className="course-title">{c.title}</div>
                <div className="course-meta">
                  <span className="muted">Timeline:</span> {c.timeline}
                  <br />
                  <span className="muted">Fee:</span> {c.price}
                </div>

                <button className="btn btn-primary" onClick={() => setActiveCourse(c)}>
                  View details
                </button>

                <div className="note">{c.forWho}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* REVIEWS SECTION */}
<section id="reviews" className="section">
  <div className="container">
    <h2 className="section-title">Student Reviews</h2>
    <p className="section-subtitle">
      Real experiences from our students (results may vary).
    </p>

    <div className="reviews-grid">
      <div className="review-card">
        <div className="review-top">
          <img className="avatar" src={student1} alt="Student review" />
          <div>
            <div className="reviewer-name">Student Name</div>
            <div className="reviewer-meta">Course: 10 Days Crash Course</div>
          </div>
        </div>

        <p className="review-text">
          “Write your student’s comment here. Keep it short, clear, and believable.”
        </p>
      </div>

      <div className="review-card">
        <div className="review-top">
          <img className="avatar" src={student2} alt="Student review" />
          <div>
            <div className="reviewer-name">Student Name</div>
            <div className="reviewer-meta">Course: 2 Months Course</div>
          </div>
        </div>

        <p className="review-text">
          “Write another comment here. Example: ‘My speaking confidence improved a lot!’”
        </p>
      </div>

      <div className="review-card">
        <div className="review-top">
          <img className="avatar" src={student3} alt="Student review" />
          <div>
            <div className="reviewer-name">Student Name</div>
            <div className="reviewer-meta">Course: 2 Months Course</div>
          </div>
        </div>

        <p className="review-text">
          “Write another comment here. Example: ‘My speaking confidence improved a lot!’”
        </p>
      </div>
      
    </div>
  </div>
</section>


      {/* ADMISSION SECTION */}
<section id="admission" className="section">
  <div className="container">
    <h2 className="section-title">Admission</h2>
    <p className="section-subtitle">
      Pay the course fee via bKash and then confirm your payment on WhatsApp.
    </p>

    <div className="admission-box">
      <p>
        <span className="muted">bKash (Personal): </span>
        <span className="highlight">01623978532</span>
      </p>

      <ol className="steps">
        <li>Open bKash app → Send Money</li>
        <li>Send the course fee to: <b>01623978532</b></li>
        <li>In “Reference”, write: <b>Your Name + Course Type</b></li>
        <li>After payment, click the button below and send your <b>Transaction ID</b></li>
      </ol>

      <div className="cta-row" style={{ marginTop: 14 }}>
        <a className="btn" href="#courses">
          Back to Courses
        </a>

        <a
          className="btn btn-primary"
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            "Hi Meticulous Academy! I have paid via bKash.\n\nName: \nCourse: \nAmount: \nTransaction ID (TrxID): \nPayment Number used: \n\nPlease confirm my admission."
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          I have paid (Confirm on WhatsApp)
        </a>
      </div>

      <p className="note">
        Tip: Keep a screenshot of your bKash payment until your admission is confirmed.
      </p>
    </div>
  </div>
</section>


      {/* MODAL */}
      {activeCourse && (
        <div className="modal-overlay" onClick={closeModal} role="presentation">
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog">
            <div className="modal-header">
              <div>
                <div className="modal-title">{activeCourse.title}</div>
                <div className="muted" style={{ marginTop: 4 }}>
                  Timeline: {activeCourse.timeline} • Fee: {activeCourse.price}
                </div>
              </div>

              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="muted">{activeCourse.forWho}</div>

              <ul className="list">
                {activeCourse.includes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="muted" style={{ marginTop: 12 }}>
                For admission/payment steps, message us using the WhatsApp button in the corner.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        WhatsApp
      </a>

      {/* FOOTER */}
<footer className="footer">
  <div className="container">
    © {new Date().getFullYear()} Meticulous Academy • Dhaka • Bangladesh
    <p className="footer-contact">
  📧 <a href="mailto:info@duomatebd.com">info@duomatebd.com</a>
</p>
  </div>
  

</footer>

    </div>
  );
}

export default App;
