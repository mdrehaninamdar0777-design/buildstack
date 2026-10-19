"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Is BuildStack really free?",
    answer:
      "Yes! BuildStack is free for core learning. We also offer premium features to enhance your learning experience.",
  },
  {
    id: 2,
    question: "Can I access BuildStack on mobile?",
    answer:
      "Yes, BuildStack is fully responsive and optimized for seamless learning across desktop, tablet, and mobile devices.",
  },
  {
    id: 3,
    question: "Do I need coding experience to start?",
    answer:
      "Not at all. We provide dedicated Beginner learning paths that start from fundamental concepts and guide you step by step.",
  },
  {
    id: 4,
    question: "Are the resources up to date?",
    answer:
      "All roadmaps and curated resources are routinely verified and updated to align with the latest industry tools and best practices.",
  },
  {
    id: 5,
    question: "How does progress tracking work?",
    answer:
      "Every module and lesson you complete automatically updates your progress, fuels your streak, and displays in your personal learning dashboard.",
  },
  {
    id: 6,
    question: "What if I get stuck while learning?",
    answer:
      "Each skill includes structured prerequisites, official docs, downloadable notes, and community links to help you resolve blockers quickly.",
  },
];

export default function FaqAccordion() {
  const [openIds, setOpenIds] = useState([1]);

  const toggle = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Questions? We&apos;ve Got Answers
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-sm font-semibold text-neutral-900 sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-neutral-100 px-6 pb-6 pt-4 text-sm leading-6 text-neutral-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
