import { wide } from './utils.js';

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
    patterns: ['.'],
    mask: [[true]],
    svg: wide(junctions['┼']),
  },
  {
    hotspot: '┼',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: junctions['┼'],
  },
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[-+].[-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: junctions['┼'],
  },

  /*
   * 3-way connections
   */

  /* Top */
  {
    hotspot: '┻',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: wide(junctions['┴']),
  },
  {
    hotspot: '┴',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: junctions['┴'],
  },
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[-+].[-+]/, /.[^|+]./],
    mask: [[], [false, true, false], []],
    svg: junctions['┴'],
  },

  /* Bottom */
  {
    hotspot: '┳',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: wide(junctions['┬']),
  },
  {
    hotspot: '┬',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: junctions['┬'],
  },
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[^|+]./, /[-+].[-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: junctions['┬'],
  },

  /* Left */
  {
    hotspot: '┫',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: wide(junctions['┤']),
  },
  {
    hotspot: '┤',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: junctions['┤'],
  },
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[-+].[^-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: junctions['┤'],
  },

  /* Right */
  {
    hotspot: '┣',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: wide(junctions['├']),
  },
  {
    hotspot: '├',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: junctions['├'],
  },
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[^-+].[-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: junctions['├'],
  },
];
