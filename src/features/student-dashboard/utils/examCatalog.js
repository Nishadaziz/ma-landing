import duolingoLogo from "../../../assets/logo/duolingo-logo.svg";
import ieltsLogo from "../../../assets/logo/ielts-logo.jpeg";
import pteLogo from "../../../assets/logo/pte-logo.jpg";
import toeflLogo from "../../../assets/logo/toefl-logo.svg";

// Shown to students on My Courses when they haven't enrolled in anything
// yet, so they can pick the exam they're preparing for.
export const EXAM_OPTIONS = [
  {
    key: "duolingo",
    label: "Duolingo",
    logo: duolingoLogo,
    desc: "Fast, affordable, and globally accepted.",
  },
  {
    key: "ielts",
    label: "IELTS",
    logo: ieltsLogo,
    desc: "Academic and General Training preparation.",
  },
  {
    key: "toefl",
    label: "TOEFL",
    logo: toeflLogo,
    desc: "One-on-one TOEFL iBT coaching.",
  },
  {
    key: "pte",
    label: "PTE",
    logo: pteLogo,
    desc: "One-on-one PTE Academic coaching.",
  },
];

// The courses shown once a student picks an exam above.
export const COURSES_BY_EXAM = {
  duolingo: [
    {
      label: "DET Guided Preparation",
      desc: "A complete skill-building program — best for strong score improvement, covering every DET topic.",
      to: "/programs/guided-preparation",
    },
    {
      label: "15 Days Crash Course",
      desc: "Intensive short-term preparation — ideal if your test date is coming up fast.",
      to: "/programs/15-days",
    },
    {
      label: "1 Month Program",
      desc: "A focused, fast-track plan for steady improvement over four weeks.",
      to: "/programs/1-month",
    },
  ],
  ielts: [
    {
      label: "Complete IELTS Preparation",
      desc: "24 live classes in a small batch of 7 students, guided by a Band 8 mentor.",
      to: "/programs/ielts-complete",
    },
    {
      label: "IELTS Reading & Listening Combined",
      desc: "A focused 1-month program covering just the Reading and Listening modules.",
      to: "/programs/ielts-reading-listening",
    },
  ],
  toefl: [
    {
      label: "TOEFL One-on-One Coaching",
      desc: "Personalized sessions covering Reading, Listening, Speaking, and Writing.",
      to: "/programs/toefl",
    },
  ],
  pte: [
    {
      label: "PTE One-on-One Coaching",
      desc: "Personalized sessions with speaking practice, timing control, and question-type mastery.",
      to: "/programs/pte",
    },
  ],
};
