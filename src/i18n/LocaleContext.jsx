import React, { createContext, useContext, useMemo } from 'react';
import { useRouter } from '../router/Router';
import {
  DEFAULT_LOCALE,
  LOCALES,
  getLocaleConfig,
  parseLocalePath,
  withLocale
} from '../seo/locales.js';
import { MESSAGES } from './messages.js';

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  routePath: '/',
  dir: 'ltr',
  t: (key) => key,
  localizePath: (path) => path,
  switchLocale: () => {}
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ children }) {
  const { path, navigate } = useRouter();
  const { locale, routePath } = useMemo(() => parseLocalePath(path), [path]);
  const config = getLocaleConfig(locale);

  const value = useMemo(() => {
    const dict = MESSAGES[locale] || MESSAGES.en;
    const t = (key, fallback) => {
      if (dict[key] != null) return dict[key];
      if (MESSAGES.en[key] != null) return MESSAGES.en[key];
      return fallback != null ? fallback : key;
    };
    return {
      locale,
      routePath,
      dir: config.dir,
      htmlLang: config.htmlLang,
      ogLocale: config.ogLocale,
      t,
      localizePath: (p) => withLocale(p, locale),
      switchLocale: (next) => {
        navigate(withLocale(routePath, next));
      },
      locales: LOCALES
    };
  }, [locale, routePath, config, navigate]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
