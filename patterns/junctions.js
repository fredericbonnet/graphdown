import { connections } from '../utils.js';
import { wide } from '../svg.js';
import { anchor } from './characters.js';

/*
 * SVG templates
 */
const junctions = {
  '┼': `<path d="M 5 0, 5 20, M 0 10, 10 10"/>`,
  '┴': `<path d="M 5 0, 5 10, M 0 10, 10 10"/>`,
  '┬': `<path d="M 5 20, 5 10, M 0 10, 10 10"/>`,
  '┤': `<path d="M 0 10, 5 10, M 5 0, 5 20"/>`,
  '├': `<path d="M 10 10, 5 10, M 5 0, 5 20"/>`,
};

/*
 * Character patterns
 */
export default [
  /*
   * 4-way connections
   */

  {
    hotspot: '╋',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(junctions['┼']),
  },
  {
    hotspot: '┼',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: junctions['┼'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([true, , true, , true, , true]),
    mask: [[], [, true], []],
    svg: junctions['┼'],
  },

  /*
   * 3-way connections
   */

  /* Top */
  {
    hotspot: '┻',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(junctions['┴']),
  },
  {
    hotspot: '┴',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: junctions['┴'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([true, , true, , false, , true]),
    mask: [[], [, true], []],
    svg: junctions['┴'],
  },

  /* Bottom */
  {
    hotspot: '┳',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(junctions['┬']),
  },
  {
    hotspot: '┬',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: junctions['┬'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([false, , true, , true, , true]),
    mask: [[], [, true], []],
    svg: junctions['┬'],
  },

  /* Left */
  {
    hotspot: '┫',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(junctions['┤']),
  },
  {
    hotspot: '┤',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: junctions['┤'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([true, , false, , true, , true]),
    mask: [[], [, true], []],
    svg: junctions['┤'],
  },

  /* Right */
  {
    hotspot: '┣',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(junctions['├']),
  },
  {
    hotspot: '├',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: junctions['├'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([true, , true, , true, , false]),
    mask: [[], [, true], []],
    svg: junctions['├'],
  },
];
