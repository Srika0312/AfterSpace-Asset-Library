import { P } from '../lib/palette.js';

export default {
  key: 'air-filtration-unit',
  name: 'Air Filtration Unit',
  category: 'water-atmos',
  blurb: 'Compact HEPA and particulate filtration system with louvered intake hood and centrifugal blower.',
  what: 'an air filtration unit',
  footprint: [1.5, 1.1],
  height: 1.35,
  tags: ['air', 'filtration', 'hepa', 'ventilation', 'atmosphere'],
  refs: ['AF-WAT-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // vibration isolation footing
    g.box({ x: 0, y: 0, z: 0, w: 1.4, d: 1.0, h: 0.18, c: P.steelDark });

    // multi-stage particulate filter cabinet
    g.box({ x: -0.15, y: 0, z: 0.18, w: 0.85, d: 0.85, h: 0.95, c: P.offWhite });

    // angled louvered intake hood
    g.roof({ x: -0.15, y: 0, z: 1.13, w: 0.9, d: 0.9, h: 0.28, c: P.steel, gable: P.steelDark, ridge: 'x' });

    // centrifugal blower casing
    g.cyl({ x: 0.45, y: 0, z: 0.35, r: 0.3, h: 0.45, axis: 'x', c: P.teal, segments: 12 });

    // clean air exhaust port
    g.cyl({ x: 0.55, y: 0, z: 0.85, r: 0.18, h: 0.4, axis: 'z', c: P.steelDark, segments: 10 });
  },
};
