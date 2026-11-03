import { P } from '../lib/palette.js';

export default {
  key: 'biological-research-chamber',
  name: 'Biological Research Chamber',
  category: 'science',
  blurb: 'Biosafety incubation containment chamber with transparent culture dome, HEPA filtration, and nutrient supply.',
  what: 'a biological research chamber',
  footprint: [2.0, 1.6],
  height: 1.85,
  tags: ['science', 'biology', 'chamber', 'incubator', 'research'],
  refs: ['AF-SCI-002'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy incubator pedestal base
    g.box({ x: 0, y: 0, z: 0, w: 1.8, d: 1.4, h: 0.22, c: P.steelDark });

    // main containment cabinet
    g.box({ x: 0, y: 0, z: 0.22, w: 1.6, d: 1.2, h: 0.75, c: P.offWhite });

    // transparent specimen cultivation dome
    g.cyl({ x: 0, y: 0, z: 0.97, r: 0.55, h: 0.55, c: P.teal, segments: 14 });

    // top biosafety HEPA filtration cowl
    g.roof({ x: 0, y: 0, z: 1.52, w: 1.2, d: 0.9, h: 0.28, c: P.steel, gable: P.steelDark, ridge: 'x' });

    // biohazard nutrient supply canister
    g.cyl({ x: 0.65, y: 0.4, z: 0.22, r: 0.15, h: 0.65, c: P.teal, segments: 10 });
  },
};
