import { P } from '../lib/palette.js';

export default {
  key: 'radio-telescope',
  name: 'Radio Telescope',
  category: 'space',
  blurb: 'Large-aperture radio telescope for deep-space listening and tracking.',
  what: 'a radio telescope',
  footprint: [2.8, 1.8],
  height: 3.6,
  tags: ['space', 'science', 'telescope', 'deep-space'],
  refs: ['AF-SPACE-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base pad and tapered tower
    g.cyl({ x: 0, y: 0, z: 0, r: 0.6, h: 0.18, c: P.steelDark, segments: 12 });
    g.cyl({ x: 0, y: 0, z: 0.16, r: 0.32, h: 1.55, r2: 0.12, c: P.steel, segments: 10 });

    // wide yoke carrying the collecting dish
    g.box({ x: 0, y: 0, z: 1.58, w: 2.6, d: 0.22, h: 0.16, c: P.steelDark, bias: 0.5 });

    // oversized collecting dish
    g.circle({ x: 0, y: 0, z: 2.5, r: 1.05, c: P.offWhite, bias: 0.55 });
    g.circle({ x: 0, y: 0, z: 2.45, r: 0.82, c: P.steel, bias: 0.7 });
    g.circle({ x: 0, y: 0, z: 2.45, r: 0.12, c: P.brass, bias: 0.72 });
  },
};
