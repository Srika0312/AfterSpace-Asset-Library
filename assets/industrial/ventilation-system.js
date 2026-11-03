import { P } from '../lib/palette.js';

export default {
  key: 'ventilation-system',
  name: 'Ventilation System',
  category: 'industrial',
  blurb: 'Industrial centrifugal exhaust air blower connected to an elevated discharge stack.',
  what: 'a ventilation system',
  footprint: [1.4, 1.0],
  height: 1.4,
  tags: ['industrial', 'hvac', 'ventilation', 'exhaust', 'blower'],
  refs: ['AF-IND-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete vibration pad
    g.box({ x: 0, y: 0, z: 0, w: 1.2, d: 0.8, h: 0.12, c: P.sand });

    // centrifugal fan scroll casing
    g.cyl({ x: -0.22, y: 0, z: 0.42, r: 0.32, h: 0.34, c: P.steel, axis: 'y', segments: 12 });

    // side-mounted fan drive motor
    g.cyl({ x: -0.22, y: 0.28, z: 0.42, r: 0.15, h: 0.22, c: P.steelDark, axis: 'y', segments: 8 });

    // rectangular exhaust duct riser
    g.box({ x: 0.28, y: 0, z: 0.12, w: 0.36, d: 0.36, h: 1.15, c: P.offWhite });

    // weather cowl cap on discharge duct
    g.roof({ x: 0.28, y: 0, z: 1.27, w: 0.48, d: 0.48, h: 0.16, c: P.steelDark, gable: P.steel });
  },
};
