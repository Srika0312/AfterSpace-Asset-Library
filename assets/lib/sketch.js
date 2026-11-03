// The Afterspace — isometric sketch engine
// Pure geometry. No DOM, no canvas, no SVG. Runs in the browser and in Node.
//
// World: x runs right-ish, y runs depth-ish, z is up. One unit = one tile.
// Screen: x = (x-y) * ISO_X, y = (x+y) * ISO_Y - z.  True 2:1-ish isometric.

import { shade } from './palette.js';

export const ISO_X = 0.8660254037844386;
export const ISO_Y = 0.5;
export const TAU = Math.PI * 2;

const VIEW = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
const EPS = 0.0001;

export class Sketch {
  constructor({ angle = 0, unit = 1 } = {}) {
    this.unit = unit;
    this.items = [];
    this._seq = 0;
    this.calls = 0;
    this.colors = new Set();
    this.setAngle(angle);
  }

  note(c) {
    if (typeof c === 'string' && c[0] === '#') this.colors.add(c);
    return c;
  }

  setAngle(deg) {
    this.angle = ((deg % 360) + 360) % 360;
    this.rad = (this.angle * Math.PI) / 180;
    this.cos = Math.cos(this.rad);
    this.sin = Math.sin(this.rad);
    return this;
  }

  rotate(x, y) {
    return [x * this.cos - y * this.sin, x * this.sin + y * this.cos];
  }

  rotNormal(n) {
    return [n[0] * this.cos - n[1] * this.sin, n[0] * this.sin + n[1] * this.cos, n[2]];
  }

  project(x, y, z = 0) {
    const [rx, ry] = this.rotate(x, y);
    return [
      (rx - ry) * ISO_X * this.unit,
      (rx + ry) * ISO_Y * this.unit - z * this.unit,
    ];
  }

  depth(x, y, z = 0) {
    const [rx, ry] = this.rotate(x, y);
    return rx + ry + z * 1.12;
  }

  visible(n) {
    const nr = this.rotNormal(n);
    return nr[0] * VIEW[0] + nr[1] * VIEW[1] + nr[2] * VIEW[2] > EPS;
  }

  sideFill(nr, c, left, right) {
    const sx = nr[0] - nr[1];
    if (left || right) return sx < 0 ? left || right : right || left;
    if (sx < -0.35) return shade(c, 0.91);
    if (sx > 0.35) return shade(c, 0.72);
    return shade(c, 0.81);
  }

  _pushPoly(pts, fill, depth) {
    if (!pts.length) return;
    this.items.push({ kind: 'poly', pts, fill, depth, seq: this._seq++ });
  }

  _face(points, fill, normal = null, bias = 0) {
    if (normal && !this.visible(normal)) return false;
    let d = 0;
    for (const [x, y, z = 0] of points) d += this.depth(x, y, z);
    this._pushPoly(
      points.map(([x, y, z = 0]) => this.project(x, y, z)),
      fill,
      d / points.length + bias,
    );
    return true;
  }

  // ── Solids ────────────────────────────────────────────────────────────────

  box({ x = 0, y = 0, z = 0, w = 1, d = 1, h = 1, c = '#999999', top, left, right, bias = 0 } = {}) {
    this.calls++;
    this.note(c);
    const x0 = x - w / 2;
    const x1 = x + w / 2;
    const y0 = y - d / 2;
    const y1 = y + d / 2;
    const z0 = z;
    const z1 = z + h;

    // top
    this._face(
      [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]],
      top || shade(c, 1.07),
      [0, 0, 1],
      bias,
    );

    const sides = [
      { n: [0, 1, 0], p: [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]] },
      { n: [1, 0, 0], p: [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]] },
      { n: [0, -1, 0], p: [[x1, y0, z0], [x0, y0, z0], [x0, y0, z1], [x1, y0, z1]] },
      { n: [-1, 0, 0], p: [[x0, y1, z0], [x0, y0, z0], [x0, y0, z1], [x0, y1, z1]] },
    ];
    for (const s of sides) {
      const nr = this.rotNormal(s.n);
      if (nr[0] * VIEW[0] + nr[1] * VIEW[1] + nr[2] * VIEW[2] <= EPS) continue;
      this._face(s.p, this.sideFill(nr, c, left, right), null, bias);
    }
    return this;
  }

  roof({ x = 0, y = 0, z = 0, w = 1.4, d = 1.1, h = 0.65, c = '#B5623F', gable = '#EFEADC', ridge = 'x', bias = 0 } = {}) {
    this.calls++;
    this.note(c);
    this.note(gable);
    const x0 = x - w / 2;
    const x1 = x + w / 2;
    const y0 = y - d / 2;
    const y1 = y + d / 2;
    const zr = z + h;

    if (ridge === 'x') {
      const yr = y;
      this._faceShaded([[x0, y1, z], [x1, y1, z], [x1, yr, zr], [x0, yr, zr]], c, [0, 1, 0.55], bias);
      this._faceShaded([[x1, y0, z], [x0, y0, z], [x0, yr, zr], [x1, yr, zr]], c, [0, -1, 0.55], bias);
      this._faceShaded([[x0, y0, z], [x0, y1, z], [x0, yr, zr]], gable, [-1, 0, 0], bias);
      this._faceShaded([[x1, y1, z], [x1, y0, z], [x1, yr, zr]], gable, [1, 0, 0], bias);
    } else {
      const xr = x;
      this._faceShaded([[x1, y0, z], [x1, y1, z], [xr, y1, zr], [xr, y0, zr]], c, [1, 0, 0.55], bias);
      this._faceShaded([[x0, y1, z], [x0, y0, z], [xr, y0, zr], [xr, y1, zr]], c, [-1, 0, 0.55], bias);
      this._faceShaded([[x0, y0, z], [x1, y0, z], [xr, y0, zr]], gable, [0, -1, 0], bias);
      this._faceShaded([[x1, y1, z], [x0, y1, z], [xr, y1, zr]], gable, [0, 1, 0], bias);
    }
    return this;
  }

  _faceShaded(points, c, normal, bias = 0) {
    const nr = this.rotNormal(normal);
    if (nr[0] * VIEW[0] + nr[1] * VIEW[1] + nr[2] * VIEW[2] <= EPS) return false;
    return this._face(points, this.sideFill(nr, c), null, bias);
  }

  cyl({
    x = 0,
    y = 0,
    z = 0,
    r = 0.5,
    h = 1,
    c = '#999999',
    axis = 'z',
    segments = 12,
    r2 = null,
    top,
    bias = 0,
  } = {}) {
    this.calls++;
    this.note(c);
    if (top) this.note(top);
    const n = Math.max(6, Math.round(segments));
    const rt = r2 === null ? r : r2;
    const rings = [];
    const normals = [];

    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      let b;
      let t;
      let nr;
      if (axis === 'z') {
        b = [x + r * ca, y + r * sa, z];
        t = [x + rt * ca, y + rt * sa, z + h];
        nr = [ca, sa, 0];
      } else if (axis === 'x') {
        b = [x - h / 2, y + r * ca, z + r * sa];
        t = [x + h / 2, y + rt * ca, z + rt * sa];
        nr = [0, ca, sa];
      } else {
        b = [x + r * ca, y - h / 2, z + r * sa];
        t = [x + rt * ca, y + h / 2, z + rt * sa];
        nr = [ca, 0, sa];
      }
      rings.push([b, t]);
      normals.push(nr);
    }

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const [bi, ti] = rings[i];
      const [bj, tj] = rings[j];
      const nr = this.rotNormal(normals[i]);
      if (nr[0] * VIEW[0] + nr[1] * VIEW[1] + nr[2] * VIEW[2] <= EPS) continue;
      const fill = this.sideFill(nr, c);
      if (this._face([bi, bj, tj, ti], fill, null, bias)) {
        // drawn; no-op branch keeps shape readable
      }
    }

    // Caps
    const capFill = top || shade(c, 1.07);
    if (axis === 'z') {
      this._face(
        rings.map(([b]) => b),
        shade(c, 0.78),
        [0, 0, -1],
        bias,
      );
      if (rt > 0.001) {
        this._face(
          rings.map(([, t]) => t),
          capFill,
          [0, 0, 1],
          bias,
        );
      }
    } else if (axis === 'x') {
      const low = x - h / 2;
      const high = x + h / 2;
      const capA = rings.map(([b]) => [low, b[1], b[2]]);
      const capB = rings.map(([, t]) => [high, t[1], t[2]]);
      for (const [pts, normal] of [
        [capA, [-1, 0, 0]],
        [capB, [1, 0, 0]],
      ]) {
        const nr = this.rotNormal(normal);
        if (nr[0] * VIEW[0] + nr[1] * VIEW[1] + nr[2] * VIEW[2] <= EPS) continue;
        this._face(pts, this.sideFill(nr, capFill), null, bias + 0.01);
      }
    } else {
      const low = y - h / 2;
      const high = y + h / 2;
      const capA = rings.map(([b]) => [b[0], low, b[2]]);
      const capB = rings.map(([, t]) => [t[0], high, t[2]]);
      for (const [pts, normal] of [
        [capA, [0, -1, 0]],
        [capB, [0, 1, 0]],
      ]) {
        const nr = this.rotNormal(normal);
        if (nr[0] * VIEW[0] + nr[1] * VIEW[1] + nr[2] * VIEW[2] <= EPS) continue;
        this._face(pts, this.sideFill(nr, capFill), null, bias + 0.01);
      }
    }
    return this;
  }

  // ── Billboards / decals ───────────────────────────────────────────────────

  /** Flat screen-space circle anchored to a world point. Canopies, berries, lamps. */
  circle({ x = 0, y = 0, z = 0, r = 0.5, c = '#999999', dx = 0, dy = 0, bias = 0.15 } = {}) {
    this.calls++;
    this.note(c);
    const [ax, ay] = this.project(x, y, z);
    this.items.push({
      kind: 'circle',
      cx: ax + dx * this.unit,
      cy: ay + dy * this.unit,
      r: r * this.unit,
      fill: c,
      depth: this.depth(x, y, z) + bias,
      seq: this._seq++,
    });
    return this;
  }

  /** Flat screen-space polygon anchored to a world point. Rotates in 2D only. */
  decal({ x = 0, y = 0, z = 0, points = [], c = '#999999', rotate = 0, scale = 1, bias = 0.25 } = {}) {
    this.calls++;
    this.note(c);
    const [ax, ay] = this.project(x, y, z);
    const a = (rotate * Math.PI) / 180;
    const ca = Math.cos(a) * scale;
    const sa = Math.sin(a) * scale;
    const pts = points.map(([px, py]) => [
      ax + (px * ca - py * sa) * this.unit,
      ay + (px * sa + py * ca) * this.unit,
    ]);
    this._pushPoly(pts, c, this.depth(x, y, z) + bias);
    return this;
  }

  /** Screen-space polygon at absolute sketch coordinates. Used for ground plates. */
  screen({ points = [], c = '#999999', depth = -1e6, bias = 0 } = {}) {
    this._pushPoly(points, c, depth + bias);
    return this;
  }

  get bounds() {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    const add = (x, y) => {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    };
    for (const it of this.items) {
      if (it.kind === 'poly') {
        for (const [x, y] of it.pts) add(x, y);
      } else {
        add(it.cx - it.r, it.cy - it.r);
        add(it.cx + it.r, it.cy + it.r);
      }
    }
    if (!Number.isFinite(minX)) return { minX: 0, minY: 0, maxX: 0, maxY: 0, w: 0, h: 0 };
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
  }

  sort() {
    this.items.sort((a, b) => a.depth - b.depth || a.seq - b.seq);
    return this;
  }
}

/** Draw an asset into a sketch. Never throws past this boundary — callers handle. */
export function buildSketch(asset, angle = 0, unit = 1, time = 0) {
  const g = new Sketch({ angle, unit });
  asset.draw(g, { t: time });
  g.sort();
  return g;
}

/** Soft contact shadow on the ground. Returns screen polygons, far-to-near. */
export function shadowShapes(asset, g) {
  if (asset.shadow === false) return [];
  const [w, d] = asset.footprint || [1, 1];
  const inflate = asset.shadowInflate ?? 0.2;
  const hw = w / 2 + inflate;
  const hd = d / 2 + inflate;
  const rect = (x, y) => [
    g.project(-x, -y, 0),
    g.project(x, -y, 0),
    g.project(x, y, 0),
    g.project(-x, y, 0),
  ];
  return [
    { pts: rect(hw, hd), fill: 'rgba(58,48,38,0.045)' },
    { pts: rect(hw * 0.8, hd * 0.8), fill: 'rgba(58,48,38,0.075)' },
  ];
}

export function emptyBounds() {
  return { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
}

export function unionBounds(b, pts) {
  for (const [x, y] of pts) {
    if (x < b.minX) b.minX = x;
    if (x > b.maxX) b.maxX = x;
    if (y < b.minY) b.minY = y;
    if (y > b.maxY) b.maxY = y;
  }
  return b;
}
