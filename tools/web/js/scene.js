// The Afterspace — canvas scenes for cards, inspector and QA overlays.

import { buildSketch, shadowShapes } from '/assets/lib/sketch.js';

const TAU = Math.PI * 2;

function fillPoly(ctx, pts, fill) {
  if (!pts?.length) return;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawPlate(ctx, cx, cy, width, theme) {
  const half = width / 2;
  const halfH = width * 0.25;
  const grad = ctx.createLinearGradient(cx, cy - halfH, cx, cy + halfH);
  if (theme === 'night') {
    grad.addColorStop(0, 'rgba(255,246,226,0.018)');
    grad.addColorStop(0.55, 'rgba(255,246,226,0.055)');
    grad.addColorStop(1, 'rgba(255,246,226,0.008)');
  } else {
    grad.addColorStop(0, 'rgba(58,48,38,0.018)');
    grad.addColorStop(0.55, 'rgba(58,48,38,0.062)');
    grad.addColorStop(1, 'rgba(58,48,38,0.008)');
  }
  ctx.beginPath();
  ctx.moveTo(cx, cy - halfH);
  ctx.lineTo(cx + half, cy);
  ctx.lineTo(cx, cy + halfH);
  ctx.lineTo(cx - half, cy);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
}

function drawGrid(ctx, g, extent, theme, scale) {
  const lines = [];
  for (let i = -extent; i <= extent; i++) {
    lines.push([g.project(i, -extent, 0), g.project(i, extent, 0)]);
    lines.push([g.project(-extent, i, 0), g.project(extent, i, 0)]);
  }
  ctx.save();
  ctx.lineWidth = 1 / scale;
  ctx.strokeStyle = theme === 'night' ? 'rgba(255,246,226,0.10)' : 'rgba(58,48,38,0.13)';
  for (const [a, b] of lines) {
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
  }
  ctx.restore();
}

function drawHuman(ctx, x, groundY, scale, theme) {
  const fill = theme === 'night' ? 'rgba(255,246,226,0.24)' : 'rgba(58,48,38,0.24)';
  const bodyH = 0.82 * scale;
  const bw = 0.24 * scale;
  const headR = 0.11 * scale;
  const headY = groundY - bodyH - headR * 0.9;

  ctx.save();
  ctx.fillStyle = fill;

  ctx.beginPath();
  ctx.arc(x, headY, headR, 0, TAU);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x - bw / 2, groundY);
  ctx.lineTo(x - bw / 2, groundY - bodyH * 0.76);
  ctx.quadraticCurveTo(x, groundY - bodyH * 0.98, x + bw / 2, groundY - bodyH * 0.76);
  ctx.lineTo(x + bw / 2, groundY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = theme === 'night' ? 'rgba(255,246,226,0.42)' : 'rgba(58,48,38,0.4)';
  ctx.font = '600 8px Nunito, system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('1.8 m', x + bw / 2 + 6, groundY - bodyH * 0.5);
  ctx.restore();
}

/**
 * Paint a scene into a canvas. Sizes the backing store for DPR.
 * @returns {boolean} true when something was drawn
 */
export function paintCanvas(canvas, asset, opts = {}) {
  if (!canvas || !asset || typeof asset.draw !== 'function') return false;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssW = opts.w || canvas.clientWidth;
  const cssH = opts.h || canvas.clientHeight;
  if (!cssW || !cssH) return false;

  const pw = Math.max(1, Math.round(cssW * dpr));
  const ph = Math.max(1, Math.round(cssH * dpr));
  if (canvas.width !== pw) canvas.width = pw;
  if (canvas.height !== ph) canvas.height = ph;

  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  try {
    drawScene(ctx, asset, { ...opts, w: cssW, h: cssH });
    return true;
  } catch (err) {
    console.warn('[foundry] draw failed', asset.key, err);
    return false;
  }
}

export function drawScene(ctx, asset, opts) {
  const {
    w,
    h,
    angle = 0,
    plate = true,
    plateW,
    theme = 'day',
    time = 0,
    pad = 14,
    originY = 0.74,
    grid = false,
    human = false,
    fixedScale = 0,
    maxHeight = 0,
  } = opts;

  const g = buildSketch(asset, angle, 1, time);
  const shadows = shadowShapes(asset, g);
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
  if (!Number.isFinite(minX)) return;

  const oy = h * originY;
  const fit = Math.min(
    (w - pad * 2) / Math.max(0.001, maxX - minX),
    (oy - pad) / Math.max(0.001, -minY),
    (h - oy - pad) / Math.max(0.001, maxY),
  );
  let scale = Math.max(0.02, fit);
  if (fixedScale > 0) scale = Math.min(scale, fixedScale);
  if (maxHeight > 0) scale = Math.min(scale, maxHeight / Math.max(0.001, maxY - minY));

  const ox = w / 2 - ((minX + maxX) / 2) * scale;

  if (plate) {
    const fw = Math.max(asset.footprint?.[0] || 1, asset.footprint?.[1] || 1);
    const pw = plateW || Math.min(w * 0.74, 138 + fw * 10);
    drawPlate(ctx, ox, oy, pw, theme);
  }

  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);

  if (grid) {
    const fw = Math.max(asset.footprint?.[0] || 1, asset.footprint?.[1] || 1);
    const extent = Math.max(2, Math.ceil(fw / 2) + 1);
    drawGrid(ctx, g, extent, theme, scale);
  }

  for (let i = 0; i < shadows.length; i++) {
    const fill =
      theme === 'night'
        ? i === 0
          ? 'rgba(0,0,0,0.20)'
          : 'rgba(0,0,0,0.16)'
        : shadows[i].fill;
    fillPoly(ctx, shadows[i].pts, fill);
  }

  for (const it of g.items) {
    if (it.kind === 'poly') {
      fillPoly(ctx, it.pts, it.fill);
    } else {
      ctx.beginPath();
      ctx.arc(it.cx, it.cy, it.r, 0, TAU);
      ctx.fillStyle = it.fill;
      ctx.fill();
    }
  }

  ctx.restore();

  if (human) {
    const hx = ox + maxX * scale + 18;
    const hy = oy + maxY * scale + 2;
    if (hx < w - 24) drawHuman(ctx, hx, hy, scale, theme);
  }
}

export function paintSquint(canvas, asset, angle, theme = 'day') {
  if (!canvas || !asset) return false;
  const dpr = 2;
  const w = 72;
  const h = 48;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  try {
    drawScene(ctx, asset, {
      w,
      h,
      angle,
      plate: false,
      theme,
      pad: 2,
      originY: 0.82,
      maxHeight: 34,
    });
    return true;
  } catch {
    return false;
  }
}
