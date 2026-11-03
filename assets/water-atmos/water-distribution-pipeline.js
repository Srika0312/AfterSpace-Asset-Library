import { P } from '../lib/palette.js';

export default {
  key: 'water-distribution-pipeline',
  name: 'Water Distribution Pipeline',
  category: 'water-atmos',
  blurb: 'Overland trunk water pipeline segment with cradle piers, bolted flange coupler, and vertical isolation branch.',
  what: 'a water distribution pipeline',
  footprint: [2.2, 0.9],
  height: 0.95,
  tags: ['water', 'pipeline', 'distribution', 'conduit', 'plumbing'],
  refs: ['AF-WAT-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete support saddle piers
    g.box({ x: 0, y: 0, z: 0, w: 2.1, d: 0.6, h: 0.2, c: P.steelDark });

    // main insulated pressurized water trunk line
    g.cyl({ x: 0, y: 0, z: 0.42, r: 0.24, h: 2.1, axis: 'x', c: P.teal, segments: 14 });

    // reinforced central bolted flange collar
    g.cyl({ x: 0, y: 0, z: 0.42, r: 0.31, h: 0.22, axis: 'x', c: P.steel, segments: 12 });

    // vertical service takeoff branch
    g.cyl({ x: 0, y: 0, z: 0.55, r: 0.13, h: 0.32, axis: 'z', c: P.offWhite, segments: 10 });

    // manual isolation shutoff wheel
    g.cyl({ x: 0, y: 0, z: 0.88, r: 0.2, h: 0.08, axis: 'z', c: P.offWhite, segments: 10 });
  },
};
