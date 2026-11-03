import { P } from '../lib/palette.js';

export default {
  key: 'metal-crates',
  name: 'Metal Crates',
  category: 'environmental',
  blurb: 'Stacked corrugated steel shipping lockers with reinforced stacking ribs and latch handles.',
  what: 'metal crates',
  footprint: [1.3, 1.1],
  height: 1.15,
  tags: ['environmental', 'crates', 'metal', 'steel', 'storage'],
  refs: ['AF-PRP-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base footing runners
    g.box({ x: 0, y: 0, z: 0, w: 1.2, d: 1.0, h: 0.12, c: P.steelDark });

    // bottom heavy steel shipping locker
    g.box({ x: 0, y: 0, z: 0.12, w: 1.1, d: 0.85, h: 0.48, c: P.steel });

    // upper stacked steel locker
    g.box({ x: 0.05, y: -0.05, z: 0.6, w: 0.95, d: 0.75, h: 0.45, c: P.offWhite });

    // central reinforcement structural band
    g.box({ x: 0, y: 0, z: 0.32, w: 1.14, d: 0.89, h: 0.08, c: P.steelDark });

    // top locker security latch handle
    g.box({ x: 0.05, y: 0.33, z: 0.82, w: 0.25, d: 0.06, h: 0.12, c: P.steelDark });
  },
};
