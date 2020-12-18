import { connections } from '../utils.js';
import { endTop, endBottom, anchor } from '../characters.js';
import { rays } from './ends.js';

/*
 * SVG templates
 */
export const narrowAngles = {
  tl: `<path d="M  5 20, 5 10,  0 20"/>`,
  tr: `<path d="M  5 20, 5 10, 10 20"/>`,
  bl: `<path d="M  5  0, 5 10,  0  0"/>`,
  br: `<path d="M  5  0, 5 10, 10  0"/>`,
  lu: `<path d="M 10  0, 5 10, 10 10"/>`,
  ld: `<path d="M 10 20, 5 10, 10 10"/>`,
  ru: `<path d="M  0  0, 5 10,  0 10"/>`,
  rd: `<path d="M  0 20, 5 10,  0 10"/>`,
};

export const wideAngles = {
  tl: `<path d="M  5 20, 5 10,  0  0"/>`,
  tr: `<path d="M  5 20, 5 10, 10  0"/>`,
  bl: `<path d="M  5  0, 5 10,  0 20"/>`,
  br: `<path d="M  5  0, 5 10, 10 20"/>`,
  lu: `<path d="M  0  0, 5 10, 10 10"/>`,
  ld: `<path d="M  0 20, 5 10, 10 10"/>`,
  ru: `<path d="M 10  0, 5 10,  0 10"/>`,
  rd: `<path d="M 10 20, 5 10,  0 10"/>`,
};

export const narrowRoundedAngles = {
  tl: `<path d="M  5 20, Q 5 10,  0 20"/>`,
  tr: `<path d="M  5 20, Q 5 10, 10 20"/>`,
  bl: `<path d="M  5  0, Q 5 10,  0  0"/>`,
  br: `<path d="M  5  0, Q 5 10, 10  0"/>`,
  lu: `<path d="M 10  0, Q 5 10, 10 10"/>`,
  ld: `<path d="M 10 20, Q 5 10, 10 10"/>`,
  ru: `<path d="M  0  0, Q 5 10,  0 10"/>`,
  rd: `<path d="M  0 20, Q 5 10,  0 10"/>`,
};

export const wideRoundedAngles = {
  lu: `<path d="M  0  0, Q 5 10, 10 10"/>`,
  ld: `<path d="M  0 20, Q 5 10, 10 10"/>`,
  ru: `<path d="M 10  0, Q 5 10,  0 10"/>`,
  rd: `<path d="M 10 20, Q 5 10,  0 10"/>`,
};

/*
 * Character patterns
 */
export default [
  /*
   * Narrow angles
   */

  /* Top-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ b: true, bl: true }),
    svg: narrowAngles.tl,
    rules: rays,
  },

  /* Top-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ b: true, br: true }),
    svg: narrowAngles.tr,
    rules: rays,
  },

  /* Bottom-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, tl: true }),
    svg: narrowAngles.bl,
    rules: rays,
  },

  /* Bottom-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, tr: true }),
    svg: narrowAngles.br,
    rules: rays,
  },

  /* Left-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ r: true, tr: true }),
    svg: narrowAngles.lu,
    rules: rays,
  },

  /* Left-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ r: true, br: true }),
    svg: narrowAngles.ld,
    rules: rays,
  },

  /* Right-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ l: true, tl: true }),
    svg: narrowAngles.ru,
    rules: rays,
  },

  /* Right-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ l: true, bl: true }),
    svg: narrowAngles.rd,
    rules: rays,
  },

  /*
   * Wide angles
   */

  /* Top-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ b: true, tl: true }),
    svg: wideAngles.tl,
    rules: rays,
  },

  /* Top-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ b: true, tr: true }),
    svg: wideAngles.tr,
    rules: rays,
  },

  /* Bottom-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, bl: true }),
    svg: wideAngles.bl,
    rules: rays,
  },

  /* Bottom-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, br: true }),
    svg: wideAngles.br,
    rules: rays,
  },

  /* Left-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ r: true, tl: true }),
    svg: wideAngles.lu,
    rules: rays,
  },

  /* Left-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ r: true, bl: true }),
    svg: wideAngles.ld,
    rules: rays,
  },

  /* Right-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ l: true, tr: true }),
    svg: wideAngles.ru,
    rules: rays,
  },

  /* Right-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ l: true, br: true }),
    svg: wideAngles.rd,
    rules: rays,
  },

  /*
   * Narrow rounded angles
   */

  /* Top-left */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ b: true, bl: true }),
    svg: narrowRoundedAngles.tl,
  },

  /* Top-right */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ b: true, br: true }),
    svg: narrowRoundedAngles.tr,
  },

  /* Bottom-left */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ t: true, tl: true }),
    svg: narrowRoundedAngles.bl,
  },

  /* Bottom-right */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ t: true, tr: true }),
    svg: narrowRoundedAngles.br,
  },

  /* Left-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ r: true, tr: true }),
    svg: narrowRoundedAngles.lu,
  },

  /* Left-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ r: true, br: true }),
    svg: narrowRoundedAngles.ld,
  },

  /* Right-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ l: true, tl: true }),
    svg: narrowRoundedAngles.ru,
  },

  /* Right-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ l: true, bl: true }),
    svg: narrowRoundedAngles.rd,
  },

  /*
   * Wide rounded angles
   */

  /* Left-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ r: true, tl: true }),
    svg: wideRoundedAngles.lu,
  },

  /* Left-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ r: true, bl: true }),
    svg: wideRoundedAngles.ld,
  },

  /* Right-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ l: true, tr: true }),
    svg: wideRoundedAngles.ru,
  },

  /* Right-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ l: true, br: true }),
    svg: wideRoundedAngles.rd,
  },
];
