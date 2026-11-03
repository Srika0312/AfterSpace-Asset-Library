import { P } from '../lib/palette.js';

export default {
  key: 'agricultural-robot',
  name: 'Agricultural Robot',
  category: 'inhabitants',
  blurb: 'Crop-tending robotic helper with high-clearance straddle wheels, pruning arm, and harvest basket.',
  what: 'an agricultural robot',
  footprint: [1.0, 0.9],
  height: 1.1,
  tags: ['inhabitants', 'robot', 'agriculture', 'farming', 'crops'],
  refs: ['AF-INH-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // high-clearance straddle wheels
    g.box({ x: 0, y: 0, z: 0, w: 0.8, d: 0.75, h: 0.28, c: P.steelDark });

    // central crop-tending processing pod
    g.box({ x: 0, y: 0, z: 0.28, w: 0.65, d: 0.55, h: 0.45, c: P.offWhite });

    // produce collection basket
    g.box({ x: -0.15, y: 0, z: 0.73, w: 0.45, d: 0.45, h: 0.25, c: P.canopy });

    // articulated pruning arm
    g.cyl({ x: 0.28, y: 0.15, z: 0.4, r: 0.05, h: 0.48, c: P.steel, segments: 6 });

    // crop scanning sensor head
    g.circle({ x: 0.28, y: -0.15, z: 0.65, r: 0.07, c: P.canopy, bias: 0.55 });
  },
};
