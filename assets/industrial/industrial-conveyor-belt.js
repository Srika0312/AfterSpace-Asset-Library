import { P } from '../lib/palette.js';

export default {
  key: 'industrial-conveyor-belt',
  name: 'Industrial Conveyor Belt',
  category: 'industrial',
  blurb: 'Modular continuous roller conveyor transporting parcels and bulk material between production cells.',
  what: 'an industrial conveyor belt',
  footprint: [2.2, 0.8],
  height: 1.15,
  tags: ['industrial', 'conveyor', 'logistics', 'automation', 'factory'],
  refs: ['AF-IND-016'],
  hero: 0,
  status: 'review',
  draw(g) {
    // low intake leg support
    g.box({ x: -0.75, y: 0, z: 0, w: 0.14, d: 0.52, h: 0.35, c: P.steelDark });

    // elevated discharge leg support
    g.box({ x: 0.75, y: 0, z: 0, w: 0.14, d: 0.52, h: 0.85, c: P.steelDark });

    // conveyor guide frame bed
    g.box({ x: 0, y: 0, z: 0.52, w: 1.95, d: 0.44, h: 0.12, c: P.steel });

    // heavy rubber belt surface
    g.box({ x: 0, y: 0, z: 0.58, w: 1.9, d: 0.38, h: 0.06, c: P.black });

    // side drive drum motor
    g.cyl({ x: 0.75, y: 0.28, z: 0.82, r: 0.14, h: 0.18, c: P.amber, axis: 'y', segments: 8 });
  },
};
