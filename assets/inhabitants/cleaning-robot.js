import { P } from '../lib/palette.js';

export default {
  key: 'cleaning-robot',
  name: 'Cleaning Robot',
  category: 'inhabitants',
  blurb: 'Autonomous habitat sanitation disc droid with rotary scrubbers, debris hopper, and status light ring.',
  what: 'a cleaning robot',
  footprint: [0.9, 0.9],
  height: 0.7,
  tags: ['inhabitants', 'robot', 'cleaning', 'sanitation', 'droid'],
  refs: ['AF-INH-002'],
  hero: 0,
  status: 'review',
  draw(g) {
    // low circular disc vacuum chassis
    g.cyl({ x: 0, y: 0, z: 0, r: 0.42, h: 0.18, c: P.steelDark, segments: 14 });

    // sleek dome body shell
    g.cyl({ x: 0, y: 0, z: 0.18, r: 0.38, r2: 0.2, h: 0.32, c: P.offWhite, segments: 14 });

    // internal waste collection hopper
    g.box({ x: 0, y: 0, z: 0.45, w: 0.35, d: 0.3, h: 0.16, c: P.teal });

    // rotary scrubber side brushes
    g.cyl({ x: 0.32, y: 0.2, z: 0.08, r: 0.14, h: 0.06, c: P.steel, segments: 8 });

    // top status LED ring
    g.circle({ x: 0, y: 0, z: 0.62, r: 0.09, c: P.teal, bias: 0.55 });
  },
};
