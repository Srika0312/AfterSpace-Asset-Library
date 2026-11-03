import { P } from '../lib/palette.js';

export default {
  key: 'humidity-control-unit',
  name: 'Humidity Control Unit',
  category: 'water-atmos',
  blurb: 'Atmospheric moisture extractor and dehumidifier with condensing coils, intake blower, and digital humidistat.',
  what: 'a humidity control unit',
  footprint: [1.4, 1.1],
  height: 1.3,
  tags: ['humidity', 'climate', 'atmosphere', 'dehumidifier', 'life-support'],
  refs: ['AF-WAT-014'],
  hero: 0,
  status: 'review',
  draw(g) {
    // drainage catch pan and mount frame
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 1.0, h: 0.18, c: P.steelDark });

    // main refrigeration condensing chamber
    g.box({ x: 0, y: 0, z: 0.18, w: 1.1, d: 0.8, h: 0.82, c: P.steel });

    // circular condenser fan housing
    g.cyl({ x: -0.15, y: 0, z: 1.0, r: 0.3, h: 0.18, axis: 'z', c: P.teal, segments: 12 });

    // top dry-air exhaust louver hood
    g.box({ x: 0.28, y: 0, z: 1.0, w: 0.45, d: 0.6, h: 0.15, c: P.offWhite });

    // digital humidistat display and sensor head
    g.box({ x: 0, y: 0.42, z: 0.45, w: 0.45, d: 0.12, h: 0.38, c: P.offWhite });
  },
};
