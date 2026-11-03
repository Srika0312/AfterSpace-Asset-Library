import { P } from '../lib/palette.js';

export default {
  key: 'maintenance-vehicle',
  name: 'Maintenance Vehicle',
  category: 'transport',
  blurb: 'Utility service vehicle equipped with hydraulic crane mast, tool chests, and warning beacon.',
  what: 'a maintenance vehicle',
  footprint: [2.0, 1.2],
  height: 1.4,
  tags: ['transport', 'maintenance', 'utility', 'crane', 'service'],
  refs: ['AF-TRN-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // reinforced service truck frame
    g.box({ x: 0, y: 0, z: 0.1, w: 1.8, d: 1.05, h: 0.26, c: P.steelDark });

    // single-cab operator compartment
    g.box({ x: 0.48, y: 0, z: 0.36, w: 0.68, d: 0.9, h: 0.62, c: P.offWhite });

    // rear utility bed with equipment tool lockers
    g.box({ x: -0.38, y: 0, z: 0.36, w: 0.95, d: 0.88, h: 0.44, c: P.steel });

    // articulated hydraulic service crane mast
    g.cyl({ x: -0.35, y: 0, z: 0.8, r: 0.08, h: 0.6, axis: 'z', c: P.steel, segments: 8 });

    // roof work area warning beacon
    g.circle({ x: 0.48, y: 0, z: 0.99, r: 0.07, c: P.amber, bias: 0.55 });
  },
};
