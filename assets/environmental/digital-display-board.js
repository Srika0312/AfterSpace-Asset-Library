import { P } from '../lib/palette.js';

export default {
  key: 'digital-display-board',
  name: 'Digital Display Board',
  category: 'environmental',
  blurb: 'Elevated outdoor digital billboard screen on twin pylons displaying transit schedules and sector alerts.',
  what: 'a digital display board',
  footprint: [1.8, 0.8],
  height: 2.0,
  tags: ['environmental', 'display', 'screen', 'billboard', 'transit'],
  refs: ['AF-PRP-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // twin ground footing anchor pads
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 0.6, h: 0.18, c: P.steelDark });

    // left structural support pylon
    g.cyl({ x: -0.65, y: 0, z: 0.18, r: 0.08, h: 1.15, c: P.steel, segments: 8 });

    // right structural support pylon
    g.cyl({ x: 0.65, y: 0, z: 0.18, r: 0.08, h: 1.15, c: P.steel, segments: 8 });

    // wide digital billboard screen frame
    g.box({ x: 0, y: 0, z: 1.15, w: 1.6, d: 0.18, h: 0.78, c: P.offWhite });

    // active high-contrast display panel surface
    g.box({ x: 0, y: 0.08, z: 1.18, w: 1.45, d: 0.06, h: 0.68, c: P.teal });
  },
};
