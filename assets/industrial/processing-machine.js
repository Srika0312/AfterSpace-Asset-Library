import { P } from '../lib/palette.js';

export default {
  key: 'processing-machine',
  name: 'Processing Machine',
  category: 'industrial',
  blurb: 'Automated sorting and milling station with top raw intake hopper and side discharge chute.',
  what: 'a processing machine',
  footprint: [1.3, 1.1],
  height: 1.45,
  tags: ['industrial', 'machine', 'processing', 'manufacturing', 'milling'],
  refs: ['AF-IND-014'],
  hero: 0,
  status: 'review',
  draw(g) {
    // main enclosed processing base
    g.box({ x: 0, y: 0, z: 0, w: 1.05, d: 0.85, h: 0.75, c: P.offWhite });

    // operator control screen and inspection window
    g.box({ x: 0, y: 0.44, z: 0.35, w: 0.45, d: 0.04, h: 0.28, c: P.teal });

    // top intake funnel hopper
    g.cyl({ x: 0, y: 0, z: 0.75, r: 0.18, h: 0.45, r2: 0.42, c: P.steelDark, segments: 10 });

    // processed material ejection chute
    g.box({ x: 0.55, y: 0, z: 0.15, w: 0.22, d: 0.28, h: 0.25, c: P.steelDark });

    // cycle status indicator
    g.circle({ x: -0.32, y: 0.44, z: 0.68, r: 0.07, c: P.amber, bias: 0.55 });
  },
};
