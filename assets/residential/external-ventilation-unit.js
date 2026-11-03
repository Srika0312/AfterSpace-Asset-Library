import { P } from '../lib/palette.js';

export default {
  key: 'external-ventilation-unit',
  name: 'External Ventilation Unit',
  category: 'residential',
  blurb: 'Wall-mounted habitat climate handler with dual rotary fan cowls and sloped exhaust hood.',
  what: 'an external ventilation unit',
  footprint: [1.4, 1.1],
  height: 1.25,
  tags: ['residential', 'ventilation', 'hvac', 'climate', 'fan'],
  refs: ['AF-RES-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // vibration damper base plate
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 1.0, h: 0.18, c: P.steelDark });

    // main air handler enclosure
    g.box({ x: 0, y: 0, z: 0.18, w: 1.1, d: 0.85, h: 0.75, c: P.offWhite });

    // rotary ventilation fan cowl 1
    g.cyl({ x: -0.28, y: 0.44, z: 0.55, r: 0.22, h: 0.12, axis: 'y', c: P.teal, segments: 12 });

    // rotary ventilation fan cowl 2
    g.cyl({ x: 0.28, y: 0.44, z: 0.55, r: 0.22, h: 0.12, axis: 'y', c: P.teal, segments: 12 });

    // top exhaust hood cowl
    g.roof({ x: 0, y: 0, z: 0.93, w: 0.95, d: 0.7, h: 0.24, c: P.steel, gable: P.steelDark, ridge: 'x' });
  },
};
