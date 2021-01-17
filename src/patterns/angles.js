import { segment } from '../shapes.js';
import { connections, noDirection } from '../utils.js';
import { endTop, endBottom, anchor } from '../characters.js';

/*
 * Shapes
 */

// prettier-ignore
const narrowAngles = {
  tl: segment({from: [ 5, 20], to: [ 0, 20], forward: 'l  0 -10', backward: 'l  5 -10'}),
  tr: segment({from: [ 5, 20], to: [10, 20], forward: 'l  0 -10', backward: 'l -5 -10'}),
  bl: segment({from: [ 5,  0], to: [ 0,  0], forward: 'l  0  10', backward: 'l  5  10'}),
  br: segment({from: [ 5,  0], to: [10,  0], forward: 'l  0  10', backward: 'l -5  10'}),
  lu: segment({from: [10,  0], to: [10, 10], forward: 'l -5  10', backward: 'l -5   0'}),
  ld: segment({from: [10, 20], to: [10, 10], forward: 'l -5 -10', backward: 'l -5   0'}),
  ru: segment({from: [ 0,  0], to: [ 0, 10], forward: 'l  5  10', backward: 'l  5   0'}),
  rd: segment({from: [ 0, 20], to: [ 0, 10], forward: 'l  5 -10', backward: 'l  5   0'}),
};

// prettier-ignore
const wideAngles = {
  tl: segment({from: [ 5, 20], to: [0 ,  0], forward: 'l  0 -10', backward: 'l  5  10'}),
  tr: segment({from: [ 5, 20], to: [10,  0], forward: 'l  0 -10', backward: 'l -5  10'}),
  bl: segment({from: [ 5,  0], to: [ 0, 20], forward: 'l  0  10', backward: 'l  5 -10'}),
  br: segment({from: [ 5,  0], to: [10, 20], forward: 'l  0  10', backward: 'l -5 -10'}),
  lu: segment({from: [ 0,  0], to: [10, 10], forward: 'l  5  10', backward: 'l -5   0'}),
  ld: segment({from: [ 0, 20], to: [10, 10], forward: 'l  5 -10', backward: 'l -5   0'}),
  ru: segment({from: [10,  0], to: [ 0, 10], forward: 'l -5  10', backward: 'l  5   0'}),
  rd: segment({from: [10, 20], to: [ 0, 10], forward: 'l -5 -10', backward: 'l  5   0'}),
};

// prettier-ignore
const narrowRoundedAngles = {
  tl: segment({from: [ 5, 20], to: [ 0, 20], forward: 'q  0 -10, -5   0', backward: 'q  5 -10,  5   0'}),
  tr: segment({from: [ 5, 20], to: [10, 20], forward: 'q  0 -10,  5   0', backward: 'q -5 -10, -5   0'}),
  bl: segment({from: [ 5,  0], to: [ 0,  0], forward: 'q  0  10, -5   0', backward: 'q  5  10,  5   0'}),
  br: segment({from: [ 5,  0], to: [10,  0], forward: 'q  0  10,  5   0', backward: 'q -5  10, -5   0'}),
  lu: segment({from: [10,  0], to: [10, 10], forward: 'q -5  10,  0  10', backward: 'q -5   0,  0 -10'}),
  ld: segment({from: [10, 20], to: [10, 10], forward: 'q -5 -10,  0 -10', backward: 'q -5   0,  0  10'}),
  ru: segment({from: [ 0,  0], to: [ 0, 10], forward: 'q  5  10,  0  10', backward: 'q  5   0,  0 -10'}),
  rd: segment({from: [ 0, 20], to: [ 0, 10], forward: 'q  5 -10,  0 -10', backward: 'q  5   0,  0  10'}),
};

// prettier-ignore
const wideRoundedAngles = {
  lu: segment({from: [ 0,  0], to: [10, 10], forward: 'q  5  10,  10  10', backward: 'q -5 0, -10 -10'}),
  ld: segment({from: [ 0, 20], to: [10, 10], forward: 'q  5 -10,  10 -10', backward: 'q -5 0, -10  10'}),
  ru: segment({from: [10,  0], to: [ 0, 10], forward: 'q -5  10, -10  10', backward: 'q  5 0,  10 -10'}),
  rd: segment({from: [10, 20], to: [ 0, 10], forward: 'q -5 -10, -10 -10', backward: 'q  5 0,  10  10'}),
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
