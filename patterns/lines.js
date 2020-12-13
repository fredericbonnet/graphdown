import { wide } from './utils.js';

/*
 * SVG templates
 */
const lines = {
  '─': `<path d="M 0 10, 10 10"/>`,
  '│': `<path d="M 5 0, 5 20"/>`,
};

/*
 * Character patterns
 */
export default [
  /* Horizontal line */
  {
    hotspot: '━',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(lines['─']),
  },
  {
    hotspot: '─',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: lines['─'],
  },
  {
    hotspot: '-',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: lines['─'],
  },

  /* Vertical line */
  {
    hotspot: '┃',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(lines['│']),
  },
  {
    hotspot: '│',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: lines['│'],
  },
  {
    hotspot: '|',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: lines['│'],
  },
];
