import { P } from '../lib/palette.js';

export default {
  key: 'agricultural-worker',
  name: 'Agricultural Worker',
  category: 'inhabitants',
  blurb: 'Biosphere farmer in canopy work overalls with broad-brim sunshade hat and seedling tray.',
  what: 'an agricultural worker',
  footprint: [0.6, 0.6],
  height: 1.45,
  tags: ['inhabitants', 'farmer', 'agriculture', 'worker', 'biosphere'],
  refs: ['AF-INH-013'],
  hero: 0,
  status: 'review',
  draw(g) {
    // soil-resistant rubber boots
    g.box({ x: 0, y: 0, z: 0, w: 0.36, d: 0.28, h: 0.55, c: P.steelDark });

    // biosphere work tunic overalls
    g.box({ x: 0, y: 0, z: 0.55, w: 0.46, d: 0.34, h: 0.55, c: P.canopy });

    // head
    g.cyl({ x: 0, y: 0, z: 1.1, r: 0.14, h: 0.24, c: P.clay, segments: 10 });

    // broad-brim sunshade work hat
    g.cyl({ x: 0, y: 0, z: 1.3, r: 0.26, h: 0.08, c: P.straw, segments: 12 });

    // seedling planting tray
    g.box({ x: 0, y: 0.2, z: 0.65, w: 0.35, d: 0.22, h: 0.12, c: P.canopy });
  },
};
