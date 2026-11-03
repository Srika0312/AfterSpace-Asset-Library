import { P } from '../lib/palette.js';

export default {
  key: 'cargo-transport-robot',
  name: 'Cargo Transport Robot',
  category: 'inhabitants',
  blurb: 'Automated warehouse flatbed carrier robot with forward sensor head and cargo payload container.',
  what: 'a cargo transport robot',
  footprint: [1.1, 0.9],
  height: 0.95,
  tags: ['inhabitants', 'robot', 'cargo', 'transport', 'logistics'],
  refs: ['AF-INH-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy 4-wheel drive skid chassis
    g.box({ x: 0, y: 0, z: 0, w: 0.9, d: 0.7, h: 0.24, c: P.steelDark });

    // flatbed payload cargo platform
    g.box({ x: 0, y: 0, z: 0.24, w: 0.8, d: 0.65, h: 0.12, c: P.steel });

    // forward autonomous control head
    g.box({ x: 0.3, y: 0, z: 0.36, w: 0.22, d: 0.5, h: 0.35, c: P.offWhite });

    // secured container payload crate
    g.box({ x: -0.15, y: 0, z: 0.36, w: 0.48, d: 0.55, h: 0.45, c: P.steelDark });

    // top hazard navigation beacon
    g.circle({ x: 0.3, y: 0, z: 0.73, r: 0.06, c: P.amber, bias: 0.55 });
  },
};
