import { P } from '../lib/palette.js';

export default {
  key: 'cargo-rover',
  name: 'Cargo Rover',
  category: 'transport',
  blurb: 'Rugged all-terrain six-wheeled freight rover with enclosed operator cab and rear cargo deck.',
  what: 'a cargo rover',
  footprint: [2.0, 1.3],
  height: 1.2,
  tags: ['transport', 'rover', 'cargo', 'freight', 'vehicle'],
  refs: ['AF-TRN-001'],
  hero: 0,
  status: 'review',
  draw(g) {
    // wheel bogies and heavy undercarriage
    g.box({ x: 0, y: 0, z: 0.1, w: 1.8, d: 1.1, h: 0.25, c: P.steelDark });

    // forward operator / crew cab
    g.box({ x: 0.5, y: 0, z: 0.35, w: 0.7, d: 0.9, h: 0.65, c: P.offWhite });

    // forward windshield visor strip
    g.box({ x: 0.72, y: 0, z: 0.6, w: 0.28, d: 0.78, h: 0.25, c: P.steel });

    // rear secured freight crate payload
    g.box({ x: -0.38, y: 0, z: 0.35, w: 0.9, d: 0.82, h: 0.55, c: P.steelDark });

    // roof safety beacon puck
    g.circle({ x: 0.5, y: 0, z: 1.01, r: 0.08, c: P.amber, bias: 0.55 });
  },
};
