/**
 * Post-build SEO step — per-route and per-locale static <head>, plus sitemap
 * with hreflang alternates.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  SITE_URL,
  ROUTES,
  absoluteUrl,
  absoluteLocalizedUrl,
  hreflangLinks,
  LOCALES,
  DEFAULT_LOCALE,
  getLocaleConfig
} from '../src/seo/siteConfig.js';
import { getPageSeo, buildSchema } from '../src/seo/pageSeo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const publicDir = path.join(root, 'public');

const SEO_START = '<!-- SEO:START -->';
const SEO_END = '<!-- SEO:END -->';

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

const imageManifest = readJson(path.join(root, 'src', 'generated', 'image-manifest.json'), {});
const siteContent = readJson(path.join(root, 'content', 'site-content.json'), {});
const HERO_VARIANT = 1600;

function lcpPreloadFor(route) {
  // Every locale homepage uses the same hero LCP image.
  if (route !== '/') return '';

  const banner = (siteContent.banners || [])[0];
  if (!banner) return '';

  const entry = imageManifest[banner.image];
  const encode = (p) => p.split('/').map(encodeURIComponent).join('/');

  let href = banner.image;
  if (entry) {
    const width = entry.v.includes(HERO_VARIANT) ? HERO_VARIANT : entry.v[entry.v.length - 1];
    href = `${banner.image.slice(0, banner.image.lastIndexOf('.'))}-${width}.webp`;
  }

  return `\n    <link rel="preload" as="image" href="${escapeAttr(encode(href))}" fetchpriority="high" />`;
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function headFor(route, locale = DEFAULT_LOCALE) {
  const seo = getPageSeo(route, locale);
  const localeCfg = getLocaleConfig(locale);
  const canonical = absoluteLocalizedUrl(route, locale);
  const image = absoluteUrl(seo.image);
  const ogType = seo.type === 'product' ? 'product' : seo.type === 'article' ? 'article' : 'website';
  const alternates = hreflangLinks(route)
    .map(
      ({ hreflang, href }) =>
        `<link rel="alternate" hreflang="${escapeAttr(hreflang)}" href="${escapeAttr(href)}" />`
    )
    .join('\n    ');
  const ogAlternates = LOCALES.filter((l) => l.ogLocale !== localeCfg.ogLocale)
    .map((l) => `<meta property="og:locale:alternate" content="${l.ogLocale}" />`)
    .join('\n    ');

  const meta = [
    `<title>${escapeAttr(seo.title)}</title>`,
    `<meta name="title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="keywords" content="${escapeAttr(seo.keywords)}" />`,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    alternates,
    '',
    `<meta property="og:type" content="${ogType}" />`,
    '<meta property="og:site_name" content="Glovel Matches LLP" />',
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:locale" content="${localeCfg.ogLocale}" />`,
    ogAlternates,
    '',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:url" content="${escapeAttr(canonical)}" />`,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
    '',
    `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(buildSchema(route, locale)).replace(/</g, '\\u003c')}</script>`
  ];

  return `${SEO_START}\n    ${meta.join('\n    ')}${lcpPreloadFor(route)}\n    ${SEO_END}`;
}

function applyHtmlLangDir(html, locale) {
  const cfg = getLocaleConfig(locale);
  return html
    .replace(/<html\b[^>]*>/, `<html lang="${cfg.htmlLang}" dir="${cfg.dir}" class="scroll-smooth">`);
}

function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const priority = (route) => {
    if (route === '/') return '1.0';
    if (route === '/our-products' || route.endsWith('-matches')) return '0.9';
    if (route === '/contact-us' || route === '/about-us') return '0.8';
    return '0.6';
  };

  const urls = [];
  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const alternates = hreflangLinks(route)
        .map(
          ({ hreflang, href }) =>
            `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`
        )
        .join('\n');
      urls.push(`  <url>
    <loc>${absoluteLocalizedUrl(route, locale.code)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority(route)}</priority>
${alternates}
  </url>`);
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), body, 'utf8');
  if (fs.existsSync(dist)) {
    fs.writeFileSync(path.join(dist, 'sitemap.xml'), body, 'utf8');
  }
  console.log(`sitemap.xml  ${urls.length} urls`);
}

function syncSourceShell() {
  const shellPath = path.join(root, 'index.html');
  const shell = fs.readFileSync(shellPath, 'utf8');
  const start = shell.indexOf(SEO_START);
  const end = shell.indexOf(SEO_END);
  if (start === -1 || end === -1) return;

  let updated = shell.slice(0, start) + headFor('/', DEFAULT_LOCALE) + shell.slice(end + SEO_END.length);
  updated = applyHtmlLangDir(updated, DEFAULT_LOCALE);
  if (updated !== shell) {
    fs.writeFileSync(shellPath, updated, 'utf8');
    console.log('shell        index.html SEO block synced');
  }
}

function prerender() {
  const shellPath = path.join(dist, 'index.html');
  if (!fs.existsSync(shellPath)) {
    console.log('dist/index.html not found — skipping prerender (run `npm run build` first).');
    return;
  }

  const shell = fs.readFileSync(shellPath, 'utf8');
  const start = shell.indexOf(SEO_START);
  const end = shell.indexOf(SEO_END);
  if (start === -1 || end === -1) {
    throw new Error(`Could not find ${SEO_START} / ${SEO_END} markers in dist/index.html`);
  }

  const before = shell.slice(0, start);
  const after = shell.slice(end + SEO_END.length);
  let count = 0;

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      let html = `${before}${headFor(route, locale.code)}${after}`;
      html = applyHtmlLangDir(html, locale.code);

      if (locale.code === DEFAULT_LOCALE && route === '/') {
        fs.writeFileSync(shellPath, html, 'utf8');
      } else {
        const localizedPath =
          locale.code === DEFAULT_LOCALE
            ? route.replace(/^\//, '')
            : route === '/'
              ? locale.code
              : `${locale.code}${route}`;
        const dir = path.join(dist, localizedPath);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
      }
      count += 1;
    }
  }

  console.log(`prerender    ${count} locale×route pages`);
}

writeSitemap();
syncSourceShell();
prerender();
console.log(`base url     ${SITE_URL}`);
console.log(`locales      ${LOCALES.map((l) => l.code).join(', ')}`);
