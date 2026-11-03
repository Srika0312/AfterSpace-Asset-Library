import { P } from '../lib/palette.js';

export default {
  key: 'recycling-bins',
  name: 'Recycling Bins',
  category: 'environmental',
  blurb: 'Three-stream habitat recycling station with color-coded lids for polymers, organics, and metals.',
  what: 'recycling bins',
  footprint: [1.5, 0.8],
  height: 1.1,
  tags: ['environmental', 'recycling', 'bins', 'waste', 'ecology'],
  refs: ['AF-PRP-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base containment floor runner
    g.box({ x: 0, y: 0, z: 0, w: 1.4, d: 0.7, h: 0.14, c: P.steelDark });

    // triple-bin main body housing
    g.box({ x: 0, y: 0, z: 0.14, w: 1.35, d: 0.58, h: 0.65, c: P.offWhite });

    // polymer recycling slot lid
    g.box({ x: -0.42, y: 0, z: 0.79, w: 0.38, d: 0.52, h: 0.15, c: P.teal });

    // organic recycling slot lid
    g.box({ x: 0, y: 0, z: 0.79, w: 0.38, d: 0.52, h: 0.15, c: P.steel });

    // metal recycling slot lid
    g.box({ x: 0.42, y: 0, z: 0.79, w: 0.38, d: 0.52, h: 0.15, c: P.steelDark });
  },
};
