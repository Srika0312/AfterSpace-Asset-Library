import { P } from '../lib/palette.js';

export default {
  key: 'cooling-unit',
  name: 'Cooling Unit',
  category: 'industrial',
  blurb: 'Roof or yard packaged air-cooled chiller with twin vertical discharge fan cowls.',
  what: 'a cooling unit',
  footprint: [1.5, 1.1],
  height: 1.2,
  tags: ['industrial', 'chiller', 'hvac', 'cooling', 'ventilation'],
  refs: ['AF-IND-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // chiller cabinet enclosure
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 0.85, h: 0.85, c: P.offWhite });

    // louvered condenser coil side intake
    g.box({ x: 0, y: 0.44, z: 0.12, w: 1.1, d: 0.04, h: 0.6, c: P.slate });

    // exhaust fan cowl 1
    g.cyl({ x: -0.32, y: 0, z: 0.85, r: 0.25, h: 0.18, c: P.steelDark, segments: 10 });

    // exhaust fan cowl 2
    g.cyl({ x: 0.32, y: 0, z: 0.85, r: 0.25, h: 0.18, c: P.steelDark, segments: 10 });

    // chilled water header pipe
    g.box({ x: 0, y: -0.44, z: 0.25, w: 0.9, d: 0.04, h: 0.08, c: P.cyan });
  },
};
