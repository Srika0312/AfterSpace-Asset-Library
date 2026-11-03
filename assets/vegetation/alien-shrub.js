import { P } from '../lib/palette.js';

export default {
  key: 'alien-shrub',
  name: 'Alien Shrub',
  category: 'vegetation',
  blurb: 'Dense xenobiotic bush with twin fleshy foliage pods, spiny thorn crest, and bioluminescent berry node.',
  what: 'an alien shrub',
  footprint: [1.2, 1.2],
  height: 1.0,
  tags: ['vegetation', 'shrub', 'bush', 'alien', 'flora'],
  refs: ['AF-VEG-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // soil mound
    g.cyl({ x: 0, y: 0, z: 0, r: 0.45, h: 0.14, c: P.soil, segments: 10 });

    // primary shrub pod
    g.cyl({ x: -0.15, y: -0.1, z: 0.14, r: 0.38, h: 0.52, c: P.leaf, segments: 12 });

    // secondary shrub pod
    g.cyl({ x: 0.2, y: 0.15, z: 0.14, r: 0.32, h: 0.44, c: P.canopy, segments: 10 });

    // spiny thorn crest
    g.roof({ x: -0.15, y: -0.1, z: 0.64, w: 0.45, d: 0.45, h: 0.32, c: P.canopy, gable: P.leaf, ridge: 'y' });

    // bioluminescent berry cluster
    g.circle({ x: 0.2, y: 0.15, z: 0.6, r: 0.09, c: P.amber, bias: 0.55 });
  },
};
