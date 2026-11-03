import { P } from '../lib/palette.js';

export default {
  key: 'passenger-rover',
  name: 'Passenger Rover',
  category: 'transport',
  blurb: 'Pressurized personnel surface transport with panoramic observation glazing and environmental control.',
  what: 'a passenger rover',
  footprint: [2.2, 1.3],
  height: 1.25,
  tags: ['transport', 'rover', 'passenger', 'personnel', 'vehicle'],
  refs: ['AF-TRN-002'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy wheeled mobility chassis
    g.box({ x: 0, y: 0, z: 0.1, w: 2.0, d: 1.1, h: 0.25, c: P.steelDark });

    // pressurized passenger coach cabin
    g.box({ x: 0, y: 0, z: 0.35, w: 1.9, d: 0.92, h: 0.6, c: P.offWhite });

    // panoramic viewport strip
    g.box({ x: 0.1, y: 0, z: 0.55, w: 1.6, d: 0.94, h: 0.22, c: P.teal });

    // sloped aerodynamic nose cowl
    g.roof({ x: 0.92, y: 0, z: 0.35, w: 0.25, d: 0.92, h: 0.45, c: P.offWhite, gable: P.steelDark, ridge: 'y' });

    // roof life-support / AC conditioning unit
    g.box({ x: -0.3, y: 0, z: 0.95, w: 0.7, d: 0.5, h: 0.18, c: P.steel });
  },
};
