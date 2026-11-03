import { P } from '../lib/palette.js';

export default {
  key: 'space-weather-monitoring-station',
  name: 'Space Weather Monitoring Station',
  category: 'space',
  blurb: 'Domed observatory tracking solar weather and atmospheric conditions.',
  what: 'a space weather monitoring station',
  footprint: [1.6, 1.2],
  height: 1.7,
  tags: ['space', 'weather', 'science', 'observatory'],
  refs: ['AF-SPACE-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // instrument lab and dome base
    g.box({ x: 0, y: 0, z: 0, w: 1.2, d: 0.9, h: 0.4, c: P.offWhite });
    g.cyl({ x: 0, y: 0, z: 0.4, r: 0.38, h: 0.18, c: P.steelDark, segments: 14 });
    g.circle({ x: 0, y: 0, z: 0.58, r: 0.36, c: P.teal, bias: 0.45 });

    // sensor mast
    g.cyl({ x: 0.42, y: 0.22, z: 0.4, r: 0.04, h: 1.05, c: P.steelDark, segments: 8 });
    g.circle({ x: 0.42, y: 0.22, z: 1.5, r: 0.1, c: P.amber, bias: 0.6 });
  },
};
