import { P } from '../lib/palette.js';

export default {
  key: 'ground-communication-antenna',
  name: 'Ground Communication Antenna',
  category: 'space',
  blurb: 'Ground station with a shielded equipment cabinet and a small uplink dish.',
  what: 'a ground communication antenna',
  footprint: [1.4, 1],
  height: 1.8,
  tags: ['space', 'comms', 'antenna', 'ground'],
  refs: ['AF-SPACE-002'],
  hero: 0,
  status: 'review',
  draw(g) {
    // equipment cabinet and mast
    g.box({ x: -0.15, y: 0, z: 0, w: 0.8, d: 0.62, h: 0.4, c: P.sand });
    g.cyl({ x: 0.35, y: 0, z: 0.05, r: 0.06, h: 1.15, c: P.steelDark, segments: 8 });

    // compact dish on top
    g.circle({ x: 0.35, y: 0, z: 1.38, r: 0.32, c: P.offWhite, bias: 0.55 });
    g.circle({ x: 0.35, y: 0, z: 1.38, r: 0.1, c: P.brass, bias: 0.7 });
  },
};
