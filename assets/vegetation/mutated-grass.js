import { P } from '../lib/palette.js';

export default {
  key: 'mutated-grass',
  name: 'Mutated Grass',
  category: 'vegetation',
  blurb: 'Thicket of tall crystalline grass blades rooted in soil patch with glowing spore nodes.',
  what: 'mutated grass',
  footprint: [1.2, 1.0],
  height: 0.9,
  tags: ['vegetation', 'grass', 'foliage', 'mutated', 'groundcover'],
  refs: ['AF-VEG-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // dirt bed patch
    g.box({ x: 0, y: 0, z: 0, w: 1.1, d: 0.9, h: 0.1, c: P.soil });

    // tall crystalline blade clump
    g.roof({ x: -0.18, y: 0, z: 0.1, w: 0.45, d: 0.65, h: 0.68, c: P.leaf, gable: P.canopy, ridge: 'x' });

    // offset blade clump
    g.roof({ x: 0.25, y: 0.1, z: 0.1, w: 0.4, d: 0.55, h: 0.52, c: P.canopy, gable: P.leaf, ridge: 'y' });

    // minor ground blade tuft
    g.roof({ x: 0.1, y: -0.22, z: 0.1, w: 0.35, d: 0.35, h: 0.35, c: P.leaf, gable: P.canopy, ridge: 'x' });

    // luminescent spore node
    g.circle({ x: -0.18, y: 0, z: 0.79, r: 0.08, c: P.cyan, bias: 0.55 });
  },
};
