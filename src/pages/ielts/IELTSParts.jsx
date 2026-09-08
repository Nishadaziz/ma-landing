import { ChevronDown } from "lucide-react";

/* ---------------- FAQ ITEM (matches existing site accordion style) ---------------- */

export function FaqAccordionItem({ item, isOpen, onClick, wasOpened }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-amber-300 bg-amber-50/60 shadow-sm"
          : wasOpened
          ? "border-amber-200 bg-white"
          : "border-slate-200 bg-white"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
      >
        <span
          className={`text-sm font-extrabold leading-6 md:text-base ${
            isOpen || wasOpened ? "text-amber-700" : "text-slate-900"
          }`}
        >
          {item.q}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
            isOpen || wasOpened
              ? "bg-amber-100 text-amber-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-sm leading-7 text-slate-700 md:px-6">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}
