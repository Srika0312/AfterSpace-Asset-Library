import { P } from '../lib/palette.js';

export default {
  key: 'seed-storage-container',
  name: 'Seed Storage Container',
  category: 'agriculture',
  blurb: 'Hermetic genetic bank seed vault chest with desiccant preservation pod and biometric seal sensor.',
  what: 'a seed storage container',
  footprint: [1.2, 1.0],
  height: 1.3,
  tags: ['agriculture', 'seed', 'storage', 'vault', 'germplasm'],
  refs: ['AF-AGR-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // anti-vibration base frame
    g.box({ x: 0, y: 0, z: 0, w: 1.1, d: 0.9, h: 0.18, c: P.steelDark });

    // double-walled insulated germplasm seed chest
    g.box({ x: 0, y: 0, z: 0.18, w: 0.95, d: 0.75, h: 0.65, c: P.offWhite });

    // vault seal locking lid gasket
    g.roof({ x: 0, y: 0, z: 0.83, w: 1.02, d: 0.82, h: 0.22, c: P.canopy, gable: P.steelDark, ridge: 'x' });

    // desiccant climate preservation pod
    g.cyl({ x: 0, y: 0, z: 1.05, r: 0.15, h: 0.2, c: P.steel, segments: 10 });

    // biometric accession status sensor disc
    g.circle({ x: 0, y: 0.38, z: 0.55, r: 0.08, c: P.canopy, bias: 0.55 });
  },
};
