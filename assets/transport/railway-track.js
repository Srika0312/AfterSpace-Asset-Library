import { P } from '../lib/palette.js';

export default {
  key: 'railway-track',
  name: 'Railway Track',
  category: 'transport',
  blurb: 'Standard-gauge planetary railway segment with ballast gravel bed, composite ties, and twin steel rails.',
  what: 'a railway track',
  footprint: [2.2, 1.2],
  height: 0.35,
  tags: ['transport', 'railway', 'track', 'rail', 'infrastructure'],
  refs: ['AF-TRN-017'],
  hero: 0,
  status: 'review',
  draw(g) {
    // crushed ballast gravel bed
    g.box({ x: 0, y: 0, z: 0, w: 2.1, d: 1.1, h: 0.14, c: P.steelDark });

    // composite sleeper cross-ties array
    g.box({ x: 0, y: 0, z: 0.14, w: 1.95, d: 0.92, h: 0.08, c: P.steel });

    // left parallel running rail
    g.box({ x: 0, y: -0.32, z: 0.22, w: 2.1, d: 0.09, h: 0.12, c: P.offWhite });

    // right parallel running rail
    g.box({ x: 0, y: 0.32, z: 0.22, w: 2.1, d: 0.09, h: 0.12, c: P.offWhite });

    // central magnetic induction / power guide
    g.box({ x: 0, y: 0, z: 0.2, w: 2.0, d: 0.14, h: 0.07, c: P.teal });
  },
};
