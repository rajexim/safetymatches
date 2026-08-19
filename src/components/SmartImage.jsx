import React from 'react';
import manifest from '../generated/image-manifest.json';

/**
 * Renders a responsive WebP <img> using the variants produced by
 * `npm run images`, falling back to the original path for anything the manifest
 * does not know about — CMS uploads, remote URLs, SVGs.
 *
 * Always pass `sizes`: without it the browser assumes the image fills the
 * viewport and picks the widest variant, which throws away most of the saving.
 */

function variantUrl(src, width) {
  const dot = src.lastIndexOf('.');
  return `${src.slice(0, dot)}-${width}.webp`;
}

export default function SmartImage({
  src,
  alt,
  sizes = '100vw',
  // Pin the image to one specific variant instead of offering a srcset. Use
  // this for anything that is also <link rel=preload>ed: with a fractional
  // devicePixelRatio the preload scanner and the layout engine can pick
  // different candidates from the same srcset, and the image gets fetched
  // twice. A single candidate makes the choice deterministic.
  variant,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  ...rest
}) {
  const entry = src ? manifest[src] : null;

  if (entry && variant) {
    const chosen = entry.v.includes(variant) ? variant : entry.v[entry.v.length - 1];
    return (
      <img
        src={variantUrl(src, chosen)}
        alt={alt}
        width={width ?? entry.w}
        height={height ?? entry.h}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        {...rest}
      />
    );
  }

  if (!entry) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        {...rest}
      />
    );
  }

  const widths = entry.v;
  const srcSet = widths.map((w) => `${variantUrl(src, w)} ${w}w`).join(', ');

  return (
    <img
      // Point src at a mid-sized variant so browsers that ignore srcSet still
      // get something reasonable rather than the full-resolution file.
      src={variantUrl(src, widths[Math.min(1, widths.length - 1)])}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      // Intrinsic dimensions from the source file reserve the right box and
      // prevent layout shift, whichever variant the browser chooses.
      width={width ?? entry.w}
      height={height ?? entry.h}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...rest}
    />
  );
}
