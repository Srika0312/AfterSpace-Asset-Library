import { P } from '../lib/palette.js';

export default {
  key: 'carbon-dioxide-scrubber',
  name: 'Carbon Dioxide Scrubber',
  category: 'water-atmos',
  blurb: 'Chemical absorption scrubber tower with amine regeneration tank, exit vent collar, and diagnostic panel.',
  what: 'a carbon dioxide scrubber',
  footprint: [1.7, 1.2],
  height: 1.9,
  tags: ['co2', 'scrubber', 'life-support', 'chemical', 'atmosphere'],
  refs: ['AF-WAT-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // structural base skid
    g.box({ x: 0, y: 0, z: 0, w: 1.6, d: 1.1, h: 0.22, c: P.steelDark });

    // vertical absorption column
    g.cyl({ x: -0.38, y: 0, z: 0.22, r: 0.36, h: 1.6, c: P.steel, segments: 14 });

    // chemical reagent regenerator tank
    g.box({ x: 0.4, y: -0.15, z: 0.22, w: 0.65, d: 0.6, h: 0.95, c: P.teal });

    // scrubbed gas discharge collar
    g.cyl({ x: -0.38, y: 0, z: 1.82, r: 0.24, r2: 0.14, h: 0.22, c: P.offWhite, segments: 10 });

    // telemetry and gas sensor console
    g.box({ x: 0.4, y: 0.32, z: 0.22, w: 0.55, d: 0.32, h: 0.65, c: P.offWhite });
  },
};
