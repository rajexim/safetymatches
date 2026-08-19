// Single source of truth for every brand fact that appears in <head>, JSON-LD,
// llms.txt and sitemap.xml. Change the domain here and the whole site follows.

// Two distinct things, deliberately kept apart:
//
//   SITE_URL     this website — the product catalogue for safety matches.
//                Every canonical, og:url, sitemap entry and image URL uses it.
//   COMPANY_URL  the corporate site for Glovel Matches LLP, the manufacturer
//                that publishes this one. It appears only as the Organization's
//                own url/sameAs, which is what tells Google and the answer
//                engines that the two domains are one company rather than two
//                unrelated sites competing for the same terms.
export const SITE_URL = 'https://www.safetymatches.in';
export const COMPANY_URL = 'https://www.glovel.in';

export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_CODES,
  getLocaleConfig,
  parseLocalePath,
  withLocale
} from './locales.js';

import { DEFAULT_LOCALE, LOCALES, withLocale } from './locales.js';
import { BLOG_ROUTES } from '../config/blogPosts.js';

export function absoluteLocalizedUrl(routePath, localeCode = DEFAULT_LOCALE) {
  const path = withLocale(routePath, localeCode);
  return `${SITE_URL}${path === '/' ? '/' : path}`;
}

export function hreflangLinks(routePath) {
  const links = LOCALES.map((locale) => ({
    hreflang: locale.hreflang,
    href: absoluteLocalizedUrl(routePath, locale.code)
  }));
  links.push({
    hreflang: 'x-default',
    href: absoluteLocalizedUrl(routePath, DEFAULT_LOCALE)
  });
  return links;
}

export const SITE = {
  // Brand shown in page titles and as the WebSite name.
  name: 'Glovel Matches LLP',
  shortName: 'Glovel Matches',
  // The site's own identity, distinct from the company that runs it.
  siteName: 'Safety Matches India',
  legalName: 'Glovel Matches LLP',
  parentOrganization: 'Glovel Group of Companies',
  // This site.
  url: SITE_URL,
  // The manufacturer's corporate site.
  companyUrl: COMPANY_URL,
  logo: `${SITE_URL}/assets/images/galleries/safety-Matches-logo.jpg`,
  defaultImage: `${SITE_URL}/assets/images/hero/banner%201.webp`,
  email: 'sales@glovel.in',
  phoneTel: '+919952538046',
  phoneDisplay: '+91 99525 38046',
  foundingLocation: 'Sivakasi, Tamil Nadu, India',
  headOffice: {
    streetAddress: 'No. 3, Balaji Street, M. G. M. Nagar, Avaniyapuram Bye Pass',
    addressLocality: 'Madurai',
    addressRegion: 'Tamil Nadu',
    postalCode: '625012',
    addressCountry: 'IN'
  },
  plant: {
    name: 'Glovel Matches LLP Safety Match Plant, Sivakasi',
    addressLocality: 'Sivakasi',
    addressRegion: 'Tamil Nadu',
    postalCode: '626123',
    addressCountry: 'IN'
  },
  port: 'V.O. Chidambaranar Port (Tuticorin VOC Port)',
  certifications: [
    'ISO 9001:2015 Quality Management System',
    'CAPEXIL Member (Chemicals and Allied Products Export Promotion Council, Government of India)',
    'Bureau of Indian Standards IS 2653 Safety Match Specification',
    'EU REACH chemical safety compliant'
  ],
  exportCountries: 52,
  annualCapacity: '1.2 billion matchboxes per year',
  // Other web presences for the same organisation. Add LinkedIn, Google
  // Business Profile etc. here as they go live — each one strengthens the
  // entity that search and AI engines resolve "Glovel Matches LLP" to.
  sameAs: [
    COMPANY_URL,
    'https://www.indiamart.com/glovel-madurai/',
    'https://glovel.trustpass.alibaba.com/'
  ]
};

export const ROUTES = [
  '/',
  '/about-us',
  '/our-products',
  '/household-matches',
  '/wax-matches',
  '/kitchen-matches',
  '/barbeque-matches',
  '/promotional-matches',
  '/our-teams',
  '/our-clients',
  '/videos',
  '/blog',
  ...BLOG_ROUTES.filter((route) => route !== '/blog'),
  '/contact-us'
];

export function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return SITE.defaultImage;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  // Asset filenames contain spaces (e.g. "banner 1.webp") which are illegal in
  // og:image / schema URLs, so encode each path segment.
  const encoded = pathOrUrl
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${SITE_URL}${encoded.startsWith('/') ? '' : '/'}${encoded}`;
}
