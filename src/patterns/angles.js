import { connections, noDirection } from '../utils.js';
import { endTop, endBottom, anchor } from '../characters.js';

/*
 * SVG templates
 */
export const narrowAngles = {
  tl: `<path d="M  5 20, l  0 -10, -5  10"/>`,
  tr: `<path d="M  5 20, l  0 -10,  5  10"/>`,
  bl: `<path d="M  5  0, l  0  10, -5 -10"/>`,
  br: `<path d="M  5  0, l  0  10,  5 -10"/>`,
  lu: `<path d="M 10  0, l -5  10,  5   0"/>`,
  ld: `<path d="M 10 20, l -5 -10,  5   0"/>`,
  ru: `<path d="M  0  0, l  5  10, -5   0"/>`,
  rd: `<path d="M  0 20, l  5 -10, -5   0"/>`,
};

export const wideAngles = {
  tl: `<path d="M  5 20, l  0 -10, -5 -10"/>`,
  tr: `<path d="M  5 20, l  0 -10,  5 -10"/>`,
  bl: `<path d="M  5  0, l  0  10, -5  10"/>`,
  br: `<path d="M  5  0, l  0  10,  5  10"/>`,
  lu: `<path d="M  0  0, l  5  10,  5  0"/>`,
  ld: `<path d="M  0 20, l  5 -10,  5  0"/>`,
  ru: `<path d="M 10  0, l -5  10, -5  0"/>`,
  rd: `<path d="M 10 20, l -5 -10, -5  0"/>`,
};

export const narrowRoundedAngles = {
  tl: `<path d="M  5 20, q  0 -10, -5   0"/>`,
  tr: `<path d="M  5 20, q  0 -10,  5   0"/>`,
  bl: `<path d="M  5  0, q  0  10, -5   0"/>`,
  br: `<path d="M  5  0, q  0  10,  5   0"/>`,
  lu: `<path d="M 10  0, q -5  10,  0  10"/>`,
  ld: `<path d="M 10 20, q -5 -10,  0 -10"/>`,
  ru: `<path d="M  0  0, q  5  10,  0  10"/>`,
  rd: `<path d="M  0 20, q  5 -10,  0 -10"/>`,
};

export const wideRoundedAngles = {
  lu: `<path d="M  0  0, q  5  10,  10  10"/>`,
  ld: `<path d="M  0 20, q  5 -10,  10 -10"/>`,
  ru: `<path d="M 10  0, q -5  10, -10  10"/>`,
  rd: `<path d="M 10 20, q -5 -10, -10 -10"/>`,
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
    pattern: connections({ ...noDirection, b: true, bl: true }),
    svg: narrowAngles.tl,
  },

  /* Top-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, b: true, br: true }),
    svg: narrowAngles.tr,
  },

  /* Bottom-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, t: true, tl: true }),
    svg: narrowAngles.bl,
  },

  /* Bottom-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, t: true, tr: true }),
    svg: narrowAngles.br,
  },

  /* Left-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, r: true, tr: true }),
    svg: narrowAngles.lu,
  },

  /* Left-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, r: true, br: true }),
    svg: narrowAngles.ld,
  },

  /* Right-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, l: true, tl: true }),
    svg: narrowAngles.ru,
  },

  /* Right-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, l: true, bl: true }),
    svg: narrowAngles.rd,
  },

  /*
   * Wide angles
   */

  /* Top-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, b: true, tl: true }),
    svg: wideAngles.tl,
  },

  /* Top-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, b: true, tr: true }),
    svg: wideAngles.tr,
  },

  /* Bottom-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, t: true, bl: true }),
    svg: wideAngles.bl,
  },

  /* Bottom-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, t: true, br: true }),
    svg: wideAngles.br,
  },

  /* Left-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, r: true, tl: true }),
    svg: wideAngles.lu,
  },

  /* Left-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, r: true, bl: true }),
    svg: wideAngles.ld,
  },

  /* Right-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, l: true, tr: true }),
    svg: wideAngles.ru,
  },

  /* Right-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, l: true, br: true }),
    svg: wideAngles.rd,
  },

  /*
   * Narrow rounded angles
   */

  /* Top-left */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, b: true, bl: true }),
    svg: narrowRoundedAngles.tl,
  },

  /* Top-right */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, b: true, br: true }),
    svg: narrowRoundedAngles.tr,
  },

  /* Bottom-left */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, t: true, tl: true }),
    svg: narrowRoundedAngles.bl,
  },

  /* Bottom-right */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, t: true, tr: true }),
    svg: narrowRoundedAngles.br,
  },

  /* Left-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, r: true, tr: true }),
    svg: narrowRoundedAngles.lu,
  },

  /* Left-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, r: true, br: true }),
    svg: narrowRoundedAngles.ld,
  },

  /* Right-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, l: true, tl: true }),
    svg: narrowRoundedAngles.ru,
  },

  /* Right-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, l: true, bl: true }),
    svg: narrowRoundedAngles.rd,
  },

  /*
   * Wide rounded angles
   */

  /* Left-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, r: true, tl: true }),
    svg: wideRoundedAngles.lu,
  },

  /* Left-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, r: true, bl: true }),
    svg: wideRoundedAngles.ld,
  },

  /* Right-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, l: true, tr: true }),
    svg: wideRoundedAngles.ru,
  },

  /* Right-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, l: true, br: true }),
    svg: wideRoundedAngles.rd,
  },
];
