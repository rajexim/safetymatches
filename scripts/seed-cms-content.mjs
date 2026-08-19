import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { galleryFor, BANNER_ALT } from './product-image-alt.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const productsJson = JSON.parse(
  fs.readFileSync(path.join(root, 'src/config/products.json'), 'utf8')
);

const content = {
  version: 1,
  updatedAt: new Date().toISOString(),
  site: {
    phoneDisplay: '+91 99525 38046',
    phoneTel: '+919952538046',
    email: 'sales@glovel.in',
    brandTagline: 'Sivakasi Factory Direct Export Division',
    trustBadge: 'Sivakasi Factory Direct Export',
    heroCta: 'Request Factory Quotation',
    factoryBadge: 'Factory Direct Export'
  },
  banners: [
    {
      id: 'banner-1',
      image: '/assets/images/hero/banner 1.webp',
      tag: 'Sivakasi Factory Direct Export',
      title: "India's Premier Manufacturer & Exporter of Safety Matches",
      subtitle:
        'High ignition quality wooden poplar matches manufactured in Sivakasi for daily household use and bulk container shipping.'
    },
    {
      id: 'banner-2',
      image: '/assets/images/hero/banner 2.webp',
      tag: '100% Damp Proof Moisture Resistant',
      title: 'Paraffin Impregnated Moisture-Proof Wax Matches',
      subtitle:
        'Engineered specifically for coastal regions, rainy tropical environments, and humid climates across Africa and Latin America.'
    },
    {
      id: 'banner-3',
      image: '/assets/images/hero/banner 3.webp',
      tag: 'Custom OEM Branding and Hotel Line',
      title: 'Custom Printed Promotional and Hotel Matchboxes',
      subtitle:
        'Bespoke hotel matchbooks with gold foil stamping, embossed logos, custom hex head colors, and black dyed splints.'
    },
    {
      id: 'banner-4',
      image: '/assets/images/hero/banner 4.webp',
      tag: 'Heavy Duty Extra Long Line',
      title: 'Extra Long Kitchen and Barbeque Safety Matches',
      subtitle:
        '110mm to 280mm extra long wooden splints engineered for gas stoves, candles, outdoor grills, and log fireplaces.'
    }
  ],
  products: productsJson.map((p) => ({
    ...p,
    heroImage: p.showcaseImage,
    gallery: galleryFor(p.id)
  }))
};

// Banner alt text lives with the rest of the image descriptions so there is one
// place to edit it.
content.banners = content.banners.map((banner) => ({
  ...banner,
  alt: BANNER_ALT[banner.image] || banner.title
}));

fs.mkdirSync(path.join(root, 'content'), { recursive: true });
fs.mkdirSync(path.join(root, 'public/content'), { recursive: true });
const json = JSON.stringify(content, null, 2);
fs.writeFileSync(path.join(root, 'content/site-content.json'), json);
fs.writeFileSync(path.join(root, 'public/content/site-content.json'), json);
console.log('Seeded OK');
