import { P } from '../lib/palette.js';

export default {
  key: 'agricultural-water-tank',
  name: 'Agricultural Water Tank',
  category: 'agriculture',
  blurb: 'Elevated rural irrigation reservoir with corrugated steel cylinder, conical roof, and field riser pipe.',
  what: 'an agricultural water tank',
  footprint: [2.0, 2.0],
  height: 2.0,
  tags: ['agriculture', 'water', 'tank', 'irrigation', 'reservoir'],
  refs: ['AF-AGR-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // reinforced ring footing slab
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.9, h: 0.22, c: P.steelDark });

    // circular water containment cylinder
    g.cyl({ x: 0, y: 0, z: 0.22, r: 0.8, h: 1.35, c: P.steel, segments: 14 });

    // conical agricultural roof cap
    g.cyl({ x: 0, y: 0, z: 1.57, r: 0.8, r2: 0.35, h: 0.35, c: P.canopy, segments: 12 });

    // top ventilation inspection cupola
    g.cyl({ x: 0, y: 0, z: 1.92, r: 0.22, h: 0.1, c: P.offWhite, segments: 10 });

    // main field irrigation riser pipe
    g.cyl({ x: 0.72, y: 0.32, z: 0.1, r: 0.09, h: 1.45, axis: 'z', c: P.canopy, segments: 8 });
  },
};
