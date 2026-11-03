import { P } from '../lib/palette.js';

export default {
  key: 'security-gate',
  name: 'Security Gate',
  category: 'environmental',
  blurb: 'Turnstile pedestrian checkpoint gate with glazed revolving rotor, scanner stanchions, and overhead canopy.',
  what: 'a security gate',
  footprint: [2.2, 0.8],
  height: 1.8,
  tags: ['environmental', 'gate', 'turnstile', 'checkpoint', 'access'],
  refs: ['AF-PRP-019'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base threshold ramp plate
    g.box({ x: 0, y: 0, z: 0, w: 2.1, d: 0.7, h: 0.16, c: P.steelDark });

    // left turnstile barrier housing
    g.box({ x: -0.75, y: 0, z: 0.16, w: 0.45, d: 0.55, h: 1.05, c: P.steel });

    // right turnstile barrier housing
    g.box({ x: 0.75, y: 0, z: 0.16, w: 0.45, d: 0.55, h: 1.05, c: P.steel });

    // central revolving glass turnstile rotor
    g.cyl({ x: 0, y: 0, z: 0.2, r: 0.35, h: 1.0, c: P.teal, segments: 12 });

    // overhead clearance canopy with scanner
    g.box({ x: 0, y: 0, z: 1.45, w: 1.95, d: 0.5, h: 0.18, c: P.offWhite });
  },
};
