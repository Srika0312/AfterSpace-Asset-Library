import { P } from '../lib/palette.js';

export default {
  key: 'scientist',
  name: 'Scientist',
  category: 'inhabitants',
  blurb: 'Habitat researcher in white laboratory coat equipped with datapad tablet and protective optical shield.',
  what: 'a scientist',
  footprint: [0.6, 0.6],
  height: 1.45,
  tags: ['inhabitants', 'scientist', 'researcher', 'laboratory', 'personnel'],
  refs: ['AF-INH-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // lab boots / trousers
    g.box({ x: 0, y: 0, z: 0, w: 0.35, d: 0.28, h: 0.55, c: P.steelDark });

    // white cleanroom laboratory coat
    g.box({ x: 0, y: 0, z: 0.55, w: 0.48, d: 0.35, h: 0.6, c: P.offWhite });

    // head and protective goggles
    g.cyl({ x: 0, y: 0, z: 1.15, r: 0.14, h: 0.25, c: P.clay, segments: 10 });

    // analytical datapad tablet
    g.box({ x: 0, y: 0.18, z: 0.7, w: 0.28, d: 0.06, h: 0.22, c: P.cyan });

    // protective optical eye shield
    g.circle({ x: 0, y: 0.13, z: 1.28, r: 0.06, c: P.cyan, bias: 0.55 });
  },
};
