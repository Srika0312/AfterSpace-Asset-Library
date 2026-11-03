import { P } from '../lib/palette.js';

export default {
  key: 'emergency-power-generator',
  name: 'Emergency Power Generator',
  category: 'energy',
  blurb: 'Rapid-response standby power generator with sound-attenuated housing and elevated exhaust.',
  what: 'an emergency power generator',
  footprint: [2.0, 1.2],
  height: 1.5,
  tags: ['energy', 'generator', 'backup', 'emergency', 'power'],
  refs: ['AF-ENG-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // structural channel base skid
    g.box({ x: 0, y: 0, z: 0, w: 1.8, d: 0.95, h: 0.15, c: P.steelDark });

    // soundproof generator enclosure canopy
    g.box({ x: -0.15, y: 0, z: 0.15, w: 1.35, d: 0.85, h: 0.75, c: P.amber });

    // radiator cooling core and intake grille
    g.box({ x: 0.62, y: 0, z: 0.18, w: 0.25, d: 0.75, h: 0.68, c: P.steelDark });

    // vertical high-temp exhaust muffler stack
    g.cyl({ x: -0.5, y: 0, z: 0.9, r: 0.09, h: 0.55, c: P.steel, segments: 8 });

    // automatic transfer switch status beacon
    g.circle({ x: 0.45, y: 0.44, z: 0.82, r: 0.08, c: P.red, bias: 0.55 });
  },
};
