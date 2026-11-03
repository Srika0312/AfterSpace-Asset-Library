import { P } from '../lib/palette.js';

export default {
  key: 'water-purification-unit',
  name: 'Water Purification Unit',
  category: 'water-atmos',
  blurb: 'Multi-stage filtration skid with dual reverse-osmosis membrane tubes and UV sterilization manifold.',
  what: 'a water purification unit',
  footprint: [1.6, 1.2],
  height: 1.3,
  tags: ['water', 'purification', 'filtration', 'reverse-osmosis', 'uv'],
  refs: ['AF-WAT-002'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy equipment skid platform
    g.box({ x: 0, y: 0, z: 0, w: 1.5, d: 1.1, h: 0.2, c: P.steelDark });

    // primary reverse osmosis filter cylinder
    g.cyl({ x: -0.35, y: -0.15, z: 0.2, r: 0.32, h: 0.95, c: P.offWhite, segments: 12 });

    // secondary polishing filter cylinder
    g.cyl({ x: 0.35, y: -0.15, z: 0.2, r: 0.32, h: 0.95, c: P.offWhite, segments: 12 });

    // UV sterilizer cross pipe manifold
    g.cyl({ x: 0, y: 0.28, z: 0.55, r: 0.14, h: 1.2, axis: 'x', c: P.teal, segments: 10 });

    // flow telemetry and diagnostic console
    g.box({ x: 0, y: 0.32, z: 0.2, w: 0.5, d: 0.35, h: 0.6, c: P.steel });
  },
};
