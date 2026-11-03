import { P } from '../lib/palette.js';

export default {
  key: 'drainage-channel',
  name: 'Drainage Channel',
  category: 'environmental',
  blurb: 'Recessed habitat stormwater and greywater drainage trough with cast iron slotted grates and cleanout cover.',
  what: 'a drainage channel',
  footprint: [2.2, 0.9],
  height: 0.3,
  tags: ['environmental', 'drainage', 'channel', 'grate', 'gutter'],
  refs: ['AF-PRP-024'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete gutter trench basin
    g.box({ x: 0, y: 0, z: 0, w: 2.1, d: 0.8, h: 0.12, c: P.steelDark });

    // left recessed curb shoulder
    g.box({ x: 0, y: -0.32, z: 0.12, w: 2.1, d: 0.16, h: 0.12, c: P.steel });

    // right recessed curb shoulder
    g.box({ x: 0, y: 0.32, z: 0.12, w: 2.1, d: 0.16, h: 0.12, c: P.steel });

    // slotted cast iron drainage grate section
    g.box({ x: 0, y: 0, z: 0.12, w: 1.95, d: 0.45, h: 0.08, c: P.offWhite });

    // central cleanout access cover
    g.cyl({ x: 0, y: 0, z: 0.2, r: 0.18, h: 0.04, c: P.steelDark, segments: 12 });
  },
};
