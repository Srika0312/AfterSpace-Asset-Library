import { P } from '../lib/palette.js';

export default {
  key: 'plant-growth-chamber',
  name: 'Plant Growth Chamber',
  category: 'agriculture',
  blurb: 'Controlled agronomy test chamber with observation window, lush crop foliage tier, and grow light hood.',
  what: 'a plant growth chamber',
  footprint: [1.7, 1.3],
  height: 1.65,
  tags: ['agriculture', 'plants', 'growth', 'chamber', 'research'],
  refs: ['AF-AGR-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base equipment foundation deck
    g.box({ x: 0, y: 0, z: 0, w: 1.6, d: 1.2, h: 0.22, c: P.steelDark });

    // insulated growth enclosure cabinet
    g.box({ x: 0, y: 0, z: 0.22, w: 1.4, d: 1.05, h: 1.1, c: P.offWhite });

    // observation inspection window pane
    g.box({ x: 0, y: 0.44, z: 0.45, w: 1.0, d: 0.08, h: 0.65, c: P.teal });

    // interior lush crop foliage layer
    g.box({ x: 0, y: 0.1, z: 0.45, w: 0.95, d: 0.6, h: 0.35, c: P.canopy });

    // overhead full-spectrum luminaire hood
    g.roof({ x: 0, y: 0, z: 1.32, w: 1.45, d: 1.1, h: 0.28, c: P.canopy, gable: P.steelDark, ridge: 'x' });
  },
};
