import { P } from '../lib/palette.js';

export default {
  key: 'experimental-testing-chamber',
  name: 'Experimental Testing Chamber',
  category: 'science',
  blurb: 'Hardened material test cell with lead-shielded plinth, thick observation window, and diagnostic collimator.',
  what: 'an experimental testing chamber',
  footprint: [2.2, 1.6],
  height: 1.7,
  tags: ['science', 'testing', 'experiment', 'chamber', 'materials'],
  refs: ['AF-SCI-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // lead-shielded floor plinth
    g.box({ x: 0, y: 0, z: 0, w: 2.1, d: 1.5, h: 0.22, c: P.steelDark });

    // containment test cell body
    g.box({ x: -0.3, y: 0, z: 0.22, w: 1.3, d: 1.3, h: 1.1, c: P.steel });

    // thick blast observation window
    g.box({ x: -0.3, y: 0.66, z: 0.55, w: 0.85, d: 0.08, h: 0.55, c: P.teal });

    // auxiliary instrumentation console
    g.box({ x: 0.65, y: 0, z: 0.22, w: 0.6, d: 1.1, h: 0.95, c: P.offWhite });

    // top laser diagnostic collimator
    g.cyl({ x: -0.3, y: 0, z: 1.32, r: 0.2, h: 0.28, c: P.steelDark, segments: 10 });
  },
};
