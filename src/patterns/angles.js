import { path } from '../shapes.js';
import { connections, noDirection } from '../utils.js';
import { endTop, endBottom, anchor } from '../characters.js';

/*
 * Shapes
 */

// prettier-ignore
const narrowAngles = {
  tl: path([ 5, 20], 'l  0 -10, -5  10'),
  tr: path([ 5, 20], 'l  0 -10,  5  10'),
  bl: path([ 5,  0], 'l  0  10, -5 -10'),
  br: path([ 5,  0], 'l  0  10,  5 -10'),
  lu: path([10,  0], 'l -5  10,  5   0'),
  ld: path([10, 20], 'l -5 -10,  5   0'),
  ru: path([ 0,  0], 'l  5  10, -5   0'),
  rd: path([ 0, 20], 'l  5 -10, -5   0'),
};

// prettier-ignore
const wideAngles = {
  tl: path([ 5, 20], 'l  0 -10, -5 -10'),
  tr: path([ 5, 20], 'l  0 -10,  5 -10'),
  bl: path([ 5,  0], 'l  0  10, -5  10'),
  br: path([ 5,  0], 'l  0  10,  5  10'),
  lu: path([ 0,  0], 'l  5  10,  5  0'),
  ld: path([ 0, 20], 'l  5 -10,  5  0'),
  ru: path([10,  0], 'l -5  10, -5  0'),
  rd: path([10, 20], 'l -5 -10, -5  0'),
};

// prettier-ignore
const narrowRoundedAngles = {
  tl: path([ 5, 20], 'q  0 -10, -5   0'),
  tr: path([ 5, 20], 'q  0 -10,  5   0'),
  bl: path([ 5,  0], 'q  0  10, -5   0'),
  br: path([ 5,  0], 'q  0  10,  5   0'),
  lu: path([10,  0], 'q -5  10,  0  10'),
  ld: path([10, 20], 'q -5 -10,  0 -10'),
  ru: path([ 0,  0], 'q  5  10,  0  10'),
  rd: path([ 0, 20], 'q  5 -10,  0 -10'),
};

// prettier-ignore
const wideRoundedAngles = {
  lu: path([ 0,  0], 'q  5  10,  10  10'),
  ld: path([ 0, 20], 'q  5 -10,  10 -10'),
  ru: path([10,  0], 'q -5  10, -10  10'),
  rd: path([10, 20], 'q -5 -10, -10 -10'),
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
    shapes: [narrowAngles.tl],
  },

  /* Top-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, b: true, br: true }),
    shapes: [narrowAngles.tr],
  },

  /* Bottom-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, t: true, tl: true }),
    shapes: [narrowAngles.bl],
  },

  /* Bottom-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, t: true, tr: true }),
    shapes: [narrowAngles.br],
  },

  /* Left-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, r: true, tr: true }),
    shapes: [narrowAngles.lu],
  },

  /* Left-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, r: true, br: true }),
    shapes: [narrowAngles.ld],
  },

  /* Right-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, l: true, tl: true }),
    shapes: [narrowAngles.ru],
  },

  /* Right-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, l: true, bl: true }),
    shapes: [narrowAngles.rd],
  },

  /*
   * Wide angles
   */

  /* Top-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, b: true, tl: true }),
    shapes: [wideAngles.tl],
  },

  /* Top-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, b: true, tr: true }),
    shapes: [wideAngles.tr],
  },

  /* Bottom-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, t: true, bl: true }),
    shapes: [wideAngles.bl],
  },

  /* Bottom-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, t: true, br: true }),
    shapes: [wideAngles.br],
  },

  /* Left-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, r: true, tl: true }),
    shapes: [wideAngles.lu],
  },

  /* Left-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, r: true, bl: true }),
    shapes: [wideAngles.ld],
  },

  /* Right-upward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, l: true, tr: true }),
    shapes: [wideAngles.ru],
  },

  /* Right-downward */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, l: true, br: true }),
    shapes: [wideAngles.rd],
  },

  /*
   * Narrow rounded angles
   */

  /* Top-left */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, b: true, bl: true }),
    shapes: [narrowRoundedAngles.tl],
  },

  /* Top-right */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, b: true, br: true }),
    shapes: [narrowRoundedAngles.tr],
  },

  /* Bottom-left */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, t: true, tl: true }),
    shapes: [narrowRoundedAngles.bl],
  },

  /* Bottom-right */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, t: true, tr: true }),
    shapes: [narrowRoundedAngles.br],
  },

  /* Left-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, r: true, tr: true }),
    shapes: [narrowRoundedAngles.lu],
  },

  /* Left-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, r: true, br: true }),
    shapes: [narrowRoundedAngles.ld],
  },

  /* Right-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, l: true, tl: true }),
    shapes: [narrowRoundedAngles.ru],
  },

  /* Right-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, l: true, bl: true }),
    shapes: [narrowRoundedAngles.rd],
  },

  /*
   * Wide rounded angles
   */

  /* Left-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, r: true, tl: true }),
    shapes: [wideRoundedAngles.lu],
  },

  /* Left-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, r: true, bl: true }),
    shapes: [wideRoundedAngles.ld],
  },

  /* Right-upward */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ ...noDirection, l: true, tr: true }),
    shapes: [wideRoundedAngles.ru],
  },

  /* Right-downward */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ ...noDirection, l: true, br: true }),
    shapes: [wideRoundedAngles.rd],
  },
];
