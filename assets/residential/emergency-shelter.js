import { P } from '../lib/palette.js';

export default {
  key: 'emergency-shelter',
  name: 'Emergency Shelter',
  category: 'residential',
  blurb: 'Hardened rapid-deployment survival bunker with high-visibility thermal hull and distress beacon.',
  what: 'an emergency shelter',
  footprint: [1.6, 1.6],
  height: 1.4,
  tags: ['residential', 'shelter', 'emergency', 'bunker', 'survival'],
  refs: ['AF-RES-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // hardened ballast foundation pad
    g.box({ x: 0, y: 0, z: 0, w: 1.5, d: 1.5, h: 0.2, c: P.steelDark });

    // reinforced survival cabin bunker
    g.box({ x: 0, y: 0, z: 0.2, w: 1.3, d: 1.3, h: 0.8, c: P.red });

    // sloped impact-deflector roof
    g.roof({ x: 0, y: 0, z: 1.0, w: 1.35, d: 1.35, h: 0.35, c: P.steelDark, gable: P.red, ridge: 'x' });

    // heavy hermetic emergency hatch door
    g.box({ x: 0, y: 0.66, z: 0.25, w: 0.55, d: 0.08, h: 0.65, c: P.offWhite });

    // emergency locator distress beacon
    g.circle({ x: 0, y: 0, z: 1.36, r: 0.09, c: P.amber, bias: 0.55 });
  },
};
