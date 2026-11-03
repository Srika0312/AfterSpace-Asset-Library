import { P } from '../lib/palette.js';

export default {
  key: 'emergency-station',
  name: 'Emergency Station',
  category: 'environmental',
  blurb: 'High-visibility life-safety kiosk with emergency intercom callbox, AED defibrillator locker, and distress strobe.',
  what: 'an emergency station',
  footprint: [1.2, 0.9],
  height: 1.85,
  tags: ['environmental', 'emergency', 'station', 'aed', 'safety'],
  refs: ['AF-PRP-015'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base anchor foundation
    g.box({ x: 0, y: 0, z: 0, w: 1.0, d: 0.75, h: 0.18, c: P.steelDark });

    // emergency totem monolith pillar
    g.box({ x: 0, y: 0, z: 0.18, w: 0.65, d: 0.45, h: 1.35, c: P.offWhite });

    // first-aid / AED recessed locker
    g.box({ x: 0, y: 0.22, z: 0.65, w: 0.45, d: 0.08, h: 0.45, c: P.red });

    // top overhead beacon cap
    g.roof({ x: 0, y: 0, z: 1.53, w: 0.7, d: 0.5, h: 0.18, c: P.steelDark, gable: P.offWhite, ridge: 'x' });

    // high-intensity distress strobe beacon
    g.circle({ x: 0, y: 0, z: 1.73, r: 0.09, c: P.amber, bias: 0.55 });
  },
};
