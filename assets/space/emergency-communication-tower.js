import { P } from '../lib/palette.js';

export default {
  key: 'emergency-communication-tower',
  name: 'Emergency Communication Tower',
  category: 'space',
  blurb: 'Hardened tower with a siren and beacon for emergency broadcasts.',
  what: 'an emergency communication tower',
  footprint: [1.3, 1],
  height: 2.4,
  tags: ['space', 'emergency', 'comms', 'siren'],
  refs: ['AF-SPACE-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // equipment shed and stout tower
    g.box({ x: 0, y: 0, z: 0, w: 0.9, d: 0.7, h: 0.45, c: P.offWhite });
    g.cyl({ x: 0.1, y: 0, z: 0.4, r: 0.25, h: 1.75, r2: 0.14, c: P.steelDark, segments: 8 });

    // siren cone and red beacon
    g.cyl({ x: 0.1, y: 0, z: 1.95, r: 0.2, h: 0.22, r2: 0.08, c: P.amber, segments: 8 });
    g.circle({ x: 0.1, y: 0, z: 2.15, r: 0.14, c: P.red, bias: 0.6 });
  },
};
