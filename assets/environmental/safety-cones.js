import { P } from '../lib/palette.js';

export default {
  key: 'safety-cones',
  name: 'Safety Cones',
  category: 'environmental',
  blurb: 'Pair of high-visibility hazard cones with weighted square bases and retroreflective collars.',
  what: 'safety cones',
  footprint: [1.2, 1.0],
  height: 0.75,
  tags: ['environmental', 'cones', 'safety', 'hazard', 'traffic'],
  refs: ['AF-PRP-013'],
  hero: 0,
  status: 'review',
  draw(g) {
    // primary cone square weighted base
    g.box({ x: -0.25, y: -0.1, z: 0, w: 0.55, d: 0.55, h: 0.08, c: P.steelDark });

    // primary tapered conical hazard cone
    g.cyl({ x: -0.25, y: -0.1, z: 0.08, r: 0.24, r2: 0.06, h: 0.62, c: P.amber, segments: 12 });

    // primary cone retroreflective collar
    g.cyl({ x: -0.25, y: -0.1, z: 0.35, r: 0.17, r2: 0.12, h: 0.15, c: P.offWhite, segments: 12 });

    // secondary cone square weighted base
    g.box({ x: 0.3, y: 0.2, z: 0, w: 0.45, d: 0.45, h: 0.07, c: P.steelDark });

    // secondary tapered hazard cone
    g.cyl({ x: 0.3, y: 0.2, z: 0.07, r: 0.18, r2: 0.05, h: 0.5, c: P.amber, segments: 10 });
  },
};
