// The Afterspace — asset library scanner, loader and validator.
// Used by the dev server, the CLI validator, and future build tools.

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildSketch } from '../../assets/lib/sketch.js';
import { CATEGORIES, CATEGORY_ORDER } from '../../assets/lib/palette.js';

export const ROOT = path.resolve(import.meta.dirname, '../..');
export const ASSET_ROOT = path.join(ROOT, 'assets');

const CACHE = new Map();

const titleize = (s) =>
  s
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();

export function walk(dir, out = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(abs, out);
    else out.push(abs);
  }
  return out;
}

export function listAssetFiles() {
  const libDir = path.join(ASSET_ROOT, 'lib') + path.sep;
  return walk(ASSET_ROOT)
    .filter((f) => f.endsWith('.js') && !f.startsWith(libDir))
    .sort((a, b) => a.localeCompare(b));
}

function cleanError(err) {
  const text = err?.stack || err?.message || String(err);
  return String(text).split('\n').slice(0, 5).join('\n');
}

function validateRecord(asset, file, stat) {
  const rel = path.relative(ASSET_ROOT, file);
  const folder = rel.split(path.sep)[0];
  const warnings = [];
  const errors = [];
  const stats = { calls: 0, colors: 0, shapes: 0, bounds: null };

  if (!asset || typeof asset !== 'object') {
    errors.push('No default export found.');
    return { rel, folder, warnings, errors, stats };
  }
  if (typeof asset.draw !== 'function') {
    errors.push('Asset must export a draw(g) function.');
  }

  const key = String(asset.key || path.basename(file, '.js'));
  if (!asset.name) warnings.push('Missing name.');
  if (!asset.blurb) warnings.push('Missing blurb.');
  if (!asset.what) warnings.push('Missing "what" (short hover descriptor).');
  if (!asset.footprint || asset.footprint.length !== 2) warnings.push('Missing footprint [w,d].');
  if (!Array.isArray(asset.tags) || !asset.tags.length) warnings.push('No tags.');
  if (!asset.status) warnings.push('Missing review status.');
  if (!CATEGORIES[asset.category]) warnings.push(`Unknown category "${asset.category}".`);
  if (key !== path.basename(file, '.js')) warnings.push(`Key "${key}" differs from filename.`);
  if (asset.status && !['review', 'approved'].includes(asset.status)) {
    warnings.push(`Unknown status "${asset.status}".`);
  }

  if (typeof asset.draw === 'function') {
    const colors = new Set();
    let calls = 0;
    let shapes = 0;
    const union = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    try {
      for (const angle of [0, 90, 180, 270]) {
        const g = buildSketch(asset, angle, 1, 0);
        calls = Math.max(calls, g.calls);
        shapes = Math.max(shapes, g.items.length);
        for (const c of g.colors) colors.add(c);
        const b = g.bounds;
        union.minX = Math.min(union.minX, b.minX);
        union.minY = Math.min(union.minY, b.minY);
        union.maxX = Math.max(union.maxX, b.maxX);
        union.maxY = Math.max(union.maxY, b.maxY);
      }
      stats.calls = calls;
      stats.colors = colors.size;
      stats.shapes = shapes;
      stats.bounds = {
        w: Math.round((union.maxX - union.minX) * 100) / 100,
        h: Math.round((union.maxY - union.minY) * 100) / 100,
      };
      if (calls > 12) warnings.push(`${calls} draw calls — above the 12-shape minimal budget.`);
      if (colors.size > 6) warnings.push(`${colors.size} palette colours — above the 6-colour budget.`);
    } catch (err) {
      errors.push('draw() failed: ' + cleanError(err));
    }
  }

  return { rel, folder, key, warnings, errors, stats };
}

async function loadRecord(file) {
  const stat = await fsp.stat(file);
  const cached = CACHE.get(file);
  if (cached && cached.mtime === stat.mtimeMs) return cached.record;

  const base = path.basename(file, '.js');
  let asset = null;
  let importError = null;
  try {
    const mod = await import(pathToFileURL(file).href + '?v=' + stat.mtimeMs);
    asset = mod.default;
  } catch (err) {
    importError = cleanError(err);
  }

  const rel = path.relative(ASSET_ROOT, file);
  const folder = rel.split(path.sep)[0];
  let check;
  if (importError) {
    check = {
      rel,
      folder,
      key: base,
      name: titleize(base),
      warnings: [],
      errors: ['Import failed: ' + importError],
      stats: { calls: 0, colors: 0, shapes: 0, bounds: null },
    };
  } else {
    check = validateRecord(asset, file, stat);
  }

  const record = {
    key: check.key || base,
    name: asset?.name || titleize(base),
    category: CATEGORIES[asset?.category] ? asset.category : folder,
    categoryLabel: CATEGORIES[asset?.category]?.label || titleize(folder),
    blurb: asset?.blurb || 'Uncategorised sketch. Add a blurb to describe it.',
    what: asset?.what || asset?.tags?.[0] || asset?.category || 'asset',
    footprint: Array.isArray(asset?.footprint) ? asset.footprint : [1, 1],
    height: Number(asset?.height) || 1,
    tags: Array.isArray(asset?.tags) ? asset.tags : [],
    refs: Array.isArray(asset?.refs) ? asset.refs : [],
    hero: Number.isFinite(asset?.hero) ? asset.hero : 0,
    status: asset?.status === 'approved' ? 'approved' : 'review',
    motion: Boolean(asset?.motion),
    shadow: asset?.shadow !== false,
    file: check.rel.split(path.sep).join('/'),
    abs: file,
    mtime: stat.mtimeMs,
    asset,
    warnings: check.warnings,
    errors: check.errors,
    stats: check.stats,
    hasPreview: Boolean(asset && typeof asset.draw === 'function'),
  };

  CACHE.set(file, { mtime: stat.mtimeMs, record });
  return record;
}

export async function buildLibrary() {
  const files = listAssetFiles();
  const records = await Promise.all(files.map((f) => loadRecord(f).catch((err) => ({
    key: path.basename(f, '.js'),
    name: titleize(path.basename(f, '.js')),
    category: CATEGORY_ORDER[0] || 'space',
    categoryLabel: CATEGORIES[CATEGORY_ORDER[0]]?.label || 'Space & Comms',
    blurb: 'Asset failed to load.',
    what: 'error',
    footprint: [1, 1],
    height: 1,
    tags: [],
    refs: [],
    hero: 0,
    status: 'review',
    motion: false,
    shadow: true,
    file: path.relative(ASSET_ROOT, f).split(path.sep).join('/'),
    abs: f,
    mtime: 0,
    asset: null,
    warnings: [],
    errors: ['Loader failed: ' + cleanError(err)],
    stats: { calls: 0, colors: 0, shapes: 0, bounds: null },
    hasPreview: false,
  }))));

  // Resolve duplicate keys deterministically: first file wins, others are errors.
  const seen = new Map();
  for (const r of records) {
    if (!seen.has(r.key)) {
      seen.set(r.key, r);
    } else {
      const first = seen.get(r.key);
      r.errors.push(`Duplicate key "${r.key}" (also in ${first.file}).`);
      r.hasPreview = false;
      first.warnings.push(`Key also used by ${r.file}.`);
    }
  }

  const order = new Map(CATEGORY_ORDER.map((c, i) => [c, i]));
  records.sort(
    (a, b) =>
      (order.get(a.category) ?? 99) - (order.get(b.category) ?? 99) ||
      a.name.localeCompare(b.name),
  );
  return records;
}

export function toPublic(r) {
  return {
    key: r.key,
    name: r.name,
    category: r.category,
    categoryLabel: r.categoryLabel,
    blurb: r.blurb,
    what: r.what,
    footprint: r.footprint,
    height: r.height,
    tags: r.tags,
    refs: r.refs,
    hero: r.hero,
    status: r.status,
    motion: r.motion,
    shadow: r.shadow,
    file: r.file,
    mtime: r.mtime,
    warnings: r.warnings,
    errors: r.errors,
    stats: r.stats,
    hasPreview: r.hasPreview,
  };
}

export function findRecord(records, key) {
  return records.find((r) => r.key === key) || null;
}
