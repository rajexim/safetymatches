import React, { useState, useEffect, createContext, useContext } from 'react';
import { parseLocalePath, withLocale, DEFAULT_LOCALE } from '../seo/locales.js';

const RouterContext = createContext({
  path: '/',
  routePath: '/',
  locale: DEFAULT_LOCALE,
  navigate: () => {}
});

export function useRouter() {
  return useContext(RouterContext);
}

/**
 * Resolve an internal path for navigation.
 * - Already-localized paths (/fr/..., /es/..., or English bare routes when locale is en) are kept.
 * - Bare routes like /about-us are prefixed with the current locale.
 */
function resolveNavPath(to, currentLocale) {
  if (typeof to !== 'string' || !to.startsWith('/')) return to;
  const { locale: pathLocale, routePath } = parseLocalePath(to);
  // Caller passed an explicit locale prefix (language switch or localized Link href)
  if (pathLocale !== DEFAULT_LOCALE) return withLocale(routePath, pathLocale);
  // Bare English-form path: attach current UI locale
  return withLocale(routePath, currentLocale);
}

export function Link({ to, children, className, onClick, ...props }) {
  const { navigate, locale } = useRouter();
  const isExternal =
    typeof to === 'string' &&
    (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:') || to.startsWith('#'));
  const href = isExternal ? to : resolveNavPath(to, locale);

  const handleClick = (e) => {
    if (isExternal) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}

export function Router({ children }) {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const { locale, routePath } = parseLocalePath(path);

  const navigate = (to) => {
    const resolved = resolveNavPath(to, locale);
    if (resolved !== window.location.pathname) {
      window.history.pushState({}, '', resolved);
      setPath(resolved);
      window.scrollTo(0, 0);
    }
  };

  return (
    <RouterContext.Provider value={{ path, routePath, locale, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}
