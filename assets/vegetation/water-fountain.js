import { P } from '../lib/palette.js';

export default {
  key: 'water-fountain',
  name: 'Water Fountain',
  category: 'vegetation',
  blurb: 'Tiered decorative habitat plaza fountain with central stone pedestal, spill basin, and aerated jet.',
  what: 'a water fountain',
  footprint: [1.6, 1.6],
  height: 1.5,
  tags: ['vegetation', 'water', 'fountain', 'plaza', 'civic'],
  refs: ['AF-VEG-014'],
  hero: 0,
  status: 'review',
  draw(g) {
    // octagonal catch basin plinth
    g.box({ x: 0, y: 0, z: 0, w: 1.6, d: 1.6, h: 0.22, c: P.steelDark });

    // tiered central pedestal column
    g.cyl({ x: 0, y: 0, z: 0.22, r: 0.32, h: 0.65, c: P.offWhite, segments: 12 });

    // mid-level water spill tier basin
    g.cyl({ x: 0, y: 0, z: 0.85, r: 0.55, h: 0.14, c: P.teal, segments: 14 });

    // upper fountain jet finial
    g.cyl({ x: 0, y: 0, z: 0.99, r: 0.14, h: 0.35, c: P.steel, segments: 10 });

    // aerated water plume spray
    g.circle({ x: 0, y: 0, z: 1.36, r: 0.22, c: P.offWhite, bias: 0.55 });
  },
};
