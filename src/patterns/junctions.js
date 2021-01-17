import {
  connections,
  include,
  except,
  straightDirections,
  diagonalDirections,
} from '../utils.js';
import { segment, wide } from '../shapes.js';
import {
  anchor,
  endTop,
  endBottom,
  linkLeft,
  linkRight,
  hsplit,
} from '../characters.js';
import { rays } from './rays.js';
import { roundedCorners } from './corners.js';

/*
 * Shapes
 */

// prettier-ignore
const junctions = {
  '┼': [segment({from: [ 5,  0], to: [ 5, 20]}), segment({from: [0, 10], to: [10, 10]})],
  '╳': [segment({from: [ 0,  0], to: [10, 20]}), segment({from: [0, 20], to: [10,  0]})],
  '┬': [segment({from: [ 5, 20], to: [ 5, 10]}), segment({from: [0, 10], to: [10, 10]})],
  '┴': [segment({from: [ 5,  0], to: [ 5, 10]}), segment({from: [0, 10], to: [10, 10]})],
  '┤': [segment({from: [ 0, 10], to: [ 5, 10]}), segment({from: [5,  0], to: [ 5, 20]})],
  '├': [segment({from: [10, 10], to: [ 5, 10]}), segment({from: [5,  0], to: [ 5, 20]})],
  '▟': [segment({from: [ 5, 10], to: [10, 20]}), segment({from: [0, 20], to: [10,  0]})],
  '▙': [segment({from: [ 0,  0], to: [10, 20]}), segment({from: [0, 20], to: [ 5, 10]})],
  '▜': [segment({from: [ 0,  0], to: [10, 20]}), segment({from: [5, 10], to: [10,  0]})],
  '▛': [segment({from: [ 0,  0], to: [ 5, 10]}), segment({from: [0, 20], to: [10,  0]})],
};

// prettier-ignore
const wideJunctions = {
  '┼': [segment({from: [ 5,  0], to: [ 5, 20]}, wide), segment({from: [0, 10], to: [10, 10]}, wide)],
  '┬': [segment({from: [ 5, 20], to: [ 5, 10]}, wide), segment({from: [0, 10], to: [10, 10]}, wide)],
  '┴': [segment({from: [ 5,  0], to: [ 5, 10]}, wide), segment({from: [0, 10], to: [10, 10]}, wide)],
  '┤': [segment({from: [ 0, 10], to: [ 5, 10]}, wide), segment({from: [5,  0], to: [ 5, 20]}, wide)],
  '├': [segment({from: [10, 10], to: [ 5, 10]}, wide), segment({from: [5,  0], to: [ 5, 20]}, wide)],
};

/*
 * Character patterns
 */
export default [
  /*
   * 4-way connections
   */

  /* Straight */
  {
    hotspot: '╋',
    shapes: wideJunctions['┼'],
  },
  {
    hotspot: '┼',
    shapes: junctions['┼'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections(straightDirections),
    shapes: junctions['┼'],
    rules: rays(diagonalDirections),
  },

  /* Rounded */
  {
    hotspot: hsplit,
    size: 1,
    pattern: connections(straightDirections),
    shapes: [
      roundedCorners.tr,
      roundedCorners.tl,
      roundedCorners.br,
      roundedCorners.bl,
    ],
  },

  /* Diagonals */
  {
    hotspot: '╳',
    shapes: junctions['╳'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections(diagonalDirections),
    shapes: junctions['╳'],
    rules: rays(straightDirections),
  },

  /*
   * 3-way connections
   */

  /* Straight no bottom */
  {
    hotspot: '┻',
    shapes: wideJunctions['┴'],
  },
  {
    hotspot: '┴',
    shapes: junctions['┴'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...straightDirections, b: false }),
    shapes: junctions['┴'],
    rules: rays(diagonalDirections),
  },

  /* Straight no top */
  {
    hotspot: '┳',
    shapes: wideJunctions['┬'],
  },
  {
    hotspot: '┬',
    shapes: junctions['┬'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...straightDirections, t: false }),
    shapes: junctions['┬'],
    rules: rays(diagonalDirections),
  },

  /* Straight no right */
  {
    hotspot: '┫',
    shapes: wideJunctions['┤'],
  },
  {
    hotspot: '┤',
    shapes: junctions['┤'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...straightDirections, r: false }),
    shapes: junctions['┤'],
    rules: rays(diagonalDirections),
  },

  /* Straight no left */
  {
    hotspot: '┣',
    shapes: wideJunctions['├'],
  },
  {
    hotspot: '├',
    shapes: junctions['├'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...straightDirections, l: false }),
    shapes: junctions['├'],
    rules: rays(diagonalDirections),
  },

  /* Rounded no top */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({
      r: except(endTop) + include(linkRight),
      l: except(endTop) + include(linkLeft),
    }),
    shapes: [roundedCorners.tr, roundedCorners.tl],
  },

  /* Rounded no bottom */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({
      r: except(endBottom) + include(linkRight),
      l: except(endBottom) + include(linkLeft),
    }),
    shapes: [roundedCorners.br, roundedCorners.bl],
  },

  /* Rounded no left */
  {
    hotspot: hsplit,
    size: 1,
    pattern: connections({
      r: true,
      l: false,
      t: true,
      b: true,
    }),
    shapes: [roundedCorners.tl, roundedCorners.bl],
  },

  /* Rounded no right */
  {
    hotspot: hsplit,
    size: 1,
    pattern: connections({
      r: false,
      l: true,
      t: true,
      b: true,
    }),
    shapes: [roundedCorners.tr, roundedCorners.br],
  },

  /* Diagonals no top-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...diagonalDirections, tl: false }),
    shapes: junctions['▟'],
    rules: rays(straightDirections),
  },

  /* Diagonals no top-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...diagonalDirections, tr: false }),
    shapes: junctions['▙'],
    rules: rays(straightDirections),
  },

  /* Diagonals no bottom-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...diagonalDirections, bl: false }),
    shapes: junctions['▜'],
    rules: rays(straightDirections),
  },

  /* Diagonals no bottom-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...diagonalDirections, br: false }),
    shapes: junctions['▛'],
    rules: rays(straightDirections),
  },
];
