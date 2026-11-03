import { P } from '../lib/palette.js';

export default {
  key: 'industrial-chimney',
  name: 'Industrial Chimney',
  category: 'industrial',
  blurb: 'Reinforced masonry exhaust stack with steel structural tension bands and aviation band.',
  what: 'an industrial chimney',
  footprint: [1.2, 1.2],
  height: 3.4,
  tags: ['industrial', 'chimney', 'stack', 'exhaust', 'furnace'],
  refs: ['AF-IND-019'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy square foundation plinth
    g.box({ x: 0, y: 0, z: 0, w: 1.0, d: 1.0, h: 0.25, c: P.steelDark });

    // main tapered masonry exhaust column
    g.cyl({ x: 0, y: 0, z: 0.25, r: 0.38, h: 2.85, r2: 0.22, c: P.brick, segments: 12 });

    // high-visibility aviation contrast ring
    g.cyl({ x: 0, y: 0, z: 2.35, r: 0.28, h: 0.35, r2: 0.26, c: P.offWhite, segments: 12 });

    // reinforced crown cap rim
    g.cyl({ x: 0, y: 0, z: 3.05, r: 0.24, h: 0.1, c: P.roofDark, segments: 12 });
  },
};
