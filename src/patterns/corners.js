import {
  connections,
  include,
  except,
  straightDirections,
  diagonalDirections,
} from '../utils.js';
import { segment, wide } from '../shapes.js';
import {
  endTop,
  endBottom,
  anchor,
  linkLeft,
  linkRight,
  linkTopLeft,
  linkTopRight,
  linkBottomLeft,
  linkBottomRight,
  bline,
} from '../characters.js';
import { rays } from './rays.js';

/*
 * Shapes
 */

// prettier-ignore
const corners = {
  tl: segment({from: [ 5, 20], to: [10, 10], forward: 'l  0 -10', backward: 'l -5   0'}),
  tr: segment({from: [ 5, 20], to: [ 0, 10], forward: 'l  0 -10', backward: 'l  5   0'}),
  bl: segment({from: [ 5,  0], to: [10, 10], forward: 'l  0  10', backward: 'l -5   0'}),
  br: segment({from: [ 5,  0], to: [ 0, 10], forward: 'l  0  10', backward: 'l  5   0'}),
  t:  segment({from: [ 0, 20], to: [10, 20], forward: 'l  5 -10', backward: 'l -5 -10'}),
  b:  segment({from: [ 0,  0], to: [10,  0], forward: 'l  5  10', backward: 'l -5  10'}),
  r:  segment({from: [ 0,  0], to: [ 0, 20], forward: 'l  5  10', backward: 'l  5 -10'}),
  l:  segment({from: [10,  0], to: [10, 20], forward: 'l -5  10', backward: 'l -5 -10'}),
};

// prettier-ignore
const wideCorners = {
  tl: segment({from: [ 5, 20], to: [10, 10], forward: 'l  0 -10', backward: 'l  -5  0'}, wide),
  tr: segment({from: [ 5, 20], to: [ 0, 10], forward: 'l  0 -10', backward: 'l   5  0'}, wide),
  bl: segment({from: [ 5,  0], to: [10, 10], forward: 'l  0  10', backward: 'l  -5  0'}, wide),
  br: segment({from: [ 5,  0], to: [ 0, 10], forward: 'l  0  10', backward: 'l   5  0'}, wide),
};

// prettier-ignore
export const roundedCorners = {
  tl: segment({from: [ 5, 20], to: [10, 10], forward: 'l 0 -5, q 0 -5,  5 -5', backward: 'q -5 0, -5  5, l 0  5'}),
  tr: segment({from: [ 5, 20], to: [ 0, 10], forward: 'l 0 -5, q 0 -5, -5 -5', backward: 'q  5 0,  5  5, l 0  5'}),
  bl: segment({from: [ 5,  0], to: [10, 10], forward: 'l 0  5, q 0  5,  5  5', backward: 'q -5 0, -5 -5, l 0 -5'}),
  br: segment({from: [ 5,  0], to: [ 0, 10], forward: 'l 0  5, q 0  5, -5  5', backward: 'q  5 0,  5 -5, l 0 -5'}),
  t:  segment({from: [ 0, 20], to: [10, 20], forward: 'q  5 -10, 10  0', backward: 'q -5 -10, -10   0'}),
  b:  segment({from: [ 0,  0], to: [10,  0], forward: 'q  5  10, 10  0', backward: 'q -5  10, -10   0'}),
  r:  segment({from: [ 0,  0], to: [ 0, 20], forward: 'q  5  10,  0 20', backward: 'q  5 -10,   0 -20'}),
  l:  segment({from: [10,  0], to: [10, 20], forward: 'q -5  10,  0 20', backward: 'q -5 -10,   0 -20'}),
};

/*
 * Character patterns
 */
export default [
  /*
   * Square corners
   */

  /* Top-left */
  {
    hotspot: '┌',
    shapes: [corners.tl],
  },
  {
    hotspot: '┏',
    shapes: [wideCorners.tl],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: true, b: true, l: false }),
    shapes: [corners.tl],
    rules: rays(diagonalDirections),
  },

  /* Top */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: false, tr: false, br: true, bl: true }),
    shapes: [corners.t],
    rules: rays(straightDirections),
  },

  /* Top-right */
  {
    hotspot: '┐',
    shapes: [corners.tr],
  },
  {
    hotspot: '┓',
    shapes: [wideCorners.tr],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: false, b: true, l: true }),
    shapes: [corners.tr],
    rules: rays(diagonalDirections),
  },

  /* Right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tr: false, br: false, tl: true, bl: true }),
    shapes: [corners.r],
    rules: rays(straightDirections),
  },

  /* Bottom-right */
  {
    hotspot: '┘',
    shapes: [corners.br],
  },
  {
    hotspot: '┛',
    shapes: [wideCorners.br],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: false, b: false, l: true }),
    shapes: [corners.br],
    rules: rays(diagonalDirections),
  },

  /* Bottom */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: true, tr: true, br: false, bl: false }),
    shapes: [corners.b],
    rules: rays(straightDirections),
  },

  /* Bottom-left */
  {
    hotspot: '└',
    shapes: [corners.bl],
  },
  {
    hotspot: '┗',
    shapes: [wideCorners.bl],
  },
  {
    hotspot: '└',
    shapes: [corners.bl],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: true, b: false, l: false }),
    shapes: [corners.bl],
    rules: rays(diagonalDirections),
  },

  /* Left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tr: true, br: true, tl: false, bl: false }),
    shapes: [corners.l],
    rules: rays(straightDirections),
  },

  /*
   * Rounded corners
   */

  /* Top-left */
  {
    hotspot: '╭',
    shapes: [roundedCorners.tl],
  },
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({
      r: except(endTop) + include(linkRight),
      l: false,
    }),
    shapes: [roundedCorners.tl],
  },

  /* Top */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ br: true, bl: true }),
    shapes: [roundedCorners.t],
  },

  /* Top-right */
  {
    hotspot: '╮',
    shapes: [roundedCorners.tr],
  },
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({
      r: false,
      l: except(endTop) + include(linkLeft),
    }),
    shapes: [roundedCorners.tr],
  },

  /* Right */
  {
    hotspot: ')',
    size: 1,
    pattern: connections(
      { tl: include(linkTopLeft + anchor + endTop + bline) },
      { bl: include(linkBottomLeft + anchor + endBottom) },
      { l: include(bline) }
    ),
    shapes: [roundedCorners.r],
  },

  /* Bottom-right */
  {
    hotspot: '╯',
    shapes: [roundedCorners.br],
  },
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({
      r: false,
      l: except(endBottom) + include(linkLeft),
    }),
    shapes: [roundedCorners.br],
  },

  /* Bottom */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ tl: true, tr: true }),
    shapes: [roundedCorners.b],
  },

  /* Bottom-left */
  {
    hotspot: '╰',
    shapes: [roundedCorners.bl],
  },
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({
      r: except(endBottom) + include(linkRight),
      l: false,
    }),
    shapes: [roundedCorners.bl],
  },

  /* Left */
  {
    hotspot: '(',
    size: 1,
    pattern: connections(
      { tr: include(linkTopRight + anchor + endTop + bline) },
      { br: include(linkBottomRight + anchor + endBottom) },
      { r: include(bline) }
    ),
    shapes: [roundedCorners.l],
  },
];
