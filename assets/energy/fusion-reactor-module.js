import { P } from '../lib/palette.js';

export default {
  key: 'fusion-reactor-module',
  name: 'Fusion Reactor Module',
  category: 'energy',
  blurb: 'Toroidal magnetic plasma confinement reactor producing clean high-yield baseline energy.',
  what: 'a fusion reactor module',
  footprint: [2.4, 2.0],
  height: 2.2,
  tags: ['energy', 'fusion', 'plasma', 'tokamak', 'hightech'],
  refs: ['AF-ENG-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy polygon vibration isolation pedestal
    g.cyl({ x: 0, y: 0, z: 0, r: 0.95, h: 0.25, c: P.steelDark, segments: 10 });

    // cryostat vacuum chamber cylinder
    g.cyl({ x: 0, y: 0, z: 0.25, r: 0.78, h: 1.15, c: P.slate, segments: 12 });

    // toroidal magnetic field coil girdle
    g.cyl({ x: 0, y: 0, z: 0.68, r: 0.85, h: 0.3, c: P.brass, segments: 12 });

    // upper diagnostic port plate
    g.circle({ x: 0, y: 0, z: 1.4, r: 0.58, c: P.slate, bias: 0.5 });

    // central fusion plasma core glow
    g.circle({ x: 0, y: 0, z: 1.45, r: 0.22, c: P.cyan, bias: 0.65 });
  },
};
