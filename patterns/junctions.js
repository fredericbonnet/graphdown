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
    svg: wide(junctions['┼']),
  },
  {
    hotspot: '┼',
    size: 0,
    svg: junctions['┼'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: true, b: true, l: true }),
    svg: junctions['┼'],
  },

  /*
   * 3-way connections
   */

  /* Top */
  {
    hotspot: '┻',
    size: 0,
    svg: wide(junctions['┴']),
  },
  {
    hotspot: '┴',
    size: 0,
    svg: junctions['┴'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: true, b: false, l: true }),
    svg: junctions['┴'],
  },

  /* Bottom */
  {
    hotspot: '┳',
    size: 0,
    svg: wide(junctions['┬']),
  },
  {
    hotspot: '┬',
    size: 0,
    svg: junctions['┬'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: true, b: true, l: true }),
    svg: junctions['┬'],
  },

  /* Left */
  {
    hotspot: '┫',
    size: 0,
    svg: wide(junctions['┤']),
  },
  {
    hotspot: '┤',
    size: 0,
    svg: junctions['┤'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: false, b: true, l: true }),
    svg: junctions['┤'],
  },

  /* Right */
  {
    hotspot: '┣',
    size: 0,
    svg: wide(junctions['├']),
  },
  {
    hotspot: '├',
    size: 0,
    svg: junctions['├'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: true, b: true, l: false }),
    svg: junctions['├'],
  },
];
