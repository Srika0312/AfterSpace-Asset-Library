import { P } from '../lib/palette.js';

export default {
  key: 'residential-window-module',
  name: 'Residential Window Module',
  category: 'residential',
  blurb: 'Prefabricated habitat wall segment with projecting bay-window observation alcove and thermal sunshade.',
  what: 'a residential window module',
  footprint: [1.4, 0.9],
  height: 1.4,
  tags: ['residential', 'window', 'alcove', 'view', 'module'],
  refs: ['AF-RES-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base sill footing
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 0.8, h: 0.18, c: P.steelDark });

    // structural wall panel segment
    g.box({ x: 0, y: -0.15, z: 0.18, w: 1.25, d: 0.35, h: 1.15, c: P.offWhite });

    // cantilevered bay window alcove
    g.box({ x: 0, y: 0.18, z: 0.38, w: 0.95, d: 0.45, h: 0.72, c: P.teal });

    // bay window overhang sunshade
    g.roof({ x: 0, y: 0.18, z: 1.1, w: 1.05, d: 0.5, h: 0.18, c: P.steel, gable: P.steelDark, ridge: 'x' });

    // lower maintenance utility panel
    g.box({ x: 0, y: -0.15, z: 0.18, w: 0.6, d: 0.38, h: 0.22, c: P.steel });
  },
};
