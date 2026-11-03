import { P } from '../lib/palette.js';

export default {
  key: 'cargo-container',
  name: 'Cargo Container',
  category: 'industrial',
  blurb: 'Standard intermodal shipping container with heavy-gauge corrugated side panels.',
  what: 'a cargo container',
  footprint: [2.2, 1.1],
  height: 1.1,
  tags: ['industrial', 'cargo', 'shipping', 'freight'],
  refs: ['AF-IND-002'],
  hero: 90,
  status: 'review',
  draw(g) {
    // main ribbed freight box
    g.box({ x: 0, y: 0, z: 0.06, w: 2.0, d: 0.9, h: 0.88, c: P.rust });

    // reinforced base corner casting rim
    g.box({ x: 0, y: 0, z: 0, w: 2.04, d: 0.94, h: 0.06, c: P.steelDark });

    // top corner casting perimeter
    g.box({ x: 0, y: 0, z: 0.94, w: 2.04, d: 0.94, h: 0.06, c: P.steelDark });

    // rear door recessed frame
    g.box({ x: 1.01, y: 0, z: 0.1, w: 0.04, d: 0.76, h: 0.76, c: P.steelDark });

    // twin vertical lock rods
    g.box({ x: 1.02, y: 0, z: 0.1, w: 0.04, d: 0.06, h: 0.76, c: P.offWhite });
  },
};
