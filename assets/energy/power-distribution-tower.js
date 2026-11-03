import { P } from '../lib/palette.js';

export default {
  key: 'power-distribution-tower',
  name: 'Power Distribution Tower',
  category: 'energy',
  blurb: 'High-voltage lattice transmission pylon with tiered crossarms supporting overland feeder cables.',
  what: 'a power distribution tower',
  footprint: [1.2, 1.2],
  height: 3.5,
  tags: ['energy', 'tower', 'pylon', 'grid', 'transmission'],
  refs: ['AF-ENG-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete pier footings
    g.box({ x: 0, y: 0, z: 0, w: 0.85, d: 0.85, h: 0.18, c: P.sand });

    // tapered steel lattice tower mast
    g.cyl({ x: 0, y: 0, z: 0.18, r: 0.26, h: 3.0, r2: 0.08, c: P.steel, segments: 8 });

    // lower wide conductor crossarm
    g.box({ x: 0, y: 0, z: 1.9, w: 1.6, d: 0.1, h: 0.1, c: P.steelDark, bias: 0.2 });

    // upper secondary crossarm
    g.box({ x: 0, y: 0, z: 2.6, w: 1.15, d: 0.1, h: 0.1, c: P.steelDark, bias: 0.2 });

    // summit aviation warning strobe
    g.circle({ x: 0, y: 0, z: 3.25, r: 0.11, c: P.red, bias: 0.6 });
  },
};
