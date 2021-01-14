import { connections, include, exclude, allDirections } from '../utils.js';
import { ends } from './ends.js';
import { rays } from './rays.js';
import {
  endTop,
  endBottom,
  anchor,
  vline,
  hline,
  linkTop,
  linkBottom,
  hsplit,
  bline,
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
const shortArcsTop = {
  tl: `<path d="M 10 10, Q 5 10, 5 15"/>`,
  tr: `<path d="M  0 10, Q 5 10, 5 15"/>`,
  bl: `<path d="M 10 20, Q 5 20, 5 15"/>`,
  br: `<path d="M  0 20, Q 5 20, 5 15"/>`,
};
const shortArcsBottom = {
  tl: `<path d="M 10  0, Q 5  0, 5 5"/>`,
  tr: `<path d="M  0  0, Q 5  0, 5 5"/>`,
  bl: `<path d="M 10 10, Q 5 10, 5 5"/>`,
  br: `<path d="M  0 10, Q 5 10, 5 5"/>`,
};

/*
 * Character patterns
 */
export default [
  /* Arc/S-curve junctions */
  {
    hotspot: vline,
    size: 1,
    pattern: connections(
      {
        t: false,
        tr: include(endTop),
        br: include(endBottom),
        b: false,
      },
      {
        t: false,
        tl: include(endTop),
        bl: include(endBottom),
        b: false,
      },
      {
        t: false,
        tr: include(endTop),
        bl: include(endBottom),
        b: false,
      },
      {
        t: false,
        tl: include(endTop),
        br: include(endBottom),
        b: false,
      }
    ),
    svg: '',
  },

  /* Short S-curve */
  {
    hotspot: endTop,
    size: 1,
    rules: [
      {
        pattern: connections({
          b: false,
          r: include(hline),
          l: include(hline + bline),
        }),
        svg: shortArcsTop.tl,
      },
      {
        pattern: connections({
          b: false,
          l: include(hline),
          r: include(hline + bline),
        }),
        svg: shortArcsTop.tr,
      },
      {
        pattern: connections({ b: false, r: include(bline) }),
        svg: shortArcsTop.bl,
      },
      {
        pattern: connections({ b: false, l: include(bline) }),
        svg: shortArcsTop.br,
      },
    ],
  },
  {
    hotspot: endBottom,
    size: 1,
    rules: [
      {
        pattern: connections({ t: false, tr: include(bline) }),
        svg: shortArcsBottom.tl,
      },
      {
        pattern: connections({ t: false, tl: include(bline) }),
        svg: shortArcsBottom.tr,
      },
      {
        pattern: connections({
          t: false,
          tl: include(bline),
          r: include(hline),
        }),
        svg: shortArcsBottom.bl,
      },
      {
        pattern: connections({
          t: false,
          tr: include(bline),
          l: include(hline),
        }),
        svg: shortArcsBottom.br,
      },
    ],
  },

  /* Left arc split */
  {
    hotspot: hsplit,
    size: 1,
    pattern: connections({
      t: false,
      b: false,
      tl: include(linkTop),
      bl: include(linkTop),
      l: exclude(hline + anchor),
    }),
    svg: arcs.tl + arcs.bl,
  },

  /* Right arc split */
  {
    hotspot: hsplit,
    size: 1,
    pattern: connections({
      t: false,
      b: false,
      tr: include(linkTop),
      br: include(linkTop),
      r: exclude(hline + anchor),
    }),
    svg: arcs.tr + arcs.br,
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
      tr: include(endTop + hsplit),
      r: exclude(linkBottom),
    }),
    svg: ends.t,
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tr: include(endTop) }),
    rules: rays(allDirections),
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
      tl: include(endTop + hsplit),
      l: exclude(linkBottom),
    }),
    svg: ends.t,
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: include(endTop) }),
    rules: rays(allDirections),
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
      br: include(endBottom + hsplit),
      r: exclude(linkTop),
    }),
    svg: ends.b,
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ br: include(endBottom) }),
    rules: rays(allDirections),
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
      bl: include(endBottom + hsplit),
      l: exclude(linkTop),
    }),
    svg: ends.b,
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ bl: include(endBottom) }),
    rules: rays(allDirections),
  },
];
