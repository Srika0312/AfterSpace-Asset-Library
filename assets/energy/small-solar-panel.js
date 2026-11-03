import { P } from '../lib/palette.js';

export default {
  key: 'small-solar-panel',
  name: 'Small Solar Panel',
  category: 'energy',
  blurb: 'Compact directional photovoltaic panel on a swiveling mast for localized equipment power.',
  what: 'a small solar panel',
  footprint: [1.0, 1.0],
  height: 1.25,
  tags: ['energy', 'solar', 'panel', 'power', 'offgrid'],
  refs: ['AF-ENG-002'],
  hero: 0,
  status: 'review',
  draw(g) {
    // anchor base plate
    g.cyl({ x: 0, y: 0, z: 0, r: 0.25, h: 0.1, c: P.steelDark, segments: 8 });

    // swivel mast column
    g.cyl({ x: 0, y: 0, z: 0.08, r: 0.05, h: 0.85, c: P.steel, segments: 8 });

    // adjustable tilt mounting bracket
    g.box({ x: 0, y: 0, z: 0.88, w: 0.2, d: 0.18, h: 0.12, c: P.brass });

    // photovoltaic collector module
    g.box({ x: 0, y: 0, z: 1.0, w: 0.85, d: 0.7, h: 0.08, c: P.teal });

    // aluminum module frame border
    g.box({ x: 0, y: 0, z: 1.04, w: 0.88, d: 0.74, h: 0.03, c: P.steelDark });
  },
};
