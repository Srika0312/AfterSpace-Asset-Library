import { P } from '../lib/palette.js';

export default {
  key: 'warning-light',
  name: 'Warning Light',
  category: 'environmental',
  blurb: 'Hazard strobe beacon stanchion with heavy base, protective guard cage rim, and flashing amber dome.',
  what: 'a warning light',
  footprint: [0.6, 0.6],
  height: 1.1,
  tags: ['environmental', 'warning', 'light', 'beacon', 'hazard'],
  refs: ['AF-PRP-002'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy cast warning base
    g.box({ x: 0, y: 0, z: 0, w: 0.55, d: 0.55, h: 0.2, c: P.steelDark });

    // cylindrical stanchion post
    g.cyl({ x: 0, y: 0, z: 0.2, r: 0.12, h: 0.5, c: P.steel, segments: 10 });

    // protective lamp guard cage rim
    g.cyl({ x: 0, y: 0, z: 0.7, r: 0.2, h: 0.1, c: P.steelDark, segments: 10 });

    // glowing amber strobe beacon dome
    g.cyl({ x: 0, y: 0, z: 0.8, r: 0.16, h: 0.22, c: P.amber, segments: 12 });

    // top sensor cap
    g.cyl({ x: 0, y: 0, z: 1.02, r: 0.14, h: 0.06, c: P.offWhite, segments: 10 });
  },
};
