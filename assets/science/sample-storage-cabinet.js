import { P } from '../lib/palette.js';

export default {
  key: 'sample-storage-cabinet',
  name: 'Sample Storage Cabinet',
  category: 'science',
  blurb: 'Temperature-controlled specimen archive rack with pull-out cryo-drawers and biometric electronic lock.',
  what: 'a sample storage cabinet',
  footprint: [1.4, 1.0],
  height: 1.8,
  tags: ['science', 'storage', 'cabinet', 'specimen', 'samples'],
  refs: ['AF-SCI-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base footing plinth
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 0.9, h: 0.18, c: P.steelDark });

    // main refrigerated specimen locker body
    g.box({ x: 0, y: 0, z: 0.18, w: 1.15, d: 0.78, h: 1.45, c: P.offWhite });

    // upper cryogenic cooling unit header
    g.box({ x: 0, y: 0, z: 1.63, w: 1.1, d: 0.72, h: 0.15, c: P.steelDark });

    // slide-out sample drawer fascia
    g.box({ x: 0, y: 0.4, z: 0.35, w: 0.95, d: 0.05, h: 0.55, c: P.teal });

    // biometric keypad indicator
    g.circle({ x: 0.35, y: 0.41, z: 1.25, r: 0.07, c: P.amber, bias: 0.55 });
  },
};
