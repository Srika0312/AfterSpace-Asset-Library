import { P } from '../lib/palette.js';

export default {
  key: 'dome-habitat',
  name: 'Dome Habitat',
  category: 'residential',
  blurb: 'Spacious geodesic biosafety dome habitat with stepped thermal tiers, entrance port, and viewing cupola.',
  what: 'a dome habitat',
  footprint: [2.6, 2.6],
  height: 1.85,
  tags: ['residential', 'dome', 'habitat', 'geodesic', 'biosphere'],
  refs: ['AF-RES-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // octagonal foundation footing ring
    g.box({ x: 0, y: 0, z: 0, w: 2.5, d: 2.5, h: 0.22, c: P.steelDark });

    // lower cylindrical habitat base wall
    g.cyl({ x: 0, y: 0, z: 0.22, r: 1.15, h: 0.65, c: P.offWhite, segments: 16 });

    // mid-dome thermal transition cone
    g.cyl({ x: 0, y: 0, z: 0.87, r: 1.15, r2: 0.65, h: 0.65, c: P.terracotta, segments: 14 });

    // top skylight observation cupola
    g.cyl({ x: 0, y: 0, z: 1.52, r: 0.45, h: 0.22, c: P.teal, segments: 12 });

    // reinforced entry vestibule port
    g.box({ x: 1.05, y: 0, z: 0.22, w: 0.45, d: 0.65, h: 0.65, c: P.steelDark });
  },
};
