import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Mail } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { getFaqsForRoute } from '../seo/pageSeo.js';

export default function AeoFaqSection({ onOpenRfq }) {
  const [openIndex, setOpenIndex] = useState(0);
  const { locale, t } = useLocale();
  const faqs = getFaqsForRoute('/', locale) || [];

  return (
    <section id="faq" className="py-20 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold mb-4 shadow-xs">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>AEO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('faq.heading')}
          </h2>
        </div>

        <div className="space-y-4 mb-14">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-white border-amber-500 shadow-md'
                    : 'bg-white/80 hover:bg-white border-slate-200 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-start cursor-pointer"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-amber-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:sales@glovel.in"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-800 hover:border-amber-400"
          >
            <Mail className="w-4 h-4 text-amber-600" />
            <span>{t('faq.ctaEmail')}</span>
          </a>
          <button
            type="button"
            onClick={() => onOpenRfq('FAQ Direct Inquiry')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-slate-950 text-sm font-extrabold hover:bg-amber-600 cursor-pointer"
          >
            {t('faq.ctaQuote')}
          </button>
        </div>
      </div>
    </section>
  );
}
