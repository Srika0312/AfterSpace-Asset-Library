import { P } from '../lib/palette.js';

export default {
  key: 'vehicle-maintenance-platform',
  name: 'Vehicle Maintenance Platform',
  category: 'transport',
  blurb: 'Hydraulic vehicle servicing rack with twin elevated wheel tracks, inspection pit, and diagnostic terminal.',
  what: 'a vehicle maintenance platform',
  footprint: [2.2, 1.8],
  height: 1.4,
  tags: ['transport', 'maintenance', 'platform', 'service', 'workshop'],
  refs: ['AF-TRN-016'],
  hero: 0,
  status: 'review',
  draw(g) {
    // shop floor slab and pit recess
    g.box({ x: 0, y: 0, z: 0, w: 2.1, d: 1.7, h: 0.16, c: P.steelDark });

    // port hydraulic runner track
    g.box({ x: 0, y: -0.45, z: 0.16, w: 1.8, d: 0.42, h: 0.38, c: P.steel });

    // starboard hydraulic runner track
    g.box({ x: 0, y: 0.45, z: 0.16, w: 1.8, d: 0.42, h: 0.38, c: P.steel });

    // diagnostic computer workstation
    g.box({ x: 0.75, y: -0.65, z: 0.16, w: 0.35, d: 0.35, h: 0.85, c: P.offWhite });

    // safety guardrail post
    g.cyl({ x: -0.85, y: -0.65, z: 0.16, r: 0.06, h: 0.75, c: P.teal, segments: 8 });
  },
};
