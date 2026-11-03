import { P } from '../lib/palette.js';

export default {
  key: 'laboratory-equipment-table',
  name: 'Laboratory Equipment Table',
  category: 'science',
  blurb: 'Heavy stainless steel cleanroom laboratory bench with under-counter storage, overhead reagent rack, and centrifuge.',
  what: 'a laboratory equipment table',
  footprint: [1.8, 1.2],
  height: 1.2,
  tags: ['science', 'laboratory', 'bench', 'table', 'equipment'],
  refs: ['AF-SCI-001'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base bench legs and support frame
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.1, h: 0.18, c: P.steelDark });

    // polished worktop surface slab
    g.box({ x: 0, y: 0, z: 0.18, w: 1.6, d: 1.0, h: 0.55, c: P.offWhite });

    // overhead reagent and pipette rack
    g.box({ x: 0, y: -0.35, z: 0.73, w: 1.5, d: 0.25, h: 0.42, c: P.steel });

    // desktop vortex centrifuge unit
    g.cyl({ x: -0.4, y: 0.15, z: 0.73, r: 0.2, h: 0.22, c: P.teal, segments: 12 });

    // digital analytical scale sensor pad
    g.box({ x: 0.35, y: 0.15, z: 0.73, w: 0.35, d: 0.3, h: 0.08, c: P.teal });
  },
};
