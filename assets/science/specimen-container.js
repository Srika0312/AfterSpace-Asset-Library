import { P } from '../lib/palette.js';

export default {
  key: 'specimen-container',
  name: 'Specimen Container',
  category: 'science',
  blurb: 'Portable hermetic field sample transport canister with viewing ring, shock cage, and pressure seal.',
  what: 'a specimen container',
  footprint: [1.0, 1.0],
  height: 1.35,
  tags: ['science', 'specimen', 'container', 'canister', 'sample'],
  refs: ['AF-SCI-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // shock-absorbing base frame
    g.box({ x: 0, y: 0, z: 0, w: 0.9, d: 0.9, h: 0.18, c: P.steelDark });

    // cylindrical vacuum specimen chamber
    g.cyl({ x: 0, y: 0, z: 0.18, r: 0.38, h: 0.85, c: P.offWhite, segments: 14 });

    // glass inspection window ring
    g.cyl({ x: 0, y: 0, z: 0.45, r: 0.4, h: 0.3, c: P.teal, segments: 14 });

    // top locking pressure cap
    g.cyl({ x: 0, y: 0, z: 1.03, r: 0.32, h: 0.18, c: P.steelDark, segments: 12 });

    // carrying handle arch
    g.box({ x: 0, y: 0, z: 1.21, w: 0.45, d: 0.08, h: 0.12, c: P.steel });
  },
};
