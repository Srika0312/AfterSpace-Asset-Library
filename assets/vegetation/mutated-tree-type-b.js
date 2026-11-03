import { P } from '../lib/palette.js';

export default {
  key: 'mutated-tree-type-b',
  name: 'Mutated Tree — Type B',
  category: 'vegetation',
  blurb: 'Forked alien tree with twisting canopy bulbs, spired crown, and glowing spore clusters.',
  what: 'a mutated tree',
  footprint: [1.8, 1.8],
  height: 2.1,
  tags: ['vegetation', 'tree', 'alien', 'mutated', 'flora'],
  refs: ['AF-VEG-002'],
  hero: 0,
  status: 'review',
  draw(g) {
    // twisted multi-fork trunk base
    g.cyl({ x: 0, y: 0, z: 0, r: 0.32, r2: 0.22, h: 0.95, c: P.bark, segments: 10 });

    // left twisted canopy bulb
    g.cyl({ x: -0.32, y: 0.15, z: 0.8, r: 0.52, h: 0.65, c: P.leaf, segments: 12 });

    // right twisted canopy bulb
    g.cyl({ x: 0.35, y: -0.15, z: 1.0, r: 0.58, h: 0.75, c: P.canopy, segments: 12 });

    // crown spire
    g.roof({ x: 0, y: 0, z: 1.5, w: 0.75, d: 0.75, h: 0.6, c: P.leaf, gable: P.canopy, ridge: 'x' });

    // spore pod cluster
    g.circle({ x: 0.35, y: -0.15, z: 1.78, r: 0.1, c: P.amber, bias: 0.55 });
  },
};
