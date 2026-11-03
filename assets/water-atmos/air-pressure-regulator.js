import { P } from '../lib/palette.js';

export default {
  key: 'air-pressure-regulator',
  name: 'Air Pressure Regulator',
  category: 'water-atmos',
  blurb: 'Habitat airlock atmospheric pressure balancing unit with diaphragm dome and high-flow conduits.',
  what: 'an air pressure regulator',
  footprint: [1.2, 0.9],
  height: 1.2,
  tags: ['pressure', 'regulator', 'valve', 'atmosphere', 'airlock'],
  refs: ['AF-WAT-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // wall / floor mounting bracket
    g.box({ x: 0, y: 0, z: 0, w: 1.1, d: 0.8, h: 0.18, c: P.steelDark });

    // central diaphragm valve housing
    g.box({ x: 0, y: 0, z: 0.18, w: 0.65, d: 0.55, h: 0.52, c: P.steel });

    // balanced pneumatic actuator dome
    g.cyl({ x: 0, y: 0, z: 0.7, r: 0.28, h: 0.35, c: P.teal, segments: 12 });

    // high-flow cross-port conduit
    g.cyl({ x: 0, y: 0, z: 0.42, r: 0.12, h: 1.0, axis: 'x', c: P.offWhite, segments: 10 });

    // calibration handwheel collar
    g.cyl({ x: 0, y: 0, z: 1.05, r: 0.14, h: 0.1, c: P.offWhite, segments: 10 });
  },
};
