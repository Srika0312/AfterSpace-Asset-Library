// The Afterspace — CSS & DOM asset generator
// Generates pure CSS and DOM elements without SVG.
// Works both in the browser and in Node.

import { buildSketch, shadowShapes } from './sketch.js';

const round = (n) => Math.round(n * 100) / 100;

function computeScene(asset, opts = {}) {
  const {
    angle = 0,
    padding = 16,
    includeShadow = true,
    unit = 100,
  } = opts;

  const g = buildSketch(asset, angle, unit);
  const shadows = includeShadow ? shadowShapes(asset, g) : [];
  const b = g.bounds;

  let minX = b.minX;
  let minY = b.minY;
  let maxX = b.maxX;
  let maxY = b.maxY;

  for (const s of shadows) {
    for (const [x, y] of s.pts) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (!Number.isFinite(minX)) {
    minX = 0;
    minY = 0;
    maxX = 100;
    maxY = 100;
  }

  const x0 = minX - padding;
  const y0 = minY - padding;
  const w = Math.max(1, maxX - minX + padding * 2);
  const h = Math.max(1, maxY - minY + padding * 2);

  const layers = [];

  // 1. Shadows first (contact plate)
  for (const s of shadows) {
    const polygonPts = s.pts.map(([x, y]) => `${round(x - x0)}px ${round(y - y0)}px`).join(', ');
    layers.push({
      kind: 'poly',
      fill: s.fill,
      clip: `polygon(${polygonPts})`,
    });
  }

  // 2. Geometry items sorted by depth
  for (const it of g.items) {
    if (it.kind === 'poly') {
      const polygonPts = it.pts.map(([x, y]) => `${round(x - x0)}px ${round(y - y0)}px`).join(', ');
      layers.push({
        kind: 'poly',
        fill: it.fill,
        clip: `polygon(${polygonPts})`,
      });
    } else {
      const diam = it.r * 2;
      const left = it.cx - it.r - x0;
      const top = it.cy - it.r - y0;
      layers.push({
        kind: 'circle',
        fill: it.fill,
        left: round(left),
        top: round(top),
        w: round(diam),
        h: round(diam),
      });
    }
  }

  return { w: round(w), h: round(h), layers };
}

/**
 * Generate a standalone CSS stylesheet for an asset.
 * @param {object} asset
 * @param {object} opts
 * @returns {string} CSS rule definitions
 */
export function assetToCSS(asset, opts = {}) {
  const { w, h, layers } = computeScene(asset, opts);
  const key = asset.key || 'asset';

  const lines = [
    `/* The Afterspace — ${asset.name || key} CSS */`,
    `.as-asset-${key} {`,
    `  position: relative;`,
    `  display: inline-block;`,
    `  width: ${w}px;`,
    `  height: ${h}px;`,
    `}`,
    `.as-asset-${key} > i {`,
    `  position: absolute;`,
    `  display: block;`,
    `  pointer-events: none;`,
    `}`,
  ];

  layers.forEach((l, i) => {
    lines.push(`.as-asset-${key} > .l-${i} {`);
    if (l.kind === 'poly') {
      lines.push(`  inset: 0;`);
      lines.push(`  background: ${l.fill};`);
      lines.push(`  clip-path: ${l.clip};`);
    } else {
      lines.push(`  left: ${l.left}px;`);
      lines.push(`  top: ${l.top}px;`);
      lines.push(`  width: ${l.w}px;`);
      lines.push(`  height: ${l.h}px;`);
      lines.push(`  border-radius: 50%;`);
      lines.push(`  background: ${l.fill};`);
    }
    lines.push(`}`);
  });

  return lines.join('\n');
}

/**
 * Generate inline-styled pure HTML/DOM for an asset (zero external stylesheet dependency).
 * @param {object} asset
 * @param {object} opts
 * @returns {string} HTML string
 */
export function assetToHTML(asset, opts = {}) {
  const { w, h, layers } = computeScene(asset, opts);
  const key = asset.key || 'asset';

  const out = [];
  out.push(
    `<div class="as-asset as-asset-${key}" style="position:relative;width:${w}px;height:${h}px;display:inline-block;" role="img" aria-label="${asset.name || key}">`
  );

  layers.forEach((l, i) => {
    if (l.kind === 'poly') {
      out.push(
        `  <i class="l-${i}" style="position:absolute;inset:0;background:${l.fill};clip-path:${l.clip};pointer-events:none;"></i>`
      );
    } else {
      out.push(
        `  <i class="l-${i}" style="position:absolute;left:${l.left}px;top:${l.top}px;width:${l.w}px;height:${l.h}px;border-radius:50%;background:${l.fill};pointer-events:none;"></i>`
      );
    }
  });

  out.push(`</div>`);
  return out.join('\n');
}

/**
 * Generate a combined CSS + HTML copyable snippet.
 */
export function assetToCSSSnippet(asset, opts = {}) {
  const css = assetToCSS(asset, opts);
  const { w, h, layers } = computeScene(asset, opts);
  const key = asset.key || 'asset';

  const tags = layers.map((_, i) => `    <i class="l-${i}"></i>`).join('\n');
  const html = [
    `<div class="as-asset as-asset-${key}" role="img" aria-label="${asset.name || key}">`,
    tags,
    `</div>`,
  ].join('\n');

  return `<style>\n${css}\n</style>\n\n${html}`;
}
