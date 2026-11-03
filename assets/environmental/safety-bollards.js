import { P } from '../lib/palette.js';

export default {
  key: 'safety-bollards',
  name: 'Safety Bollards',
  category: 'environmental',
  blurb: 'Trio of heavy steel traffic bollards with reflective collars guarding pedestrian concourses.',
  what: 'safety bollards',
  footprint: [1.6, 0.8],
  height: 0.9,
  tags: ['environmental', 'bollards', 'safety', 'barrier', 'traffic'],
  refs: ['AF-PRP-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // subterranean foundation footing slab
    g.box({ x: 0, y: 0, z: 0, w: 1.5, d: 0.5, h: 0.12, c: P.steelDark });

    // left impact bollard cylinder
    g.cyl({ x: -0.5, y: 0, z: 0.12, r: 0.16, h: 0.75, c: P.steel, segments: 12 });

    // center impact bollard cylinder
    g.cyl({ x: 0, y: 0, z: 0.12, r: 0.16, h: 0.75, c: P.steel, segments: 12 });

    // right impact bollard cylinder
    g.cyl({ x: 0.5, y: 0, z: 0.12, r: 0.16, h: 0.75, c: P.steel, segments: 12 });

    // reflective high-visibility collar ring
    g.cyl({ x: 0, y: 0, z: 0.65, r: 0.18, h: 0.12, c: P.amber, segments: 12 });
  },
};
