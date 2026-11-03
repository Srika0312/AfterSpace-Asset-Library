import { P } from '../lib/palette.js';

export default {
  key: 'nutrient-storage-tank',
  name: 'Nutrient Storage Tank',
  category: 'agriculture',
  blurb: 'Cylindrical bulk liquid fertilizer storage silo with conical dome roof, level gauge, and inspection hatch.',
  what: 'a nutrient storage tank',
  footprint: [1.8, 1.8],
  height: 2.1,
  tags: ['agriculture', 'fertilizer', 'tank', 'storage', 'nutrients'],
  refs: ['AF-AGR-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy anchor footing pad
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.7, h: 0.22, c: P.steelDark });

    // cylindrical nutrient solution vessel
    g.cyl({ x: 0, y: 0, z: 0.22, r: 0.72, h: 1.35, c: P.offWhite, segments: 14 });

    // conical tank dome roof
    g.cyl({ x: 0, y: 0, z: 1.57, r: 0.72, r2: 0.32, h: 0.38, c: P.canopy, segments: 12 });

    // top inspection and filling hatch
    g.cyl({ x: 0, y: 0, z: 1.95, r: 0.24, h: 0.12, c: P.steel, segments: 10 });

    // external level gauge column pipe
    g.cyl({ x: 0.65, y: 0.25, z: 0.22, r: 0.07, h: 1.35, c: P.canopy, segments: 8 });
  },
};
