import { P } from '../lib/palette.js';

export default {
  key: 'directional-signboard',
  name: 'Directional Signboard',
  category: 'environmental',
  blurb: 'Habitat concourse wayfinding signpost with dual directional arrow plaques and sector identifier.',
  what: 'a directional signboard',
  footprint: [1.2, 0.6],
  height: 1.8,
  tags: ['environmental', 'sign', 'wayfinding', 'direction', 'concourse'],
  refs: ['AF-PRP-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // ground anchor base plinth
    g.box({ x: 0, y: 0, z: 0, w: 0.6, d: 0.5, h: 0.16, c: P.steelDark });

    // vertical signpost mast
    g.cyl({ x: 0, y: 0, z: 0.16, r: 0.07, h: 1.55, c: P.steel, segments: 8 });

    // upper directional indicator plaque
    g.box({ x: 0.2, y: 0, z: 1.35, w: 0.75, d: 0.08, h: 0.24, c: P.offWhite });

    // lower directional indicator plaque
    g.box({ x: -0.2, y: 0, z: 1.05, w: 0.75, d: 0.08, h: 0.24, c: P.offWhite });

    // wayfinding chevron symbol disc
    g.circle({ x: 0.45, y: 0.05, z: 1.47, r: 0.07, c: P.teal, bias: 0.55 });
  },
};
