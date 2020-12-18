import { connections, include, except } from '../utils.js';
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
    pattern: connections({ t: true, r: true, b: true, l: true }),
    svg: junctions['┼'],
    rules: rays,
  },

  /* Rounded */
  {
    hotspot: hsplit,
    size: 1,
    pattern: connections({ t: true, r: true, b: true, l: true }),
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
    pattern: connections({ tl: true, tr: true, bl: true, br: true }),
    svg: junctions['╳'],
    rules: rays,
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
    pattern: connections({ t: true, r: true, b: false, l: true }),
    svg: junctions['┴'],
    rules: rays,
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
    pattern: connections({ t: false, r: true, b: true, l: true }),
    svg: junctions['┬'],
    rules: rays,
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
    pattern: connections({ t: true, r: false, b: true, l: true }),
    svg: junctions['┤'],
    rules: rays,
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
    pattern: connections({ t: true, r: true, b: true, l: false }),
    svg: junctions['├'],
    rules: rays,
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
    pattern: connections({ tl: false, tr: true, bl: true, br: true }),
    svg: junctions['▟'],
    rules: rays,
  },

  /* Diagonals no top-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: true, tr: false, bl: true, br: true }),
    svg: junctions['▙'],
    rules: rays,
  },

  /* Diagonals no bottom-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: true, tr: true, bl: false, br: true }),
    svg: junctions['▜'],
    rules: rays,
  },

  /* Diagonals no bottom-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: true, tr: true, bl: true, br: false }),
    svg: junctions['▛'],
    rules: rays,
  },
];
