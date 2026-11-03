import { P } from '../lib/palette.js';

export default {
  key: 'navigation-beacon',
  name: 'Navigation Beacon',
  category: 'space',
  blurb: 'Low-power route beacon with a warm amber lamp for night approaches.',
  what: 'a navigation beacon',
  footprint: [0.5, 0.5],
  height: 1.55,
  tags: ['space', 'navigation', 'beacon', 'light'],
  refs: ['AF-SPACE-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // foot, post and brass lamp housing
    g.cyl({ x: 0, y: 0, z: 0, r: 0.2, h: 0.1, c: P.steelDark, segments: 10 });
    g.cyl({ x: 0, y: 0, z: 0.08, r: 0.055, h: 1.25, c: P.steel, segments: 8 });
    g.box({ x: 0, y: 0, z: 1.3, w: 0.26, d: 0.26, h: 0.16, c: P.brass, bias: 0.2 });

    // visible lamp glow
    g.circle({ x: 0, y: 0, z: 1.38, r: 0.17, c: P.amber, bias: 0.6 });
  },
};
