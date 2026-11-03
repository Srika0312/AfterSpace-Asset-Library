import { P } from '../lib/palette.js';

export default {
  key: 'mutated-tree-type-a',
  name: 'Mutated Tree — Type A',
  category: 'vegetation',
  blurb: 'Xenobiotic mutated arbor with twisted dark trunk, layered canopy bulbs, and bioluminescent nodes.',
  what: 'a mutated tree',
  footprint: [1.8, 1.8],
  height: 2.2,
  tags: ['vegetation', 'tree', 'alien', 'mutated', 'flora'],
  refs: ['AF-VEG-001'],
  hero: 0,
  status: 'review',
  draw(g) {
    // twisted bark trunk
    g.cyl({ x: 0, y: 0, z: 0, r: 0.28, r2: 0.18, h: 1.1, c: P.barkDark, segments: 10 });

    // lower foliage bulb
    g.cyl({ x: 0, y: 0, z: 0.85, r: 0.75, r2: 0.5, h: 0.65, c: P.canopy, segments: 12 });

    // upper tiered crown
    g.cyl({ x: 0, y: 0, z: 1.35, r: 0.55, r2: 0.2, h: 0.75, c: P.leaf, segments: 12 });

    // asymmetrical mutation limb
    g.box({ x: 0.35, y: -0.2, z: 0.65, w: 0.45, d: 0.25, h: 0.35, c: P.canopy });

    // bioluminescent node
    g.circle({ x: 0.4, y: -0.2, z: 1.05, r: 0.12, c: P.cyan, bias: 0.55 });
  },
};
