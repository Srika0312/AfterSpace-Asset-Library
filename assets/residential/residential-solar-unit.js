import { P } from '../lib/palette.js';

export default {
  key: 'residential-solar-unit',
  name: 'Residential Solar Unit',
  category: 'residential',
  blurb: 'Roof-mounted photovoltaic panel unit with micro-inverter and grid status indicator beacon.',
  what: 'a residential solar unit',
  footprint: [1.6, 1.2],
  height: 1.0,
  tags: ['residential', 'solar', 'photovoltaic', 'power', 'roof'],
  refs: ['AF-RES-013'],
  hero: 0,
  status: 'review',
  draw(g) {
    // roof mounting frame
    g.box({ x: 0, y: 0, z: 0, w: 1.45, d: 1.05, h: 0.16, c: P.steelDark });

    // angled PV collector roof surface
    g.roof({ x: 0, y: 0, z: 0.16, w: 1.35, d: 0.95, h: 0.45, c: P.teal, gable: P.steelDark, ridge: 'x' });

    // lower tier solar facet
    g.box({ x: 0, y: 0.22, z: 0.25, w: 1.25, d: 0.38, h: 0.12, c: P.offWhite });

    // micro-inverter power conversion pod
    g.box({ x: 0.55, y: -0.35, z: 0.16, w: 0.28, d: 0.24, h: 0.35, c: P.offWhite });

    // grid sync status beacon
    g.circle({ x: 0.55, y: -0.22, z: 0.48, r: 0.06, c: P.amber, bias: 0.55 });
  },
};
