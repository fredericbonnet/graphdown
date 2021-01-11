import {
  connections,
  include,
  except,
  straightDirections,
  diagonalDirections,
} from '../utils.js';
import { wide } from '../svg.js';
import {
  anchor,
  endTop,
  endBottom,
  linkLeft,
  linkRight,
  hsplit,
} from '../characters.js';
import { rays } from './ends.js';
import { roundedCorners } from './corners.js';

/*
 * SVG templates
 */
const junctions = {
  '┼': `<path d="M  5  0,  5 20, M 0 10, 10 10"/>`,
  '╳': `<path d="M  0  0, 10 20, M 0 20, 10  0"/>`,
  '┬': `<path d="M  5 20,  5 10, M 0 10, 10 10"/>`,
  '┴': `<path d="M  5  0,  5 10, M 0 10, 10 10"/>`,
  '┤': `<path d="M  0 10,  5 10, M 5  0,  5 20"/>`,
  '├': `<path d="M 10 10,  5 10, M 5  0,  5 20"/>`,
  '▟': `<path d="M  5 10, 10 20, M 0 20, 10  0"/>`,
  '▙': `<path d="M  0  0, 10 20, M 0 20,  5 10"/>`,
  '▜': `<path d="M  0  0, 10 20, M 5 10, 10  0"/>`,
  '▛': `<path d="M  0  0,  5 10, M 0 20, 10  0"/>`,
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
    svg: wide(junctions['┼']),
  },
  {
    hotspot: '┼',
    svg: junctions['┼'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections(straightDirections),
    svg: junctions['┼'],
    rules: rays(diagonalDirections),
  },

  /* Rounded */
  {
    hotspot: hsplit,
    size: 1,
    pattern: connections(straightDirections),
    svg:
      roundedCorners.tr +
      roundedCorners.tl +
      roundedCorners.br +
      roundedCorners.bl,
  },

  /* Diagonals */
  {
    hotspot: '╳',
    svg: junctions['╳'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections(diagonalDirections),
    svg: junctions['╳'],
    rules: rays(straightDirections),
  },

  /*
   * 3-way connections
   */

  /* Straight no bottom */
  {
    hotspot: '┻',
    svg: wide(junctions['┴']),
  },
  {
    hotspot: '┴',
    svg: junctions['┴'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...straightDirections, b: false }),
    svg: junctions['┴'],
    rules: rays(diagonalDirections),
  },

  /* Straight no top */
  {
    hotspot: '┳',
    svg: wide(junctions['┬']),
  },
  {
    hotspot: '┬',
    svg: junctions['┬'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...straightDirections, t: false }),
    svg: junctions['┬'],
    rules: rays(diagonalDirections),
  },

  /* Straight no right */
  {
    hotspot: '┫',
    svg: wide(junctions['┤']),
  },
  {
    hotspot: '┤',
    svg: junctions['┤'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...straightDirections, r: false }),
    svg: junctions['┤'],
    rules: rays(diagonalDirections),
  },

  /* Straight no left */
  {
    hotspot: '┣',
    svg: wide(junctions['├']),
  },
  {
    hotspot: '├',
    svg: junctions['├'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...straightDirections, l: false }),
    svg: junctions['├'],
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
    svg: roundedCorners.tr + roundedCorners.tl,
  },

  /* Rounded no bottom */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({
      r: except(endBottom) + include(linkRight),
      l: except(endBottom) + include(linkLeft),
    }),
    svg: roundedCorners.br + roundedCorners.bl,
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
    svg: roundedCorners.tl + roundedCorners.bl,
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
    svg: roundedCorners.tr + roundedCorners.br,
  },

  /* Diagonals no top-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...diagonalDirections, tl: false }),
    svg: junctions['▟'],
    rules: rays(straightDirections),
  },

  /* Diagonals no top-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...diagonalDirections, tr: false }),
    svg: junctions['▙'],
    rules: rays(straightDirections),
  },

  /* Diagonals no bottom-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...diagonalDirections, bl: false }),
    svg: junctions['▜'],
    rules: rays(straightDirections),
  },

  /* Diagonals no bottom-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...diagonalDirections, br: false }),
    svg: junctions['▛'],
    rules: rays(straightDirections),
  },
];
