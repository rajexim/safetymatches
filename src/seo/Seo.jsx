import { useEffect } from 'react';
import { useRouter } from '../router/Router';
import { SITE, absoluteUrl, absoluteLocalizedUrl, hreflangLinks, LOCALES } from './siteConfig.js';
import { getPageSeo, buildSchema } from './pageSeo.js';
import { getLocaleConfig, parseLocalePath } from './locales.js';

const MANAGED = 'data-seo';

function upsertMeta(attr, name, content) {
  if (!content) return;
  const selector = attr === 'name' ? `meta[name="${name}"]` : `meta[property="${name}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    el.setAttribute(MANAGED, 'managed');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    el.setAttribute(MANAGED, 'managed');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function syncHreflang(routePath) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  hreflangLinks(routePath).forEach(({ hreflang, href }) => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', hreflang);
    el.setAttribute('href', href);
    el.setAttribute(MANAGED, 'managed');
    document.head.appendChild(el);
  });
}

function syncOgLocaleAlternates(currentOg) {
  document.head.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el) => el.remove());
  LOCALES.forEach((locale) => {
    if (locale.ogLocale === currentOg) return;
    const el = document.createElement('meta');
    el.setAttribute('property', 'og:locale:alternate');
    el.setAttribute('content', locale.ogLocale);
    el.setAttribute(MANAGED, 'managed');
    document.head.appendChild(el);
  });
}

function upsertJsonLd(id, data) {
  let el = document.head.querySelector(`script[type="application/ld+json"]#${id}`);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    el.setAttribute(MANAGED, 'managed');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSeo(path) {
  useEffect(() => {
    const { locale, routePath } = parseLocalePath(path);
    const localeCfg = getLocaleConfig(locale);
    const seo = getPageSeo(routePath, locale);
    const canonical = absoluteLocalizedUrl(routePath, locale);
    const image = absoluteUrl(seo.image);

    document.documentElement.lang = localeCfg.htmlLang;
    document.documentElement.dir = localeCfg.dir;
    document.title = seo.title;

    upsertMeta('name', 'title', seo.title);
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'keywords', seo.keywords);
    upsertCanonical(canonical);
    syncHreflang(routePath);

    upsertMeta('property', 'og:type', seo.type === 'product' ? 'product' : seo.type === 'article' ? 'article' : 'website');
    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:alt', seo.title);
    upsertMeta('property', 'og:locale', localeCfg.ogLocale);
    syncOgLocaleAlternates(localeCfg.ogLocale);
    if (seo.article?.publishedTime) {
      upsertMeta('property', 'article:published_time', seo.article.publishedTime);
      upsertMeta('property', 'article:modified_time', seo.article.modifiedTime || seo.article.publishedTime);
      if (seo.article.section) upsertMeta('property', 'article:section', seo.article.section);
      if (seo.article.author) upsertMeta('property', 'article:author', seo.article.author);
    }

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:url', canonical);
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', image);

    upsertJsonLd('seo-jsonld', buildSchema(routePath, locale));
  }, [path]);
}

export default function Seo() {
  const { path } = useRouter();
  useSeo(path);
  return null;
}
