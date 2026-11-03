import { P } from '../lib/palette.js';

export default {
  key: 'industrial-pump',
  name: 'Industrial Pump',
  category: 'industrial',
  blurb: 'Skid-mounted centrifugal fluid transfer pump driven by an induction electric motor.',
  what: 'an industrial pump',
  footprint: [1.3, 0.9],
  height: 0.85,
  tags: ['industrial', 'pump', 'motor', 'fluid', 'machinery'],
  refs: ['AF-IND-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy channel skid base
    g.box({ x: 0, y: 0, z: 0, w: 1.15, d: 0.65, h: 0.12, c: P.steelDark });

    // enclosed electric drive motor
    g.cyl({ x: -0.28, y: 0, z: 0.32, r: 0.2, h: 0.48, c: P.teal, axis: 'x', segments: 10 });

    // centrifugal volute pump casing
    g.cyl({ x: 0.28, y: 0, z: 0.34, r: 0.24, h: 0.28, c: P.steel, axis: 'x', segments: 12 });

    // vertical discharge nozzle flange
    g.cyl({ x: 0.28, y: 0, z: 0.48, r: 0.09, h: 0.28, c: P.steel, axis: 'z', segments: 8 });

    // motor wiring junction box
    g.circle({ x: -0.28, y: 0.22, z: 0.42, r: 0.07, c: P.amber, bias: 0.55 });
  },
};
