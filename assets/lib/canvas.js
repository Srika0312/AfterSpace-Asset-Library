// The Afterspace — Canvas 2D renderer and painter generator
// Pure Canvas 2D drawing and code generation. Works in the browser and in Node.

import { buildSketch, shadowShapes } from './sketch.js';

const TAU = Math.PI * 2;
const round = (n) => Math.round(n * 100) / 100;

/**
 * Draw an asset directly into any 2D canvas rendering context.
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} asset
 * @param {object} [opts]
 */
export function drawAsset(ctx, asset, opts = {}) {
  const {
    angle = 0,
    unit = 100,
    ox = 0,
    oy = 0,
    scale = 1,
    includeShadow = true,
    time = 0,
  } = opts;

  const g = buildSketch(asset, angle, unit, time);
  const shadows = includeShadow ? shadowShapes(asset, g) : [];

  ctx.save();
  if (ox || oy) ctx.translate(ox, oy);
  if (scale !== 1) ctx.scale(scale, scale);

  // 1. Contact shadows
  for (const s of shadows) {
    if (!s.pts?.length) continue;
    ctx.fillStyle = s.fill;
    ctx.beginPath();
    ctx.moveTo(s.pts[0][0], s.pts[0][1]);
    for (let i = 1; i < s.pts.length; i++) ctx.lineTo(s.pts[i][0], s.pts[i][1]);
    ctx.closePath();
    ctx.fill();
  }

  // 2. Geometry items sorted by depth
  for (const it of g.items) {
    if (it.kind === 'poly') {
      if (!it.pts?.length) continue;
      ctx.fillStyle = it.fill;
      ctx.beginPath();
      ctx.moveTo(it.pts[0][0], it.pts[0][1]);
      for (let i = 1; i < it.pts.length; i++) ctx.lineTo(it.pts[i][0], it.pts[i][1]);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = it.fill;
      ctx.beginPath();
      ctx.arc(it.cx, it.cy, it.r, 0, TAU);
      ctx.fill();
    }
  }

  ctx.restore();
}

/**
 * Generate a standalone, copy-pasteable JavaScript Canvas 2D painter function.
 * Zero external imports or engine dependencies required.
 * @param {object} asset
 * @param {object} [opts]
 * @returns {string} Pure Canvas 2D JavaScript function code
 */
export function assetToCanvasCode(asset, opts = {}) {
  const {
    angle = 0,
    unit = 100,
    includeShadow = true,
  } = opts;

  const g = buildSketch(asset, angle, unit);
  const shadows = includeShadow ? shadowShapes(asset, g) : [];
  const cleanName = (asset.name || asset.key || 'Asset')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace(/\s+/g, '');
  const fnName = 'draw' + cleanName;

  const lines = [
    `/**`,
    ` * Canvas 2D Painter: ${asset.name || asset.key}`,
    ` * Footprint: [${asset.footprint?.join(', ')}] | Height: ${asset.height}`,
    ` * @param {CanvasRenderingContext2D} ctx`,
    ` * @param {number} [ox=0] Origin X offset`,
    ` * @param {number} [oy=0] Origin Y offset`,
    ` * @param {number} [scale=1] Scale multiplier`,
    ` */`,
    `export function ${fnName}(ctx, ox = 0, oy = 0, scale = 1) {`,
    `  ctx.save();`,
    `  if (ox || oy) ctx.translate(ox, oy);`,
    `  if (scale !== 1) ctx.scale(scale, scale);`,
    ``,
  ];

  if (shadows.length) {
    lines.push(`  // Contact shadows`);
    for (const s of shadows) {
      lines.push(`  ctx.fillStyle = '${s.fill}';`);
      lines.push(`  ctx.beginPath();`);
      lines.push(`  ctx.moveTo(${round(s.pts[0][0])}, ${round(s.pts[0][1])});`);
      for (let i = 1; i < s.pts.length; i++) {
        lines.push(`  ctx.lineTo(${round(s.pts[i][0])}, ${round(s.pts[i][1])});`);
      }
      lines.push(`  ctx.closePath();`);
      lines.push(`  ctx.fill();`);
    }
    lines.push(``);
  }

  lines.push(`  // Geometry faces`);
  let lastFill = '';
  for (const it of g.items) {
    if (it.kind === 'poly') {
      if (it.fill !== lastFill) {
        lines.push(`  ctx.fillStyle = '${it.fill}';`);
        lastFill = it.fill;
      }
      lines.push(`  ctx.beginPath();`);
      lines.push(`  ctx.moveTo(${round(it.pts[0][0])}, ${round(it.pts[0][1])});`);
      for (let i = 1; i < it.pts.length; i++) {
        lines.push(`  ctx.lineTo(${round(it.pts[i][0])}, ${round(it.pts[i][1])});`);
      }
      lines.push(`  ctx.closePath();`);
      lines.push(`  ctx.fill();`);
    } else {
      if (it.fill !== lastFill) {
        lines.push(`  ctx.fillStyle = '${it.fill}';`);
        lastFill = it.fill;
      }
      lines.push(`  ctx.beginPath();`);
      lines.push(`  ctx.arc(${round(it.cx)}, ${round(it.cy)}, ${round(it.r)}, 0, Math.PI * 2);`);
      lines.push(`  ctx.fill();`);
    }
  }

  lines.push(``);
  lines.push(`  ctx.restore();`);
  lines.push(`}`);

  return lines.join('\n');
}
