import { P } from '../lib/palette.js';

export default {
  key: 'atmospheric-processing-unit',
  name: 'Atmospheric Processing Unit',
  category: 'water-atmos',
  blurb: 'Complex atmospheric gas separation plant with compressor hall, fractionation tower, and heat exchanger.',
  what: 'an atmospheric processing unit',
  footprint: [2.4, 1.8],
  height: 2.2,
  tags: ['atmosphere', 'gas', 'processing', 'fractionation', 'life-support'],
  refs: ['AF-WAT-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete mounting pad
    g.box({ x: 0, y: 0, z: 0, w: 2.3, d: 1.7, h: 0.25, c: P.steelDark });

    // compressor and processing hall
    g.box({ x: -0.4, y: 0, z: 0.25, w: 1.25, d: 1.35, h: 1.2, c: P.steel });

    // tall gas fractionation tower
    g.cyl({ x: 0.65, y: -0.28, z: 0.25, r: 0.35, h: 1.85, c: P.teal, segments: 14 });

    // horizontal chiller heat exchanger drum
    g.cyl({ x: 0.65, y: 0.42, z: 0.55, r: 0.28, h: 0.85, axis: 'y', c: P.offWhite, segments: 12 });

    // upper ventilation exhaust duct
    g.box({ x: -0.4, y: 0, z: 1.45, w: 0.8, d: 0.8, h: 0.35, c: P.offWhite });
  },
};
