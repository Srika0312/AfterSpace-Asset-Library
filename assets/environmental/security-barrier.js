import { P } from '../lib/palette.js';

export default {
  key: 'security-barrier',
  name: 'Security Barrier',
  category: 'environmental',
  blurb: 'Automated vehicle checkpoint barrier with motorized pivot pedestal, boom arm, and optical sensor.',
  what: 'a security barrier',
  footprint: [2.0, 0.8],
  height: 1.2,
  tags: ['environmental', 'security', 'barrier', 'gate', 'checkpoint'],
  refs: ['AF-PRP-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base footing plinth
    g.box({ x: -0.65, y: 0, z: 0, w: 0.55, d: 0.55, h: 0.18, c: P.steelDark });

    // barrier drive motor housing pedestal
    g.box({ x: -0.65, y: 0, z: 0.18, w: 0.45, d: 0.45, h: 0.75, c: P.offWhite });

    // horizontal barrier arm boom
    g.box({ x: 0.3, y: 0, z: 0.75, w: 1.5, d: 0.08, h: 0.12, c: P.steel });

    // vehicle scanner optical sensor
    g.box({ x: -0.65, y: 0.22, z: 0.6, w: 0.25, d: 0.08, h: 0.2, c: P.steelDark });

    // top authorization beacon lamp
    g.circle({ x: -0.65, y: 0, z: 0.95, r: 0.08, c: P.teal, bias: 0.55 });
  },
};
