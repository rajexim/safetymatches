// Locale path helpers (no dependency on siteConfig — avoids circular imports).

export const DEFAULT_LOCALE = 'en';

/** @type {{ code: string, prefix: string, htmlLang: string, dir: 'ltr'|'rtl', ogLocale: string, label: string, hreflang: string }[]} */
export const LOCALES = [
  { code: 'en', prefix: '', htmlLang: 'en', dir: 'ltr', ogLocale: 'en_US', label: 'EN', hreflang: 'en' },
  { code: 'fr', prefix: '/fr', htmlLang: 'fr', dir: 'ltr', ogLocale: 'fr_FR', label: 'FR', hreflang: 'fr' },
  { code: 'es', prefix: '/es', htmlLang: 'es', dir: 'ltr', ogLocale: 'es_ES', label: 'ES', hreflang: 'es' },
  { code: 'pt', prefix: '/pt', htmlLang: 'pt', dir: 'ltr', ogLocale: 'pt_BR', label: 'PT', hreflang: 'pt' },
  { code: 'ar', prefix: '/ar', htmlLang: 'ar', dir: 'rtl', ogLocale: 'ar_SA', label: 'AR', hreflang: 'ar' }
];

export const LOCALE_CODES = LOCALES.map((l) => l.code);

export function getLocaleConfig(code) {
  return LOCALES.find((l) => l.code === code) || LOCALES[0];
}

export function parseLocalePath(pathname) {
  const raw = pathname || '/';
  const clean = raw.length > 1 && raw.endsWith('/') ? raw.slice(0, -1) : raw;
  for (const locale of LOCALES) {
    if (!locale.prefix) continue;
    if (clean === locale.prefix) {
      return { locale: locale.code, routePath: '/' };
    }
    if (clean.startsWith(`${locale.prefix}/`)) {
      return { locale: locale.code, routePath: clean.slice(locale.prefix.length) || '/' };
    }
  }
  return { locale: DEFAULT_LOCALE, routePath: clean || '/' };
}

export function withLocale(routePath, localeCode = DEFAULT_LOCALE) {
  const route = !routePath || routePath === '/' ? '/' : routePath.startsWith('/') ? routePath : `/${routePath}`;
  const locale = getLocaleConfig(localeCode);
  if (!locale.prefix) return route;
  return route === '/' ? locale.prefix : `${locale.prefix}${route}`;
}
