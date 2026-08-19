import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { getFaqsForRoute } from '../seo/pageSeo.js';

/**
 * Renders the same questions that src/seo/Seo.jsx publishes as FAQPage JSON-LD
 * for this route.
 */
export default function ProductFaq({ path, title = 'Buyer Questions' }) {
  const { locale } = useLocale();
  const faqs = getFaqsForRoute(path, locale) || [];
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs.length) return null;

  return (
    <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold mb-3">
        <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
        <span>FAQ</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-5">{title}</h3>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className={`rounded-2xl border transition-all ${
                isOpen ? 'bg-white border-amber-500 shadow-sm' : 'bg-slate-50/60 border-slate-200'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                aria-expanded={isOpen}
                className="w-full px-5 py-4 flex items-center justify-between text-start gap-4 cursor-pointer"
              >
                <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-600 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
