import { P } from '../lib/palette.js';

export default {
  key: 'signal-transmission-tower',
  name: 'Signal Transmission Tower',
  category: 'space',
  blurb: 'Tall tapered mast carrying the settlement’s public signal across the basin.',
  what: 'a signal transmission tower',
  footprint: [1, 1],
  height: 2.55,
  tags: ['space', 'comms', 'tower', 'signal'],
  refs: ['AF-SPACE-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base, mast and two crossbars
    g.box({ x: 0, y: 0, z: 0, w: 0.6, d: 0.6, h: 0.18, c: P.steelDark });
    g.cyl({ x: 0, y: 0, z: 0.16, r: 0.24, h: 2.15, r2: 0.07, c: P.steel, segments: 8 });
    g.box({ x: 0, y: 0, z: 1.12, w: 0.9, d: 0.08, h: 0.08, c: P.steelDark, bias: 0.2 });
    g.box({ x: 0, y: 0, z: 1.62, w: 0.68, d: 0.08, h: 0.08, c: P.steelDark, bias: 0.2 });

    // aircraft warning beacon
    g.circle({ x: 0, y: 0, z: 2.38, r: 0.12, c: P.red, bias: 0.6 });
  },
};
