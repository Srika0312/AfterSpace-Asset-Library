import { P } from '../lib/palette.js';

export default {
  key: 'industrial-generator',
  name: 'Industrial Generator',
  category: 'industrial',
  blurb: 'Enclosed emergency standby diesel generator set with integrated fuel sub-base.',
  what: 'an industrial generator',
  footprint: [1.7, 1.0],
  height: 1.25,
  tags: ['industrial', 'generator', 'power', 'diesel', 'backup'],
  refs: ['AF-IND-013'],
  hero: 0,
  status: 'review',
  draw(g) {
    // sub-base fuel tank skid
    g.box({ x: 0, y: 0, z: 0, w: 1.5, d: 0.8, h: 0.18, c: P.steelDark });

    // acoustic enclosure canopy
    g.box({ x: -0.1, y: 0, z: 0.18, w: 1.25, d: 0.74, h: 0.72, c: P.wheat });

    // radiator airflow louver assembly
    g.box({ x: 0.58, y: 0, z: 0.22, w: 0.08, d: 0.64, h: 0.62, c: P.steelDark });

    // roof exhaust silencer and stack
    g.cyl({ x: -0.42, y: 0, z: 0.9, r: 0.06, h: 0.3, c: P.steel, axis: 'z', segments: 8 });

    // emergency stop / generator status beacon
    g.circle({ x: 0.4, y: 0.38, z: 0.82, r: 0.08, c: P.amber, bias: 0.55 });
  },
};
