import {} from '../characters.js';
import { endTop, endBottom, anchor } from '../characters.js';
import { wide } from '../svg.js';
import { connections } from '../utils.js';

/*
 * SVG templates
 */
export const ends = {
  t: `<path d="M 5 10,  5 20"/>`,
  b: `<path d="M 5 10,  5  0"/>`,
  r: `<path d="M 5 10, 10 10"/>`,
  l: `<path d="M 5 10,  0 10"/>`,
  tl: `<path d="M 5 10, 10 20"/>`,
  tr: `<path d="M 5 10,  0 20"/>`,
  br: `<path d="M 5 10,  0  0"/>`,
  bl: `<path d="M 5 10, 10  0"/>`,
};
const ticks = {
  t: `<path d="M 5 10,  5 20, M 2 10, 8 10"/>`,
  b: `<path d="M 5 10,  5  0, M 2 10, 8 10"/>`,
  l: `<path d="M 5 10, 10 10, M 5  7, 5 13"/>`,
  r: `<path d="M 5 10,  0 10, M 5  7, 5 13"/>`,
  tl: `<path d="M 5 10, 10 20, M 3 11, 7  9"/>`,
  tr: `<path d="M 5 10,  0 20, M 3  9, 7 11"/>`,
  br: `<path d="M 5 10,  0  0, M 3 11, 7  9"/>`,
  bl: `<path d="M 5 10, 10  0, M 3  9, 7 11"/>`,
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
    svg: ends.r,
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
    svg: ends.l,
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
    svg: wide(ends.l),
  },
  {
    hotspot: '╴',
    svg: ends.l,
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
    svg: wide(ends.r),
  },
  {
    hotspot: '╶',
    svg: ends.r,
  },

  /*
   * Terminal tick
   */

  /* Top-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: false, tr: false, br: true, bl: false }),
    svg: ticks.tl,
  },

  /* Top */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: false, b: true, l: false }),
    svg: ticks.t,
  },

  /* Top-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: false, tr: false, br: false, bl: true }),
    svg: ticks.tr,
  },

  /* Right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: false, b: false, l: true }),
    svg: ticks.r,
  },

  /* Bottom-right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: true, tr: false, br: false, bl: false }),
    svg: ticks.br,
  },

  /* Bottom */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: false, b: false, l: false }),
    svg: ticks.b,
  },

  /* Bottom-left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: false, tr: true, br: false, bl: false }),
    svg: ticks.bl,
  },

  /* Left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: true, b: false, l: false }),
    svg: ticks.l,
  },
];
