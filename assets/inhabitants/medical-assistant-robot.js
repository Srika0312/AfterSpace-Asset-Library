import { P } from '../lib/palette.js';

export default {
  key: 'medical-assistant-robot',
  name: 'Medical Assistant Robot',
  category: 'inhabitants',
  blurb: 'Cleanroom clinical care droid with omnidirectional base, medical badge, and diagnostic visor.',
  what: 'a medical assistant robot',
  footprint: [0.8, 0.8],
  height: 1.1,
  tags: ['inhabitants', 'robot', 'medical', 'healthcare', 'clinic'],
  refs: ['AF-INH-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // smooth omnidirectional wheel skirt
    g.cyl({ x: 0, y: 0, z: 0, r: 0.32, h: 0.2, c: P.steelDark, segments: 14 });

    // cleanroom medical torso
    g.cyl({ x: 0, y: 0, z: 0.2, r: 0.28, r2: 0.22, h: 0.65, c: P.offWhite, segments: 14 });

    // humanoid head screen
    g.cyl({ x: 0, y: 0, z: 0.85, r: 0.18, h: 0.22, c: P.offWhite, segments: 12 });

    // medical red cross badge
    g.circle({ x: 0, y: 0.23, z: 0.55, r: 0.08, c: P.red, bias: 0.55 });

    // vital signs diagnostic visor
    g.circle({ x: 0, y: 0.17, z: 0.95, r: 0.07, c: P.teal, bias: 0.55 });
  },
};
