import { P } from '../lib/palette.js';

export default {
  key: 'oxygen-storage-tank',
  name: 'Oxygen Storage Tank',
  category: 'water-atmos',
  blurb: 'Vertical cryogenic liquid oxygen pressure dewar with dome head, vent mast, and transfer loop.',
  what: 'an oxygen storage tank',
  footprint: [1.6, 1.6],
  height: 2.4,
  tags: ['oxygen', 'cryogenic', 'tank', 'storage', 'atmosphere'],
  refs: ['AF-WAT-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // support foundation base
    g.box({ x: 0, y: 0, z: 0, w: 1.5, d: 1.5, h: 0.25, c: P.steelDark });

    // main insulated cryogenic vessel
    g.cyl({ x: 0, y: 0, z: 0.25, r: 0.65, h: 1.65, c: P.offWhite, segments: 14 });

    // upper hemispherical dome collar
    g.cyl({ x: 0, y: 0, z: 1.9, r: 0.55, r2: 0.25, h: 0.35, c: P.teal, segments: 12 });

    // pressure relief vent stack
    g.cyl({ x: 0, y: 0, z: 2.25, r: 0.08, h: 0.35, c: P.steel, segments: 8 });

    // cryogenic feed and transfer pipe
    g.cyl({ x: 0.58, y: 0.2, z: 0.3, r: 0.09, h: 1.3, axis: 'z', c: P.teal, segments: 8 });
  },
};
