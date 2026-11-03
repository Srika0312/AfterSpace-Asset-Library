import { P } from '../lib/palette.js';

export default {
  key: 'industrial-storage-container',
  name: 'Industrial Storage Container',
  category: 'industrial',
  blurb: 'Reinforced secure storage container with forklift pockets and protective top lid.',
  what: 'an industrial storage container',
  footprint: [1.4, 1.1],
  height: 1.0,
  tags: ['industrial', 'storage', 'yard', 'tools'],
  refs: ['AF-IND-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // pallet skid base with forklift openings
    g.box({ x: 0, y: 0, z: 0, w: 1.25, d: 0.95, h: 0.12, c: P.steelDark });

    // dark forklift tine slot marker
    g.box({ x: 0, y: 0.48, z: 0.02, w: 0.22, d: 0.02, h: 0.08, c: P.black });

    // main insulated container hull
    g.box({ x: 0, y: 0, z: 0.12, w: 1.2, d: 0.9, h: 0.72, c: P.sand });

    // weather-sealed top lid
    g.box({ x: 0, y: 0, z: 0.84, w: 1.25, d: 0.95, h: 0.08, c: P.slate });
  },
};
