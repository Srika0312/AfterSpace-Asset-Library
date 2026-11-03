import { P } from '../lib/palette.js';

export default {
  key: 'alien-fern',
  name: 'Alien Fern',
  category: 'vegetation',
  blurb: 'Spreading xenobiotic fern with broad ribbed fronds, central spine, and glowing spore tips.',
  what: 'an alien fern',
  footprint: [1.3, 1.1],
  height: 1.0,
  tags: ['vegetation', 'fern', 'fronds', 'foliage', 'alien'],
  refs: ['AF-VEG-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // soil base clump
    g.cyl({ x: 0, y: 0, z: 0, r: 0.4, h: 0.12, c: P.soil, segments: 8 });

    // central frond spine
    g.cyl({ x: 0, y: 0, z: 0.12, r: 0.08, h: 0.75, c: P.canopy, segments: 8 });

    // broad spreading fan frond 1
    g.roof({ x: -0.25, y: 0, z: 0.45, w: 0.65, d: 0.45, h: 0.38, c: P.leaf, gable: P.canopy, ridge: 'x' });

    // broad spreading fan frond 2
    g.roof({ x: 0.25, y: 0, z: 0.45, w: 0.65, d: 0.45, h: 0.38, c: P.canopy, gable: P.leaf, ridge: 'x' });

    // glowing spore tips
    g.circle({ x: 0, y: 0, z: 0.9, r: 0.1, c: P.cyan, bias: 0.55 });
  },
};
