import { P } from '../lib/palette.js';

export default {
  key: 'streetlight',
  name: 'Streetlight',
  category: 'environmental',
  blurb: 'Curved corridor luminaire mast with cantilevered boom, downward LED fixture, and warm emitter.',
  what: 'a streetlight',
  footprint: [0.8, 0.8],
  height: 2.4,
  tags: ['environmental', 'streetlight', 'lighting', 'mast', 'corridor'],
  refs: ['AF-PRP-001'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base mounting flange footing
    g.box({ x: 0, y: 0, z: 0, w: 0.6, d: 0.6, h: 0.18, c: P.steelDark });

    // vertical tubular light pole
    g.cyl({ x: 0, y: 0, z: 0.18, r: 0.08, h: 1.85, c: P.steel, segments: 8 });

    // cantilevered light boom arm
    g.box({ x: 0.22, y: 0, z: 2.0, w: 0.5, d: 0.12, h: 0.1, c: P.steelDark });

    // downward luminaire lamp fixture
    g.box({ x: 0.42, y: 0, z: 1.92, w: 0.32, d: 0.24, h: 0.1, c: P.offWhite });

    // high-intensity LED warm emitter
    g.circle({ x: 0.42, y: 0, z: 1.91, r: 0.1, c: P.amber, bias: 0.55 });
  },
};
