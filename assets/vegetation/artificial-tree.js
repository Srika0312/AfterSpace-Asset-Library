import { P } from '../lib/palette.js';

export default {
  key: 'artificial-tree',
  name: 'Artificial Tree',
  category: 'vegetation',
  blurb: 'Synthetic bio-mimetic solar tree with hexagonal steel trunk, photovoltaic leaf tiers, and scrubber cap.',
  what: 'an artificial tree',
  footprint: [1.6, 1.6],
  height: 2.1,
  tags: ['vegetation', 'artificial', 'tree', 'solar', 'synthetic'],
  refs: ['AF-VEG-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // geometric planter foundation
    g.box({ x: 0, y: 0, z: 0, w: 1.1, d: 1.1, h: 0.25, c: P.steelDark });

    // hexagonal steel trunk mast
    g.cyl({ x: 0, y: 0, z: 0.25, r: 0.14, h: 1.2, c: P.steel, segments: 6 });

    // lower solar leaf tier
    g.box({ x: 0, y: 0, z: 1.25, w: 1.4, d: 1.4, h: 0.12, c: P.teal });

    // upper solar leaf tier
    g.box({ x: 0, y: 0, z: 1.55, w: 0.95, d: 0.95, h: 0.12, c: P.offWhite });

    // atmospheric scrubber cap
    g.cyl({ x: 0, y: 0, z: 1.7, r: 0.22, h: 0.2, c: P.steelDark, segments: 8 });
  },
};
