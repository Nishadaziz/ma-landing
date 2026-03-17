import { BookOpen, Headphones, Mic, PenSquare } from "lucide-react";
import student1 from "../../assets/testimonials/student1.png";
import student2 from "../../assets/testimonials/student2.png";
import student3 from "../../assets/testimonials/student3.png";

export const students = [
  {
    name: "Rakib Hasan",
    meta: "DET Student",
    score: "130",
    image: student1,
    quote:
      "Structured class routine এবং real exam sample দেখে preparation অনেক clear হয়ে গিয়েছিল।",
  },
  {
    name: "Nusrat Jahan",
    meta: "Duolingo English Test",
    score: "125",
    image: student2,
    quote:
      "Smart answering techniques এবং speed training আমার score improve করতে সাহায্য করেছে।",
  },
  {
    name: "Fahim Ahmed",
    meta: "DET Preparation",
    score: "135",
    image: student3,
    quote:
      "Exam pattern বুঝে preparation করায় test দিতে অনেক confidence পেয়েছি।",
  },
];


export const faqs = [
  {
    q: "এক মাসের মধ্যে কি Duolingo English Test কোর্স complete করা সম্ভব?",
    a: "অবশ্যই। এক মাসের structured preparation-এর মাধ্যমে Duolingo English Test-এ 120 থেকে 140 score করা সম্ভব। আমাদের সাথে preparation নিয়ে আগেও অনেক student এই range-এর score করেছে।",
  },
  {
    q: "কোর্সে কয়দিন ক্লাস হবে?",
    a: "কোর্সে মোট ১২টি ক্লাস হবে। প্রতি শনিবার, সোমবার এবং বুধবার রাত ১০:৩০ টায় online class অনুষ্ঠিত হবে।",
  },
  {
    q: "এই কোর্সটি কি beginners-দের জন্য suitable?",
    a: "হ্যাঁ, অবশ্যই। যাদের basic knowledge আছে, তাদের জন্য এই কোর্সটি খুবই suitable। এখানে A to Z preparation cover করার চেষ্টা করা হবে যাতে short time-এর মধ্যে structured improvement সম্ভব হয়।",
  },
  {
    q: "স্পিকিং এবং রাইটিং practice করানো হবে কি?",
    a: "হ্যাঁ। speaking এবং writing-এর জন্য আলাদা practical guideline, answer structure, technique, real sample discussion এবং score-improving practice করানো হবে।",
  },
  {
    q: "Exam center facility আছে কি?",
    a: "Yes, আমাদের exam center facility আছে। একজন candidate যদি আমাদের সাথে preparation নেন, তাহলে তিনি আমাদের এখানে exam center facility পাবেন।",
  },
];

export const featureChips = [
  "Structured preparation plan",
  "Smart techniques for higher score",
  "Real question analysis",
  "Reading + Writing + Listening + Speaking",
  "Official + unofficial tips & tricks",
  "Practical guideline by experienced teacher",
];

export const syllabusGroups = [
  {
    label: "Section 01",
    title: "Reading",
    desc: "Vocabulary, passage understanding, and fast reading strategy.",
    icon: BookOpen,
    focus:
      "Word recognition, completion accuracy, passage flow, and interactive comprehension.",
    questions: [
      {
        title: "Read and Select",
        desc: "Vocabulary recognition এবং correct word identification practice।",
      },
      {
        title: "Fill in the Gaps",
        desc: "Sentence completion ও word accuracy improve করার technique।",
      },
      {
        title: "Read and Complete",
        desc: "Passage completion skill with speed and context understanding।",
      },
      {
        title: "Interactive Reading",
        desc: "Paragraph sequencing, idea flow, and overall passage understanding।",
      },
    ],
  },
  {
    label: "Section 02",
    title: "Listening",
    desc: "Listening comprehension, spelling, and response accuracy.",
    icon: Headphones,
    focus:
      "Audio comprehension, spelling precision, and attentive listening under time pressure.",
    questions: [
      {
        title: "Listen and Type",
        desc: "Listening + spelling accuracy build করার জন্য focused practice।",
      },
      {
        title: "Interactive Listening",
        desc: "Conversation flow, detail capture, and question understanding।",
      },
    ],
  },
  {
    label: "Section 03",
    title: "Speaking",
    desc: "Fluency, structure, and score-friendly spoken response strategy.",
    icon: Mic,
    focus:
      "Clear speaking structure, fluency, confidence, and high-score speaking approach.",
    questions: [
      {
        title: "Interactive Speaking",
        desc: "Spoken response structure, timing, and confidence building discussion।",
      },
      {
        title: "University Speaking Sample",
        desc: "High-score speaking pattern, content expansion, and smart delivery।",
      },
    ],
  },
  {
    label: "Section 04",
    title: "Writing",
    desc: "Timed writing, organization, and score-focused answer pattern.",
    icon: PenSquare,
    focus:
      "Idea organization, sentence control, timed response, and score-friendly writing format.",
    questions: [
      {
        title: "Interactive Writing",
        desc: "Timed writing response with structure, logic, and clarity practice।",
      },
      {
        title: "University Writing Sample",
        desc: "Score-friendly writing pattern with better organization and flow।",
      },
    ],
  },
];