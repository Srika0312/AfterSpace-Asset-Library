import { P } from '../lib/palette.js';

export default {
  key: 'railway-signal',
  name: 'Railway Signal',
  category: 'transport',
  blurb: 'Trackside automated block signal mast with sun-shielded aspect lamps and track switch relay housing.',
  what: 'a railway signal',
  footprint: [1.0, 1.0],
  height: 2.4,
  tags: ['transport', 'railway', 'signal', 'safety', 'transit'],
  refs: ['AF-TRN-018'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete trackside foundation
    g.box({ x: 0, y: 0, z: 0, w: 0.8, d: 0.8, h: 0.2, c: P.steelDark });

    // structural steel signal mast
    g.cyl({ x: 0, y: 0, z: 0.2, r: 0.1, h: 1.85, c: P.steel, segments: 10 });

    // track relay control cabinet
    g.box({ x: 0, y: 0.2, z: 0.2, w: 0.38, d: 0.26, h: 0.55, c: P.offWhite });

    // upper hooded signal lamp housing
    g.box({ x: 0, y: 0, z: 1.7, w: 0.32, d: 0.28, h: 0.65, c: P.steelDark });

    // illuminated signal aspect lens
    g.circle({ x: 0, y: 0.15, z: 2.05, r: 0.09, c: P.teal, bias: 0.55 });
  },
};
