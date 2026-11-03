import { P } from '../lib/palette.js';

export default {
  key: 'construction-robot',
  name: 'Construction Robot',
  category: 'inhabitants',
  blurb: 'Heavy-duty industrial builder droid with hydraulic excavator arm, stabilizer outriggers, and gripper jaw.',
  what: 'a construction robot',
  footprint: [1.1, 1.0],
  height: 1.5,
  tags: ['inhabitants', 'robot', 'construction', 'builder', 'industrial'],
  refs: ['AF-INH-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // quad outrigger stabilizer tracks
    g.box({ x: 0, y: 0, z: 0, w: 0.95, d: 0.8, h: 0.26, c: P.steelDark });

    // heavy hydraulic excavator body
    g.box({ x: 0, y: 0, z: 0.26, w: 0.7, d: 0.6, h: 0.52, c: P.amber });

    // reinforced boom mast
    g.cyl({ x: 0.15, y: -0.15, z: 0.78, r: 0.08, h: 0.65, c: P.steel, segments: 8 });

    // heavy gripper jaw shovel
    g.box({ x: 0.35, y: -0.15, z: 0.35, w: 0.35, d: 0.45, h: 0.3, c: P.steelDark });

    // operator telepresence pod
    g.box({ x: -0.18, y: 0.15, z: 0.78, w: 0.32, d: 0.3, h: 0.28, c: P.offWhite });
  },
};
