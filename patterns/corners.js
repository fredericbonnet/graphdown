import { wide } from './utils.js';

/*
 * SVG templates
 */
const corners = {
  '┌': `<path d="M 10 10, 5 10, 5 20"/>`,
  '┐': `<path d="M 0 10, 5 10, 5 20"/>`,
  '└': `<path d="M 10 10, 5 10, 5 0"/>`,
  '┘': `<path d="M 0 10, 5 10, 5 0"/>`,
};

/*
 * Character patterns
 */
export default [
  /* Top-left */
  {
    hotspot: '┌',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: corners['┌'],
  },
  {
    hotspot: '┏',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: wide(corners['┌']),
  },
  {
    hotspot: '+',
    size: 1,
    patterns: ['', /.\+[-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: corners['┌'],
  },

  /* Top-right */
  {
    hotspot: '┐',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: corners['┐'],
  },
  {
    hotspot: '┓',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: wide(corners['┐']),
  },
  {
    hotspot: '+',
    size: 1,
    patterns: ['', /[-+]\+./, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: corners['┐'],
  },

  /* Bottom-left */
  {
    hotspot: '└',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: corners['└'],
  },
  {
    hotspot: '┗',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: wide(corners['└']),
  },
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /.\+[-+]/, ''],
    mask: [[], [false, true, false], []],
    svg: corners['└'],
  },

  /* Bottom-right */
  {
    hotspot: '┘',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: corners['┘'],
  },
  {
    hotspot: '┛',
    size: 0,
    patterns: ['.'],
    mask: [[true]],
    svg: wide(corners['┘']),
  },
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[-+]\+./, ''],
    mask: [[], [false, true, false], []],
    svg: corners['┘'],
  },
];
