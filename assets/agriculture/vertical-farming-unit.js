import { P } from '../lib/palette.js';

export default {
  key: 'vertical-farming-unit',
  name: 'Vertical Farming Unit',
  category: 'agriculture',
  blurb: 'High-density automated crop tower with internal tiered foliage windows and aeroponic misting manifold.',
  what: 'a vertical farming unit',
  footprint: [1.8, 1.4],
  height: 2.2,
  tags: ['agriculture', 'vertical-farm', 'crops', 'aeroponics', 'tower'],
  refs: ['AF-AGR-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base structural plinth and drainage sump
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.3, h: 0.24, c: P.steelDark });

    // main vertical growth tower housing
    g.box({ x: 0, y: 0, z: 0.24, w: 1.45, d: 1.1, h: 1.65, c: P.offWhite });

    // internal tiered crop foliage window
    g.box({ x: 0, y: 0.45, z: 0.45, w: 1.15, d: 0.15, h: 1.15, c: P.canopy });

    // top aeroponic misting fan manifold
    g.roof({ x: 0, y: 0, z: 1.89, w: 1.5, d: 1.15, h: 0.28, c: P.steel, gable: P.steelDark, ridge: 'x' });

    // crop yield sensor and harvest interface
    g.box({ x: 0.55, y: -0.35, z: 0.24, w: 0.25, d: 0.35, h: 0.65, c: P.steel });
  },
};
