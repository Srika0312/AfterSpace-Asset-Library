import { P } from '../lib/palette.js';

export default {
  key: 'automated-agricultural-robot',
  name: 'Automated Agricultural Robot',
  category: 'agriculture',
  blurb: 'Autonomous field robot with high-clearance wheel chassis, produce bin, pruning arm, and camera turret.',
  what: 'an automated agricultural robot',
  footprint: [1.5, 1.2],
  height: 1.25,
  tags: ['agriculture', 'robot', 'autonomous', 'harvest', 'farming'],
  refs: ['AF-AGR-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // high-clearance rover chassis and wheels
    g.box({ x: 0, y: 0, z: 0.1, w: 1.35, d: 1.05, h: 0.25, c: P.steelDark });

    // central harvest bin and power pack
    g.box({ x: -0.15, y: 0, z: 0.35, w: 0.75, d: 0.8, h: 0.55, c: P.offWhite });

    // fresh harvested produce cargo
    g.box({ x: -0.15, y: 0, z: 0.75, w: 0.65, d: 0.7, h: 0.2, c: P.canopy });

    // forward robotic pruning and picking boom
    g.cyl({ x: 0.45, y: 0, z: 0.45, r: 0.1, h: 0.55, axis: 'z', c: P.steel, segments: 8 });

    // crop canopy multispectral camera turret
    g.circle({ x: 0.45, y: 0, z: 1.05, r: 0.12, c: P.canopy, bias: 0.55 });
  },
};
