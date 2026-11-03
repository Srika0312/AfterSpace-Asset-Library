import { P } from '../lib/palette.js';

export default {
  key: 'giant-mushroom',
  name: 'Giant Mushroom',
  category: 'vegetation',
  blurb: 'Towering macrofungal specimen with thick stipe, convex canopy cap, underside gills, and glowing spots.',
  what: 'a giant mushroom',
  footprint: [1.8, 1.8],
  height: 1.6,
  tags: ['vegetation', 'mushroom', 'fungus', 'mycelium', 'macrofungi'],
  refs: ['AF-VEG-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // bulbous soil footing
    g.cyl({ x: 0, y: 0, z: 0, r: 0.45, h: 0.18, c: P.bark, segments: 10 });

    // sturdy fibrous fungal stipe stem
    g.cyl({ x: 0, y: 0, z: 0.18, r: 0.26, r2: 0.18, h: 0.95, c: P.offWhite, segments: 10 });

    // vast convex fungal pileus cap
    g.cyl({ x: 0, y: 0, z: 1.05, r: 0.85, r2: 0.32, h: 0.48, c: P.canopy, segments: 14 });

    // underside spore lamellae gills
    g.cyl({ x: 0, y: 0, z: 1.0, r: 0.72, h: 0.12, c: P.offWhite, segments: 12 });

    // bioluminescent cap spots
    g.circle({ x: 0.22, y: 0.18, z: 1.45, r: 0.12, c: P.cyan, bias: 0.55 });
  },
};
