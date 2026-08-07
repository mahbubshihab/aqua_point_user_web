'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is Reverse Osmosis (RO) water purification?',
    answer: 'Reverse Osmosis (RO) is a multi-stage water purification technology that forces water through a 0.0001-micron semi-permeable membrane. It eliminates up to 99.9% of total dissolved solids (TDS), heavy metals (iron, lead, arsenic), pesticides, micro-plastics, bacteria, and viruses, delivering crystal clear, bottled-grade drinking water.'
  },
  {
    question: 'How often should I change my RO filter cartridges?',
    answer: 'Polypropylene Sediment (PP) and Carbon Block (CTO) pre-filters should be replaced every 3 to 6 months depending on your local water TDS and iron level. The main Reverse Osmosis membrane typically lasts 12 to 18 months under normal household usage when pre-filters are maintained.'
  },
  {
    question: 'Do Aqua Point RO purifiers retain essential minerals?',
    answer: 'Yes! All Aqua Point 7-Stage RO systems are equipped with an advanced Mineral Post-Filter cartridge that re-adds bio-available essential minerals (Calcium, Magnesium, Potassium) while restoring healthy alkaline pH levels (7.2 to 7.5) for optimal hydration and taste.'
  },
  {
    question: 'Does Aqua Point offer free doorstep water quality testing and installation?',
    answer: 'Yes, Aqua Point provides free doorstep TDS and pH testing for your water supply. Furthermore, we offer professional technician installation for purifiers ordered in Dhaka, along with fast island/district delivery across Bangladesh.'
  },
  {
    question: 'What warranty and maintenance support does Aqua Point provide?',
    answer: 'All Aqua Point RO water purifiers come with a 1-Year Comprehensive Electrical Warranty covering booster pumps, adapters, solenoid valves, and auto-flush switches. Our dedicated hotline (01780-885841 / 09613 700 750) provides rapid technician response for maintenance.'
  }
];

export const FaqsSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-md space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00BCE1]/10 text-[#00BCE1] border border-[#00BCE1]/20 text-xs font-extrabold uppercase tracking-wide">
            ❓ FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-2">
            Got Questions? <span className="text-[#00BCE1]">Aqua Point</span> Has Answers
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Everything you need to know about our RO water purifiers, replacement filters, testing, and warranty.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#F0F9FF] border-[#00BCE1] shadow-sm'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#00BCE1]/50'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-extrabold text-[#0F172A] flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#00BCE1]' : 'text-[#64748B]'}`} />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#00BCE1]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#BAE6FD]/40 animate-in fade-in duration-200">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00BCE1]/10 flex items-center justify-center text-[#00BCE1]">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#0F172A]">Have More Questions?</h4>
              <p className="text-[11px] text-[#64748B]">Speak directly with an Aqua Point water engineer.</p>
            </div>
          </div>
          <a
            href="tel:01780885841"
            className="px-5 py-2.5 rounded-full bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-extrabold text-xs transition-colors shrink-0 shadow-sm"
          >
            Call 01780-885841
          </a>
        </div>

      </div>
    </section>
  );
};
