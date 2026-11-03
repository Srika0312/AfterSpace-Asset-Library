// The Afterspace — shared drawing parts
// Small, palette-aware helpers for details that repeat across assets.

import { P } from './palette.js';

/** Full-width axle wheel. Reads as a wheel face from any orbit angle. */
export function wheel(g, { x = 0, y = 0, z = 0.22, r = 0.22, depth = 0.94, c = P.black, segments = 10 } = {}) {
  return g.cyl({ x, y, z, r, h: depth, c, axis: 'y', segments });
}

/** Recessed window / door panel on one face. */
export function panel(
  g,
  { x = 0, y = 0, z = 0.4, w = 0.3, h = 0.24, d = 0.04, c = P.glass, axis = 'y' } = {},
) {
  return g.box(
    axis === 'x'
      ? { x, y, z, w: d, d: w, h, c }
      : { x, y, z, w, d, h, c },
  );
}

/** A complete broadleaf tree, sized in world units. */
export function tree(
  g,
  {
    x = 0,
    y = 0,
    z = 0,
    scale = 1,
    trunk = P.bark,
    canopy = P.canopy,
    leaf = P.leaf,
    light = P.leafLight,
  } = {},
) {
  const s = scale;
  g.box({ x, y, z, w: 0.3 * s, d: 0.3 * s, h: 0.14 * s, c: trunk });
  g.cyl({ x, y, z: z + 0.06 * s, r: 0.1 * s, h: 1.02 * s, c: trunk, segments: 8 });
  g.circle({ x, y, z: z + 1.6 * s, r: 0.8 * s, c: canopy, bias: 0.4 });
  g.circle({ x, y, z: z + 1.6 * s, r: 0.56 * s, c: leaf, dx: -0.13 * s, dy: -0.12 * s, bias: 0.42 });
  g.circle({ x, y, z: z + 1.6 * s, r: 0.3 * s, c: light, dx: -0.2 * s, dy: -0.19 * s, bias: 0.44 });
  return g;
}

/** A soft, screen-facing glow dot for lamps, beacons and windows. */
export function glow(g, { x = 0, y = 0, z = 1, r = 0.09, c = P.amber } = {}) {
  return g.circle({ x, y, z, r, c, bias: 0.5 });
}
