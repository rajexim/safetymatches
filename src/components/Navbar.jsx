import React, { useState } from 'react';
import { Link, useRouter } from '../router/Router';
import { ChevronRight, Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import { useLocale } from '../i18n/LocaleContext';
import SmartImage from './SmartImage';

export default function Navbar({ onOpenRfq }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { routePath } = useRouter();
  const { content } = useContent();
  const { t, locale, switchLocale, locales } = useLocale();
  const site = content.site || {};

  const isActive = (targetPath) => {
    if (targetPath === '/blog') {
      return routePath === '/blog' || routePath.startsWith('/blog/');
    }
    return routePath === targetPath || routePath === `${targetPath}/`;
  };
  const productsActive =
    routePath === '/our-products' ||
    [
      '/household-matches',
      '/wax-matches',
      '/kitchen-matches',
      '/barbeque-matches',
      '/promotional-matches'
    ].includes(routePath);

  return (
    <header className="sticky top-0 z-50 glass-panel shadow-xs bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="bg-slate-900 text-slate-200 text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 lg:px-8 border-b border-slate-800 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium">
            <span className="font-extrabold text-yellow-400 text-sm sm:text-base tracking-wide">Glovel Matches LLP</span>
            <span className="text-slate-600">|</span>
            <span className="font-semibold text-slate-300">{site.brandTagline || t('hero.trustFallback')}</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-mono font-medium">
            <label className="sr-only" htmlFor="lang-switcher">{t('lang.switcherLabel')}</label>
            <select
              id="lang-switcher"
              value={locale}
              onChange={(e) => switchLocale(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-2 py-1 text-xs font-sans font-semibold cursor-pointer"
              aria-label={t('lang.switcherLabel')}
            >
              {locales.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <a href={`mailto:${site.email || 'sales@glovel.in'}`} className="hover:text-yellow-400 transition-colors flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
              <Mail className="w-4 h-4 text-yellow-400" />
              <span>{site.email || 'sales@glovel.in'}</span>
            </a>
            <a href={`tel:${site.phoneTel || '+919952538046'}`} className="hover:text-yellow-400 transition-colors flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>{site.phoneDisplay || '+91 99525 38046'}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <SmartImage
              src="/assets/images/galleries/safety-Matches-logo.jpg"
              alt="Glovel Matches LLP — safety match manufacturer and exporter, Sivakasi, India"
              sizes="110px"
              loading="eager"
              width={110}
              height={48}
              className="h-12 w-[110px] object-contain rounded-lg border border-slate-200 p-1 group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-heading">GLOVEL MATCHES</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-900 font-extrabold border border-yellow-300">LLP</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">safetymatches.in • {t('common.sivakasiIndia')}</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <Link to="/" className={`transition-colors hover:text-yellow-600 ${isActive('/') ? 'text-yellow-600 font-bold' : ''}`}>
              {t('nav.home')}
            </Link>
            <Link to="/about-us" className={`transition-colors hover:text-yellow-600 ${isActive('/about-us') ? 'text-yellow-600 font-bold' : ''}`}>
              {t('nav.about')}
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <Link
                to="/our-products"
                className={`flex items-center gap-1 transition-colors hover:text-yellow-600 py-2 ${productsActive ? 'text-yellow-600 font-bold' : ''}`}
              >
                <span>{t('nav.products')}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </Link>

              {productsDropdownOpen && (
                <div className="absolute top-full start-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-3 px-2 space-y-1 z-50">
                  <Link to="/our-products" className="block px-3 py-2 text-xs font-bold text-yellow-600 hover:bg-yellow-50 rounded-xl">
                    {t('nav.productsOverview')}
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  <Link to="/household-matches" className="block px-3 py-2 text-xs text-slate-700 hover:text-yellow-600 hover:bg-slate-50 rounded-xl">{t('nav.household')}</Link>
                  <Link to="/wax-matches" className="block px-3 py-2 text-xs text-slate-700 hover:text-yellow-600 hover:bg-slate-50 rounded-xl">{t('nav.wax')}</Link>
                  <Link to="/promotional-matches" className="block px-3 py-2 text-xs text-slate-700 hover:text-yellow-600 hover:bg-slate-50 rounded-xl">{t('nav.promotional')}</Link>
                  <Link to="/kitchen-matches" className="block px-3 py-2 text-xs text-slate-700 hover:text-yellow-600 hover:bg-slate-50 rounded-xl">{t('nav.kitchen')}</Link>
                  <Link to="/barbeque-matches" className="block px-3 py-2 text-xs text-slate-700 hover:text-yellow-600 hover:bg-slate-50 rounded-xl">{t('nav.barbeque')}</Link>
                </div>
              )}
            </div>

            <Link to="/our-teams" className={`transition-colors hover:text-yellow-600 ${isActive('/our-teams') ? 'text-yellow-600 font-bold' : ''}`}>{t('nav.team')}</Link>
            <Link to="/our-clients" className={`transition-colors hover:text-yellow-600 ${isActive('/our-clients') ? 'text-yellow-600 font-bold' : ''}`}>{t('nav.clients')}</Link>
            <Link to="/videos" className={`transition-colors hover:text-yellow-600 ${isActive('/videos') ? 'text-yellow-600 font-bold' : ''}`}>{t('nav.videos')}</Link>
            <Link to="/blog" className={`transition-colors hover:text-yellow-600 ${isActive('/blog') ? 'text-yellow-600 font-bold' : ''}`}>{t('nav.blog')}</Link>
            <Link to="/contact-us" className={`transition-colors hover:text-yellow-600 ${isActive('/contact-us') ? 'text-yellow-600 font-bold' : ''}`}>{t('nav.contact')}</Link>
          </nav>

          <div className="hidden xl:flex items-center gap-4">
            <button
              onClick={onOpenRfq}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl shadow-md shadow-yellow-500/20 transition-all text-sm group cursor-pointer"
            >
              <span>{t('nav.getQuote')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <div className="flex gap-2 py-2 border-b border-slate-100">
            {locales.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => { switchLocale(l.code); setMobileMenuOpen(false); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${locale === l.code ? 'bg-yellow-400 border-yellow-500 text-slate-950' : 'border-slate-200 text-slate-600'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">{t('nav.home')}</Link>
          <Link to="/about-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">{t('nav.about')}</Link>
          <Link to="/our-products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-yellow-600 font-bold border-b border-slate-100">{t('nav.productsOverview')}</Link>
          <div className="ps-4 space-y-1 text-xs text-slate-600 py-1">
            <Link to="/household-matches" onClick={() => setMobileMenuOpen(false)} className="block py-1">{t('nav.household')}</Link>
            <Link to="/wax-matches" onClick={() => setMobileMenuOpen(false)} className="block py-1">{t('nav.wax')}</Link>
            <Link to="/promotional-matches" onClick={() => setMobileMenuOpen(false)} className="block py-1">{t('nav.promotional')}</Link>
            <Link to="/kitchen-matches" onClick={() => setMobileMenuOpen(false)} className="block py-1">{t('nav.kitchen')}</Link>
            <Link to="/barbeque-matches" onClick={() => setMobileMenuOpen(false)} className="block py-1">{t('nav.barbeque')}</Link>
          </div>
          <Link to="/our-teams" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">{t('nav.team')}</Link>
          <Link to="/our-clients" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">{t('nav.clients')}</Link>
          <Link to="/videos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">{t('nav.videos')}</Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">{t('nav.blog')}</Link>
          <Link to="/contact-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">{t('nav.contact')}</Link>
          <div className="pt-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenRfq(); }}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold py-3 rounded-xl text-center shadow-md"
            >
              {t('nav.requestQuote')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
