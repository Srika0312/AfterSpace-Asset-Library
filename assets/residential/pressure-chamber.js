import { P } from '../lib/palette.js';

export default {
  key: 'pressure-chamber',
  name: 'Pressure Chamber',
  category: 'residential',
  blurb: 'Hyperbaric decompression and decontamination lock with cylindrical steel shell and pressure dome.',
  what: 'a pressure chamber',
  footprint: [2.0, 1.6],
  height: 1.75,
  tags: ['residential', 'pressure', 'chamber', 'decompression', 'hyperbaric'],
  refs: ['AF-RES-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // structural equipment footing
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.5, h: 0.22, c: P.steelDark });

    // vertical cylindrical pressure vessel
    g.cyl({ x: -0.2, y: 0, z: 0.22, r: 0.68, h: 1.25, c: P.steel, segments: 14 });

    // upper hemispherical pressure dome
    g.cyl({ x: -0.2, y: 0, z: 1.47, r: 0.55, r2: 0.25, h: 0.26, c: P.teal, segments: 12 });

    // access vestibule lock box
    g.box({ x: 0.6, y: 0, z: 0.22, w: 0.6, d: 0.8, h: 1.1, c: P.offWhite });

    // depressurization exhaust valve stack
    g.cyl({ x: -0.2, y: 0, z: 1.73, r: 0.09, h: 0.2, c: P.steelDark, segments: 8 });
  },
};
