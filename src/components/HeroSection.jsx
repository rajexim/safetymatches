import React, { useState, useEffect } from 'react';
import { ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import SmartImage from './SmartImage';

// Width used for every hero slide. Must stay in sync with the LCP preload that
// scripts/generate-seo.mjs writes into the homepage <head>.
export const HERO_VARIANT = 1600;

export default function HeroSection({ onOpenRfq }) {
  const { content } = useContent();
  const banners = content.banners?.length ? content.banners : [];
  const site = content.site || {};
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!banners.length) return undefined;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    if (currentSlide >= banners.length) setCurrentSlide(0);
  }, [banners.length, currentSlide]);

  if (!banners.length) {
    return (
      <section className="relative bg-slate-100/80 py-6 lg:py-10 overflow-hidden border-b border-slate-200" aria-hidden="true">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-200/80 aspect-[1920/737] min-h-[240px] sm:min-h-[320px] animate-pulse" />
        </div>
      </section>
    );
  }

  const slide = banners[currentSlide] || banners[0];

  return (
    <section className="relative bg-slate-100/80 py-6 lg:py-10 overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border-0 bg-white group aspect-[1920/737] min-h-[240px] sm:min-h-[320px] flex items-center justify-start">
          {banners.map((b, idx) => (
            <SmartImage
              key={`${b.id || b.image}-${idx}`}
              src={b.image}
              // Banner titles are headlines, not descriptions, so prefer an
              // explicit alt from the CMS and fall back to the headline.
              alt={b.alt || b.title}
              // Banners are 8-18 KB at every size, so a srcset saves almost
              // nothing while risking a duplicate fetch against the preload.
              variant={HERO_VARIANT}
              // The first slide is the homepage LCP element; the rest are
              // off-screen until the carousel advances.
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'low'}
              decoding={idx === 0 ? 'sync' : 'async'}
              className={`absolute inset-0 w-full h-full object-cover object-center scale-[1.02] transition-opacity duration-700 ${
                currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}

          <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-900/20 md:bg-gradient-to-r md:from-slate-950/90 md:via-slate-950/60 md:to-transparent" />

          <div className="relative z-30 w-full h-full flex items-center justify-start p-6 sm:p-10 lg:p-14">
            <div className="text-left max-w-2xl">
              <div className="inline-block px-3 py-1 rounded-full bg-yellow-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-xs">
                {site.factoryBadge || 'Factory Direct Export'}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 drop-shadow-md">
                {slide.title}
              </h1>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 drop-shadow-xs max-w-xl">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenRfq}
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-lg text-xs cursor-pointer"
                >
                  <span>{site.heroCta || 'Request Factory Quotation'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-md backdrop-blur-md transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-md backdrop-blur-md transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 right-6 z-40 flex items-center gap-1.5">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-800 shadow-xs">
            <span className="flex items-center gap-1.5">
              <img src="/assets/images/galleries/indiaflag.svg" alt="Flag of India" width="20" height="14" className="h-3.5 w-auto rounded-xs shrink-0" />
              {site.trustBadge || 'Sivakasi Factory Direct Export'}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-yellow-600 font-extrabold">Glovel Matches LLP</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ISO 9001:2015
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">1.2B+</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Matches Produced / Year</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-yellow-600 font-heading">52+</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Export Nations</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-heading">0%</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Damp Failure Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
