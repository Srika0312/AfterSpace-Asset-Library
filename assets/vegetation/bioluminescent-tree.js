import { P } from '../lib/palette.js';

export default {
  key: 'bioluminescent-tree',
  name: 'Bioluminescent Tree',
  category: 'vegetation',
  blurb: 'Slender habitat tree with glowing cyan umbrella canopy, luminescent fringe, and apex emitter.',
  what: 'a bioluminescent tree',
  footprint: [1.8, 1.8],
  height: 2.0,
  tags: ['vegetation', 'tree', 'bioluminescent', 'glow', 'flora'],
  refs: ['AF-VEG-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // rooted soil mound
    g.cyl({ x: 0, y: 0, z: 0, r: 0.5, r2: 0.35, h: 0.2, c: P.steelDark, segments: 10 });

    // slender bioluminescent trunk
    g.cyl({ x: 0, y: 0, z: 0.2, r: 0.18, r2: 0.1, h: 1.25, c: P.barkDark, segments: 10 });

    // glowing umbrella canopy
    g.cyl({ x: 0, y: 0, z: 1.35, r: 0.82, r2: 0.25, h: 0.45, c: P.cyan, segments: 14 });

    // lower luminescent fringe
    g.cyl({ x: 0, y: 0, z: 1.2, r: 0.65, h: 0.2, c: P.teal, segments: 12 });

    // glowing apex spire
    g.circle({ x: 0, y: 0, z: 1.82, r: 0.14, c: P.cyan, bias: 0.55 });
  },
};
