"use client";

import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/lib/faq-data";
import { EASE_MISSION } from "@/lib/motion";

interface FaqSectionProps {
  items: FaqItem[];
  heading?: string;
  subheading?: string;
}

export function FaqSection({
  items,
  heading = "Frequently Asked Questions",
  subheading = "Everything you need to know about training at Mission MMA",
}: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl uppercase text-mission-white mb-3">
            {heading}
          </h2>
          <p className="text-mission-gray-400 text-lg">{subheading}</p>
        </div>
        <div className="space-y-2">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border border-mission-gray-800 rounded-lg overflow-hidden bg-mission-gray-900/50"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-mission-white font-medium hover:text-mission-red transition-colors duration-200"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{item.question}</span>
                  <m.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: EASE_MISSION }}
                    className="shrink-0 text-mission-red"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </m.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_MISSION }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-mission-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
