import { P } from '../lib/palette.js';

export default {
  key: 'hanging-vines',
  name: 'Hanging Vines',
  category: 'vegetation',
  blurb: 'Cascading habitat overhead vine curtain with creeping foliage mantle and trailing bioluminescent droplets.',
  what: 'hanging vines',
  footprint: [1.5, 0.6],
  height: 1.95,
  tags: ['vegetation', 'vines', 'creeper', 'foliage', 'hanging'],
  refs: ['AF-VEG-017'],
  hero: 0,
  status: 'review',
  draw(g) {
    // overhead trellis mount bracket
    g.box({ x: 0, y: 0, z: 1.8, w: 1.5, d: 0.5, h: 0.15, c: P.steelDark });

    // upper creeping vine mantle
    g.box({ x: 0, y: 0, z: 1.45, w: 1.35, d: 0.42, h: 0.38, c: P.canopy });

    // main hanging curtain of foliage vines
    g.box({ x: -0.1, y: 0, z: 0.75, w: 1.1, d: 0.32, h: 0.72, c: P.leaf });

    // long trailing vine tendril drop
    g.box({ x: 0.2, y: 0, z: 0.2, w: 0.45, d: 0.25, h: 0.65, c: P.canopy });

    // trailing flower droplet
    g.circle({ x: 0.2, y: 0.12, z: 0.22, r: 0.09, c: P.teal, bias: 0.55 });
  },
};
