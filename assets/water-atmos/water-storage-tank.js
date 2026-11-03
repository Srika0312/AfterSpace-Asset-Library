import { P } from '../lib/palette.js';

export default {
  key: 'water-storage-tank',
  name: 'Water Storage Tank',
  category: 'water-atmos',
  blurb: 'Heavy-duty cylindrical potable water reservoir with foundation plinth, dome cap, and riser manifold.',
  what: 'a water storage tank',
  footprint: [2.0, 2.0],
  height: 2.2,
  tags: ['water', 'storage', 'tank', 'reservoir', 'infrastructure'],
  refs: ['AF-WAT-001'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete / steel ballast foundation plinth
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.9, h: 0.22, c: P.steelDark });

    // main bulk water cylinder
    g.cyl({ x: 0, y: 0, z: 0.22, r: 0.82, h: 1.55, c: P.steel, segments: 14 });

    // upper conical dome collar
    g.cyl({ x: 0, y: 0, z: 1.77, r: 0.72, r2: 0.45, h: 0.35, c: P.teal, segments: 12 });

    // top inspection hatch
    g.cyl({ x: 0, y: 0, z: 2.12, r: 0.28, h: 0.1, c: P.offWhite, segments: 10 });

    // supply and overflow riser pipe
    g.cyl({ x: 0.72, y: 0.35, z: 0.1, r: 0.1, h: 1.4, axis: 'z', c: P.teal, segments: 8 });
  },
};
