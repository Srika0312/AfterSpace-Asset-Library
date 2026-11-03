import { P } from '../lib/palette.js';

export default {
  key: 'water-recycling-machine',
  name: 'Water Recycling Machine',
  category: 'water-atmos',
  blurb: 'Greywater reclamation bioreactor and centrifuge module with distillation column and digital controller.',
  what: 'a water recycling machine',
  footprint: [1.8, 1.3],
  height: 1.65,
  tags: ['water', 'recycling', 'reclamation', 'centrifuge', 'bioreactor'],
  refs: ['AF-WAT-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // foundation skid frame
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.2, h: 0.25, c: P.steelDark });

    // main centrifuge recycling drum
    g.cyl({ x: -0.32, y: 0, z: 0.25, r: 0.5, h: 1.1, c: P.steel, segments: 14 });

    // vertical distillation and condenser column
    g.cyl({ x: 0.45, y: -0.18, z: 0.25, r: 0.24, h: 1.35, c: P.teal, segments: 12 });

    // digital cycling control cabinet
    g.box({ x: 0.42, y: 0.32, z: 0.25, w: 0.44, d: 0.35, h: 0.75, c: P.offWhite });

    // purity status indicator disc
    g.circle({ x: 0.42, y: 0.42, z: 0.8, r: 0.07, c: P.teal, bias: 0.55 });
  },
};
