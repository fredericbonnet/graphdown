import { connections, include, exclude } from '../utils.js';
import { ends, rays } from './ends.js';
import {
  endTop,
  endBottom,
  anchor,
  vline,
  hline,
  linkTop,
  linkBottom,
} from '../characters.js';

/*
 * SVG templates
 */
const arcs = {
  tl: `<path d="M 10 10, Q -5 10, -5, 25, L -5 30"/>`,
  tr: `<path d="M 0 10, Q 15 10, 15, 25, L 15 30"/>`,
  bl: `<path d="M 10 10, Q -5 10, -5, -5, L -5 -10"/>`,
  br: `<path d="M 0 10, Q 15 10, 15, -5, L 15 -10"/>`,
};

/*
 * Character patterns
 */
export default [
  /* Left arc junctions */
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      t: false,
      tr: include(endTop),
      br: include(endBottom),
      b: false,
    }),
    svg: '',
  },

  /* Right arc junctions */
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      t: false,
      tl: include(endTop),
      bl: include(endBottom),
      b: false,
    }),
    svg: '',
  },

  /* Top left arc */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({
      b: false,
      bl: include(linkTop),
      l: exclude(hline + anchor),
    }),
    svg: arcs.tl,
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      t: false,
      tr: include(endTop),
      r: exclude(linkBottom),
    }),
    svg: ends.t,
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tr: include(endTop) }),
    rules: rays,
  },

  /* Top right arc */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({
      b: false,
      br: include(linkTop),
      r: exclude(hline + anchor),
    }),
    svg: arcs.tr,
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      t: false,
      tl: include(endTop),
      l: exclude(linkBottom),
    }),
    svg: ends.t,
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: include(endTop) }),
    rules: rays,
  },

  /* Bottom left arc */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({
      t: false,
      tl: include(linkBottom),
      l: exclude(hline + anchor),
    }),
    svg: arcs.bl,
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      b: false,
      br: include(endBottom),
      r: exclude(linkTop),
    }),
    svg: ends.b,
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ br: include(endBottom) }),
    rules: rays,
  },

  /* Bottom right arc */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({
      t: false,
      tr: include(linkBottom),
      r: exclude(hline + anchor),
    }),
    svg: arcs.br,
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      b: false,
      bl: include(endBottom),
      l: exclude(linkTop),
    }),
    svg: ends.b,
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ bl: include(endBottom) }),
    rules: rays,
  },
];
