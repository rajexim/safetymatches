/**
 * Converts every raster image under public/assets/images to responsive WebP.
 *
 * Why this exists: the product photographs are 1254x1254 PNGs averaging ~1.2 MB,
 * but the gallery renders them as ~180px thumbnails. A single product page was
 * downloading roughly 25 MB of images to paint a grid of postage stamps. WebP
 * at the size actually displayed cuts that by well over 99%.
 *
 * For each source it emits <name>-<width>.webp at up to three widths (never
 * upscaling past the original) and records the result in a manifest that
 * SmartImage reads to build a srcset. Images with no manifest entry — anything
 * uploaded later through /admin — still render from their original path, just
 * without the responsive variants.
 *
 *   npm run images            generate variants + manifest
 *   npm run images -- --prune move the heavy originals out of public/
 *
 * Originals are moved to assets-source/ rather than deleted, and this script
 * reads from there on later runs, so re-encoding is always possible.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const PUBLIC_IMAGES = path.join(root, 'public', 'assets', 'images');
const SOURCE_ARCHIVE = path.join(root, 'assets-source', 'images');
const MANIFEST = path.join(root, 'src', 'generated', 'image-manifest.json');

const TARGET_WIDTHS = [400, 800, 1600];
const QUALITY = 78;
const RASTER = /\.(png|jpe?g|webp)$/i;
const VARIANT = /-\d+\.webp$/i;

const prune = process.argv.includes('--prune');

function walk(dir, base = dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else if (RASTER.test(entry.name) && !VARIANT.test(entry.name)) {
      out.push(path.relative(base, full).split(path.sep).join('/'));
    }
  }
  return out;
}

/** Public URL for a path relative to the images root. */
const urlFor = (rel) => `/assets/images/${rel}`;

/** Prefer the copy still in public/, fall back to the archive. */
function resolveSource(rel) {
  const live = path.join(PUBLIC_IMAGES, rel);
  if (fs.existsSync(live)) return live;
  const archived = path.join(SOURCE_ARCHIVE, rel);
  return fs.existsSync(archived) ? archived : null;
}

function variantPath(rel, width) {
  const dir = path.dirname(rel);
  const name = path.basename(rel, path.extname(rel));
  return dir === '.' ? `${name}-${width}.webp` : `${dir}/${name}-${width}.webp`;
}

const sources = [
  ...new Set([...walk(PUBLIC_IMAGES), ...walk(SOURCE_ARCHIVE)])
].sort();

const manifest = {};
let generated = 0;
let reused = 0;
let sourceBytes = 0;
let variantBytes = 0;

for (const rel of sources) {
  const source = resolveSource(rel);
  if (!source) continue;

  let meta;
  try {
    meta = await sharp(source).metadata();
  } catch (err) {
    console.warn(`skip  ${rel} — ${err.message}`);
    continue;
  }

  const { width, height } = meta;
  if (!width || !height) {
    console.warn(`skip  ${rel} — no dimensions`);
    continue;
  }

  sourceBytes += fs.statSync(source).size;

  // Never upscale: drop targets wider than the original, and if the original is
  // smaller than the narrowest target, just emit it at its own width.
  let widths = TARGET_WIDTHS.filter((w) => w < width);
  widths.push(width);
  widths = [...new Set(widths)].sort((a, b) => a - b);

  const variants = [];
  for (const w of widths) {
    const relOut = variantPath(rel, w);
    const absOut = path.join(PUBLIC_IMAGES, relOut);
    fs.mkdirSync(path.dirname(absOut), { recursive: true });

    if (fs.existsSync(absOut) && fs.statSync(absOut).mtimeMs >= fs.statSync(source).mtimeMs) {
      reused += 1;
    } else {
      await sharp(source)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(absOut);
      generated += 1;
    }

    variantBytes += fs.statSync(absOut).size;
    variants.push(w);
  }

  manifest[urlFor(rel)] = { w: width, h: height, v: variants };
}

fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 0)}\n`, 'utf8');

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
console.log(`sources     ${sources.length} images, ${mb(sourceBytes)}`);
console.log(`variants    ${generated} generated, ${reused} up to date, ${mb(variantBytes)} total`);
console.log(`manifest    ${path.relative(root, MANIFEST)} (${Object.keys(manifest).length} entries)`);

if (!prune) {
  console.log('\nRun with --prune to move the originals into assets-source/ so they are not deployed.');
} else {
  let moved = 0;
  let movedBytes = 0;
  for (const rel of sources) {
    // WebP sources are already small and are still referenced directly as the
    // largest variant, so leave them in place.
    if (/\.webp$/i.test(rel)) continue;

    const live = path.join(PUBLIC_IMAGES, rel);
    if (!fs.existsSync(live)) continue;

    const dest = path.join(SOURCE_ARCHIVE, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    movedBytes += fs.statSync(live).size;
    fs.renameSync(live, dest);
    moved += 1;
  }
  console.log(`\npruned      ${moved} originals (${mb(movedBytes)}) moved to assets-source/images/`);
}
