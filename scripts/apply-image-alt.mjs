/**
 * Rewrites only the gallery alt/label fields in the CMS content files, leaving
 * every other edit made through /admin untouched. Safer than re-seeding when
 * the alt copy in product-image-alt.mjs changes.
 *
 *   npm run seo:alt
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { galleryFor, BANNER_ALT } from './product-image-alt.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const targets = [
  path.join(root, 'content', 'site-content.json'),
  path.join(root, 'public', 'content', 'site-content.json')
];

let updated = 0;
let skipped = 0;

for (const file of targets) {
  if (!fs.existsSync(file)) {
    console.log(`skip  ${path.relative(root, file)} (not found)`);
    continue;
  }

  const content = JSON.parse(fs.readFileSync(file, 'utf8'));

  content.banners = (content.banners || []).map((banner) => {
    const alt = BANNER_ALT[banner.image];
    if (!alt) return banner;
    updated += 1;
    return { ...banner, alt };
  });

  content.products = (content.products || []).map((product) => {
    let entries;
    try {
      entries = galleryFor(product.id);
    } catch {
      skipped += 1;
      return product;
    }

    // Match on src so images reordered or removed in the CMS keep their own
    // entry rather than silently inheriting a neighbour's description.
    const bySrc = new Map(entries.map((entry) => [entry.src, entry]));
    const gallery = (product.gallery || []).map((image) => {
      const match = bySrc.get(image.src);
      if (!match) return image;
      updated += 1;
      return { ...image, alt: match.alt, label: match.label };
    });

    return { ...product, gallery };
  });

  fs.writeFileSync(file, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
  console.log(`write ${path.relative(root, file)}`);
}

console.log(`${updated} gallery images described${skipped ? `, ${skipped} products skipped` : ''}`);
