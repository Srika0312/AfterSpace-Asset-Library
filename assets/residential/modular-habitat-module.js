import { P } from '../lib/palette.js';

export default {
  key: 'modular-habitat-module',
  name: 'Modular Habitat Module',
  category: 'residential',
  blurb: 'Insulated habitat living unit with thermal roof mantle, panoramic window slit, and climate utility collar.',
  what: 'a modular habitat module',
  footprint: [2.2, 2.0],
  height: 1.8,
  tags: ['residential', 'habitat', 'modular', 'living', 'quarters'],
  refs: ['AF-RES-001'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete ballast foundation plinth
    g.box({ x: 0, y: 0, z: 0, w: 2.1, d: 1.9, h: 0.22, c: P.steelDark });

    // insulated habitat living quarters shell
    g.box({ x: 0, y: 0, z: 0.22, w: 1.9, d: 1.7, h: 1.15, c: P.offWhite });

    // sloped thermal roof mantle
    g.roof({ x: 0, y: 0, z: 1.37, w: 1.95, d: 1.75, h: 0.38, c: P.terracotta, gable: P.offWhite, ridge: 'x' });

    // recessed panoramic habitat window slit
    g.box({ x: 0, y: 0.86, z: 0.6, w: 1.2, d: 0.08, h: 0.45, c: P.teal });

    // climate control utility stack
    g.cyl({ x: 0.65, y: -0.55, z: 1.37, r: 0.16, h: 0.38, c: P.steelDark, segments: 10 });
  },
};
