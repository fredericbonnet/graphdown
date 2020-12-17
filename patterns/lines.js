import { wide } from '../svg.js';
import { vline, hline } from '../characters.js';

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
    svg: wide(lines['─']),
  },
  {
    hotspot: '─',
    size: 0,
    svg: lines['─'],
  },
  {
    hotspot: hline,
    size: 0,
    svg: lines['─'],
  },

  /* Vertical line */
  {
    hotspot: '┃',
    size: 0,
    svg: wide(lines['│']),
  },
  {
    hotspot: '│',
    size: 0,
    svg: lines['│'],
  },
  {
    hotspot: vline,
    size: 0,
    svg: lines['│'],
  },
];
