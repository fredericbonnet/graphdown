import { endTop, endBottom } from '../characters.js';
import { wide } from '../svg.js';
import { connections } from '../utils.js';

/*
 * SVG templates
 */
export const ends = {
  t: `<path d="M 5 10,  5 20"/>`,
  b: `<path d="M 5 10,  5  0"/>`,
  l: `<path d="M 5 10, 10 10"/>`,
  r: `<path d="M 5 10,  0 10"/>`,
  tl: `<path d="M 5 10, 10 20"/>`,
  tr: `<path d="M 5 10,  0 20"/>`,
  br: `<path d="M 5 10,  0  0"/>`,
  bl: `<path d="M 5 10, 10  0"/>`,
};

/*
 * Character patterns
 */

export const rays = [
  {
    pattern: connections({ tl: true }),
    svg: ends.br,
  },
  {
    pattern: connections({ t: true }),
    svg: ends.b,
  },
  {
    pattern: connections({ tr: true }),
    svg: ends.bl,
  },
  {
    pattern: connections({ r: true }),
    svg: ends.l,
  },
  {
    pattern: connections({ br: true }),
    svg: ends.tl,
  },
  {
    pattern: connections({ b: true }),
    svg: ends.t,
  },
  {
    pattern: connections({ bl: true }),
    svg: ends.tr,
  },
  {
    pattern: connections({ l: true }),
    svg: ends.r,
  },
];

export default [
  /*
   * Open ends
   */

  /* Top-left */
  {
    hotspot: endTop,
    pattern: connections({ br: true }),
    svg: ends.tl,
  },

  /* Top */
  {
    hotspot: '╻',
    svg: wide(ends.t),
  },
  {
    hotspot: '╷',
    svg: ends.t,
  },
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ b: true }),
    svg: ends.t,
  },

  /* Top-right */
  {
    hotspot: endTop,
    pattern: connections({ bl: true }),
    svg: ends.tr,
  },

  /* Right */
  {
    hotspot: '╸',
    svg: wide(ends.r),
  },
  {
    hotspot: '╴',
    svg: ends.r,
  },

  /* Bottom-right */
  {
    hotspot: endBottom,
    pattern: connections({ tl: true }),
    svg: ends.br,
  },

  /* Bottom */
  {
    hotspot: '╹',
    svg: wide(ends.b),
  },
  {
    hotspot: '╵',
    svg: ends.b,
  },
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ t: true }),
    svg: ends.b,
  },

  /* Bottom-left */
  {
    hotspot: endBottom,
    pattern: connections({ tr: true }),
    svg: ends.bl,
  },

  /* Left */
  {
    hotspot: '╺',
    svg: wide(ends.l),
  },
  {
    hotspot: '╶',
    svg: ends.l,
  },
];