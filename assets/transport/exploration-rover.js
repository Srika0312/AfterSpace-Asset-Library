import { P } from '../lib/palette.js';

export default {
  key: 'exploration-rover',
  name: 'Exploration Rover',
  category: 'transport',
  blurb: 'Deep-terrain scientific survey rover featuring articulated dish antenna, science pod, and camera mast.',
  what: 'an exploration rover',
  footprint: [2.2, 1.4],
  height: 1.5,
  tags: ['transport', 'rover', 'exploration', 'science', 'survey'],
  refs: ['AF-TRN-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // rocker-bogie articulated mobility frame
    g.box({ x: 0, y: 0, z: 0.12, w: 1.9, d: 1.2, h: 0.26, c: P.steelDark });

    // pressurized science laboratory cabin
    g.box({ x: 0.2, y: 0, z: 0.38, w: 1.2, d: 0.95, h: 0.65, c: P.offWhite });

    // high-gain communications dish
    g.circle({ x: -0.5, y: -0.25, z: 0.95, r: 0.32, c: P.teal, bias: 0.55 });

    // forward optical sensor & spectrometer mast
    g.cyl({ x: 0.65, y: 0.25, z: 0.38, r: 0.08, h: 0.95, c: P.steel, segments: 8 });

    // rear geological sample storage bay
    g.box({ x: -0.5, y: 0.25, z: 0.38, w: 0.45, d: 0.4, h: 0.42, c: P.steel });
  },
};
