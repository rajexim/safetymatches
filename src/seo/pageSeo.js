// Explicit .js extensions keep this module importable by plain Node, which the
// build-time prerender script relies on.
import { SITE, SITE_URL, absoluteUrl, absoluteLocalizedUrl } from './siteConfig.js';
import { HOME_FAQS, PRODUCT_FAQS } from './faqs.js';
import { PAGE_SEO_LOCALES, HOME_FAQS_LOCALES, PRODUCT_FAQS_LOCALES } from './pageSeoLocales.js';
import { DEFAULT_LOCALE, getLocaleConfig } from './locales.js';
import { getBlogPostByPath, blogPostSeo, BLOG_POSTS, blogPostPath } from '../config/blogPosts.js';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/* ------------------------------------------------------------------ */
/* Per-route meta                                                      */
/* ------------------------------------------------------------------ */

// `title` is the full <title>. Keep each under ~60 characters of unique text so
// Google does not truncate the differentiating part, and never repeat a title
// across two routes — duplicate titles are what make an SPA look like one page.
export const PAGE_SEO = {
  '/': {
    title: 'Safety Matches Manufacturer & Exporter India | Glovel Matches LLP',
    description:
      'Glovel Matches LLP is an ISO 9001:2015 certified safety match manufacturer and exporter in Sivakasi, India. Wooden, wax, kitchen, barbeque and custom hotel matchboxes shipped by FCL container to 52+ countries.',
    keywords:
      'safety matches manufacturer india, matchbox exporter sivakasi, wooden safety matches bulk, wax matches supplier, private label matchbox manufacturer, custom hotel promotional matches, fcl container matches export',
    image: '/assets/images/hero/banner 1.webp',
    type: 'website'
  },
  '/about-us': {
    title: 'About Glovel Matches LLP | Sivakasi Match Factory & Export Markets',
    description:
      'Glovel Matches LLP manufactures safety matches in Sivakasi, Tamil Nadu and exports to 52+ countries across Africa, Europe, the Middle East and the Americas. ISO 9001:2015 certified and a registered CAPEXIL member.',
    keywords:
      'glovel matches llp, sivakasi match factory, indian safety match exporter, iso 9001 match manufacturer, capexil member matches',
    image: '/assets/images/products/About-images.png',
    type: 'website'
  },
  '/our-products': {
    title: 'Safety Match Product Range | Wooden, Wax, Kitchen & BBQ Matches',
    description:
      'Complete Glovel Matches LLP catalogue: household wooden matches, moisture-proof wax matches, extra long kitchen matches, barbeque and fireplace matches, and custom promotional matchboxes — with 20FT and 40FT HC container loadability for each.',
    keywords:
      'safety match product range, matchbox sizes and specifications, wooden matches wholesale, wax matches export, kitchen matches bulk, bbq matches supplier',
    image: '/assets/images/products/household/household-match-01.png',
    type: 'website'
  },
  '/household-matches': {
    title: 'Household Safety Matches 5S / 5E / 5H | Bulk Export from India',
    description:
      'Pocket household safety matches in models 5S, 5E and 5H — 40mm and 42mm poplar splints, ~40 sticks per box, white duplex board, single-stroke ignition and zero afterglow. Full OEM private label and FCL container export.',
    keywords:
      'household safety matches, pocket matchbox manufacturer, 5s 5e 5h matches, poplar splint matches, wooden matchbox exporter india',
    image: '/assets/images/products/household/household-match-01.png',
    type: 'product'
  },
  '/wax-matches': {
    title: 'Moisture-Proof Wax Safety Matches | Paraffin Kraft Splints',
    description:
      'Paraffin-impregnated kraft paper wax matches engineered for coastal, rainy and high-humidity markets. Models WM, WSM, 5H and Wax Kitchen, up to 1,850 cartons per 20FT FCL. Custom label artwork for private brands.',
    keywords:
      'wax matches manufacturer, moisture proof matches, paraffin wax safety matches, damp proof matchbox, wax matches export africa latin america',
    image: '/assets/images/products/wax/wax-match-01.png',
    type: 'product'
  },
  '/kitchen-matches': {
    title: 'Extra Long Kitchen Safety Matches KB 100–KB 250 | Bulk Supply',
    description:
      'Extra long kitchen safety matches with 47mm and 53mm splints in 100, 200, 240 and 250 stick fills. Damp-proof heads and high-friction strikers for gas stoves, ovens and tall candles. Bulk export from Sivakasi.',
    keywords:
      'kitchen matches manufacturer, extra long safety matches, long matchsticks for gas stove, kb 200 kitchen matchbox, kitchen matches bulk export',
    image: '/assets/images/products/kitchen/kitchen-match-01.png',
    type: 'product'
  },
  '/barbeque-matches': {
    title: 'Barbeque & Fireplace Matches BBQ 96 / 170 / 280 | 28cm Splints',
    description:
      'Heavy-duty barbeque and fireplace safety matches with 96mm, 170mm and 280mm softwood splints at 3 x 3 mm thickness. Wind-resistant extended burn for charcoal grills, camp fires and log fireplaces.',
    keywords:
      'barbeque matches manufacturer, fireplace matches 280mm, long bbq matchsticks, extra long fireplace matches supplier, charcoal grill matches export',
    image: '/assets/images/products/barbeque/barbeque-match-01.png',
    type: 'product'
  },
  '/promotional-matches': {
    title: 'Custom Printed Hotel & Promotional Matchboxes | OEM Private Label',
    description:
      'Bespoke promotional matchboxes and matchbooks for hotels, resorts, bars and cigar lounges. 300 GSM art board, gold and silver foil stamping, spot UV, black dyed splints and custom match head colours. Formats BX-09 to BX-15.',
    keywords:
      'custom printed matchboxes, hotel matchbook manufacturer, promotional matches oem, private label matchbox printing, foil stamped matchbox supplier',
    image: '/assets/images/products/promotional/PromotionalMatchProduct3.png',
    type: 'product'
  },
  '/our-teams': {
    title: 'Leadership & Export Team | Glovel Matches LLP Sivakasi',
    description:
      'Meet the Glovel Matches LLP management team — production, quality assurance, purchasing and port logistics leads who handle B2B enquiries, pre-shipment samples and container scheduling at Tuticorin Port.',
    keywords:
      'glovel matches team, safety match export managers, sivakasi match factory management, match manufacturer quality team',
    image: '/assets/images/products/About-images.png',
    type: 'website'
  },
  '/our-clients': {
    title: 'Global Clients & Buyer Reviews | Safety Match Importers Worldwide',
    description:
      'Glovel Matches LLP supplies safety matches to importers, supermarket chains and distributors across Africa, Europe, the Middle East and the Americas. Verified buyer testimonials and exclusive regional supply contracts.',
    keywords:
      'safety match importers, matchbox distributors worldwide, glovel matches clients, match export testimonials, regional match distributor contract',
    image: '/assets/images/buyers/ISO-CERTIFICATE-SAFETY-MATCHES-LLP.png',
    type: 'website'
  },
  '/videos': {
    title: 'Factory Tour Videos | Match Production & Container Stuffing',
    description:
      'Watch Glovel Matches LLP production line footage: single-stroke ignition and damp-resistance testing, matchbox filling, and 20FT / 40FT High Cube container stuffing at our Sivakasi plant for dispatch via Tuticorin Port.',
    keywords:
      'match factory video, safety match production line, container stuffing matches, sivakasi match manufacturing video, match quality testing',
    image: '/assets/images/hero/banner 4.webp',
    type: 'website'
  },
  '/blog': {
    title: 'Safety Matches Export Blog | Buyer Guides & Factory Insights',
    description:
      'Guides for importers and distributors: manufacturing quality, wooden vs wax matches, FOB vs CIF pricing, UAE, Nigeria and Saudi sourcing tips, and SABS-oriented notes for South African buyers — from Glovel Matches LLP.',
    keywords:
      'safety matches blog, matchbox import guide, fob cif matches, wooden safety matches guide, glovel matches insights',
    image: '/assets/images/hero/banner 2.webp',
    type: 'website',
    breadcrumb: 'Blog'
  },
  '/contact-us': {
    title: 'Contact Glovel Matches LLP | Factory Quotes & Free Sample Kits',
    description:
      'Contact the Glovel Matches LLP export desk in Madurai for FOB/CIF factory quotations, free physical sample kits, private label artwork guidelines and container freight estimates. Reply within 12 hours.',
    keywords:
      'contact safety match manufacturer, matchbox factory quotation, safety match samples india, glovel matches contact, match exporter enquiry',
    image: '/assets/images/hero/banner 1.webp',
    type: 'website'
  }
};

const FALLBACK_SEO = PAGE_SEO['/'];

export function getPageSeo(path, locale = DEFAULT_LOCALE) {
  const clean = path && path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  const post = getBlogPostByPath(clean);
  const base = post ? blogPostSeo(post) : PAGE_SEO[clean] || FALLBACK_SEO;
  if (!locale || locale === DEFAULT_LOCALE) return base;
  const localized = PAGE_SEO_LOCALES[locale]?.[clean];
  if (!localized) return base;
  return { ...base, ...localized };
}

export function getFaqsForRoute(path, locale = DEFAULT_LOCALE) {
  const clean = path && path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  if (clean === '/') {
    return (locale !== DEFAULT_LOCALE && HOME_FAQS_LOCALES[locale]) || HOME_FAQS;
  }
  const en = PRODUCT_FAQS[clean];
  if (!en) return null;
  return (locale !== DEFAULT_LOCALE && PRODUCT_FAQS_LOCALES[locale]?.[clean]) || en;
}

/* ------------------------------------------------------------------ */
/* Product entities                                                    */
/* ------------------------------------------------------------------ */

// Kept in sync with the specification tables rendered on each product page.
const PRODUCTS = {
  '/household-matches': {
    name: 'Household Safety Matches (Models 5S, 5E, 5H)',
    category: 'Household Safety Matches',
    description:
      'Pocket wooden safety matches on 40mm and 42mm poplar splints, averaging 40 sticks per box on white duplex board, with plain or dotted side friction and zero-afterglow carbonised splints.',
    material: 'Poplar wood splint, white duplex board, non-toxic strike head',
    image: '/assets/images/products/household/household-match-01.png',
    sizes: ['49 x 35 x 12 mm', '51 x 35 x 14 mm', '52 x 35 x 12 mm']
  },
  '/wax-matches': {
    name: 'Moisture-Proof Paraffin Wax Safety Matches',
    category: 'Wax Safety Matches',
    description:
      'Paraffin-impregnated kraft paper splint matches for coastal, tropical and high-humidity markets. Models WM, WSM, 5H and a 200-stick Wax Kitchen box.',
    material: 'Paraffin-impregnated kraft paper splint, non-toxic strike head',
    image: '/assets/images/products/wax/wax-match-01.png',
    sizes: ['40 x 33 x 12 mm', '43 x 30 x 10 mm', '53 x 37 x 11 mm', '70 x 48 x 22 mm']
  },
  '/kitchen-matches': {
    name: 'Extra Long Kitchen Safety Matches (KB Series)',
    category: 'Kitchen Safety Matches',
    description:
      'Extra long wooden kitchen matches on 47mm and 53mm splints in 100, 200, 240 and 250 stick fills, with damp-proof heads and high-friction side strikers for gas stoves, ovens and tall candles.',
    material: 'Selected hardwood splint, printed board, non-toxic strike head',
    image: '/assets/images/products/kitchen/kitchen-match-01.png',
    sizes: ['71 x 53 x 25 mm', '84 x 50 x 28 mm', '118 x 65 x 25 mm']
  },
  '/barbeque-matches': {
    name: 'Barbeque & Fireplace Safety Matches (BBQ Series)',
    category: 'Barbeque & Fireplace Matches',
    description:
      'Heavy-duty long matches with 96mm, 170mm and 280mm softwood splints at 3 x 3 mm thickness, giving a wind-resistant extended burn for charcoal grills, camp fires and log fireplaces.',
    material: 'Softwood splint 3 x 3 mm, damp-proofed striker panel',
    image: '/assets/images/products/barbeque/barbeque-match-01.png',
    sizes: ['110 x 65 x 20 mm', '182 x 63.5 x 18 mm', '290 x 60 x 29 mm']
  },
  '/promotional-matches': {
    name: 'Custom Printed Promotional & Hotel Matchboxes',
    category: 'Promotional & Hotel Matches',
    description:
      'Bespoke OEM matchboxes and matchbooks on 300 GSM art board with 4-colour wet offset printing, metallic foil stamping, spot UV, black dyed splints and custom match head colours. Formats BX-09 to BX-15.',
    material: '300 GSM art board cover, poplar or black dyed splint',
    image: '/assets/images/products/promotional/PromotionalMatchProduct3.png',
    sizes: ['112 x 26 x 9 mm', '112 x 17.5 x 17.5 mm', '84 x 18 x 18 mm', '84 x 26.5 x 9 mm']
  }
};

/* ------------------------------------------------------------------ */
/* JSON-LD graph                                                       */
/* ------------------------------------------------------------------ */

function organizationNode() {
  return {
    '@type': ['Organization', 'Manufacturer'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: SITE.shortName,
    // The organisation's own website is the corporate domain, not this
    // product catalogue — the catalogue is the WebSite node below.
    url: SITE.companyUrl,
    logo: SITE.logo,
    image: SITE.logo,
    email: SITE.email,
    telephone: SITE.phoneTel,
    parentOrganization: { '@type': 'Organization', name: SITE.parentOrganization },
    // Deliberately states both product lines. This Organization node is
    // reused on every route (see buildSchema below) with a stable @id, so
    // it is the one place in our JSON-LD where an AI system reads the full
    // company identity rather than just what one product-focused page sells —
    // the mismatch between this description and the rest of the company's
    // web footprint was the main reason entity resolution skewed "incense
    // company" instead of "safety match manufacturer" for matches queries.
    description: `${SITE.name} is part of ${SITE.parentOrganization}, manufacturing export-grade safety matches (wooden, wax, kitchen, barbeque and custom promotional) as well as incense sticks and incense cones, from Sivakasi, Tamil Nadu, India, exporting by FCL container to ${SITE.exportCountries}+ countries. This site presents the safety matches catalogue in full detail.`,
    knowsAbout: [
      'Safety Matches Manufacturing',
      'Incense Stick Manufacturing',
      'Incense Cone Manufacturing',
      'FCL Container Export',
      'OEM Private Label Manufacturing'
    ],
    address: { '@type': 'PostalAddress', ...SITE.headOffice },
    location: {
      '@type': 'Place',
      name: SITE.plant.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.plant.addressLocality,
        addressRegion: SITE.plant.addressRegion,
        postalCode: SITE.plant.postalCode,
        addressCountry: SITE.plant.addressCountry
      }
    },
    hasCredential: SITE.certifications,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phoneTel,
        email: SITE.email,
        contactType: 'sales',
        areaServed: ['Worldwide', 'Africa', 'Europe', 'Middle East', 'Americas', 'Asia'],
        availableLanguage: ['English', 'French', 'Spanish', 'Portuguese', 'Arabic', 'Hindi', 'Tamil']
      }
    ],
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {})
  };
}

function websiteNode(locale = DEFAULT_LOCALE) {
  const lang = getLocaleConfig(locale).htmlLang;
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.siteName,
    description: `Safety match product catalogue and export specifications from ${SITE.name}, Sivakasi, India.`,
    inLanguage: lang,
    publisher: { '@id': ORG_ID }
  };
}

function webPageNode(path, seo, locale = DEFAULT_LOCALE) {
  const lang = getLocaleConfig(locale).htmlLang;
  return {
    '@type': 'WebPage',
    '@id': `${absoluteLocalizedUrl(path, locale)}#webpage`,
    url: absoluteLocalizedUrl(path, locale),
    name: seo.title,
    description: seo.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: absoluteUrl(seo.image),
    inLanguage: lang
  };
}

function breadcrumbNode(path, seo, locale = DEFAULT_LOCALE) {
  if (path === '/') return null;

  const productPaths = Object.keys(PRODUCTS);
  const trail = [{ name: 'Home', item: absoluteLocalizedUrl('/', locale) }];

  if (productPaths.includes(path)) {
    trail.push({ name: 'Our Products', item: absoluteLocalizedUrl('/our-products', locale) });
  } else if (path.startsWith('/blog/')) {
    trail.push({ name: 'Blog', item: absoluteLocalizedUrl('/blog', locale) });
  }

  trail.push({
    name: seo.breadcrumb || seo.title.split('|')[0].trim(),
    item: absoluteLocalizedUrl(path, locale)
  });

  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteLocalizedUrl(path, locale)}#breadcrumb`,
    itemListElement: trail.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.item
    }))
  };
}

function blogArticleNode(path, seo, locale = DEFAULT_LOCALE) {
  const post = getBlogPostByPath(path);
  if (!post) return null;

  return {
    '@type': 'BlogPosting',
    '@id': `${absoluteLocalizedUrl(path, locale)}#article`,
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.companyUrl
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${absoluteLocalizedUrl(path, locale)}#webpage` },
    articleSection: post.category,
    inLanguage: getLocaleConfig(locale).htmlLang
  };
}

function blogListNode(locale = DEFAULT_LOCALE) {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteLocalizedUrl('/blog', locale)}#bloglist`,
    name: 'Glovel Matches LLP safety matches export blog',
    itemListElement: BLOG_POSTS.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: post.title,
      url: absoluteLocalizedUrl(blogPostPath(post.slug), locale)
    }))
  };
}

function faqNode(path, faqs, locale = DEFAULT_LOCALE) {
  if (!faqs || !faqs.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteLocalizedUrl(path, locale)}#faq`,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a.replace(/\n/g, ' ') }
    }))
  };
}

function productNode(path) {
  const product = PRODUCTS[path];
  if (!product) return null;

  return {
    '@type': 'Product',
    '@id': `${absoluteUrl(path)}#product`,
    name: product.name,
    category: product.category,
    description: product.description,
    material: product.material,
    image: absoluteUrl(product.image),
    brand: { '@type': 'Brand', name: SITE.name },
    manufacturer: { '@id': ORG_ID },
    countryOfOrigin: { '@type': 'Country', name: 'India' },
    additionalProperty: product.sizes.map((size) => ({
      '@type': 'PropertyValue',
      name: 'Matchbox size',
      value: size
    })),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      offerCount: 1,
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitText: '20FT FCL minimum order quantity'
      },
      seller: { '@id': ORG_ID }
    }
  };
}

function productListNode() {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl('/our-products')}#catalog`,
    name: 'Glovel Matches LLP safety match catalogue',
    itemListElement: Object.entries(PRODUCTS).map(([path, product], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: product.name,
      url: absoluteUrl(path)
    }))
  };
}

/**
 * Build the full JSON-LD @graph for a route. Organization and WebSite are
 * repeated on every page by design — they share a stable @id, so search engines
 * merge them into one entity rather than treating them as duplicates.
 */
export function buildSchema(path, locale = DEFAULT_LOCALE) {
  const clean = path && path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  const seo = getPageSeo(clean, locale);

  const graph = [organizationNode(), websiteNode(locale), webPageNode(clean, seo, locale)];

  const breadcrumb = breadcrumbNode(clean, seo, locale);
  if (breadcrumb) graph.push(breadcrumb);

  const product = productNode(clean);
  if (product) graph.push(product);

  if (clean === '/our-products') graph.push(productListNode());
  if (clean === '/blog') graph.push(blogListNode(locale));

  const article = blogArticleNode(clean, seo, locale);
  if (article) graph.push(article);

  const faqs = getFaqsForRoute(clean, locale);
  const faq = faqNode(clean, faqs, locale);
  if (faq) graph.push(faq);

  return { '@context': 'https://schema.org', '@graph': graph };
}
