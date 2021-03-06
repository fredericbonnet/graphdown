import { segment } from '../shapes.js';
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
 * Shapes
 */

// prettier-ignore
const arcs = {
  tl: segment({from: [10, 10], to: [-5,  30], forward: 'q -15 0, -15  15', backward: 'l 0 -5, q 0 -15,  15 -15'}),
  tr: segment({from: [ 0, 10], to: [15,  30], forward: 'q  15 0,  15  15', backward: 'l 0 -5, q 0 -15, -15 -15'}),
  bl: segment({from: [10, 10], to: [-5, -10], forward: 'q -15 0, -15 -15', backward: 'l 0  5, q 0  15,  15  15'}),
  br: segment({from: [ 0, 10], to: [15, -10], forward: 'q  15 0,  15 -15', backward: 'l 0  5, q 0  15, -15  15'}),
};

// prettier-ignore
const shortArcsTop = {
  tl: segment({from: [10, 10], to: [5, 15], forward: 'q -5 0, -5  5', backward: 'q 0 -5,  5 -5'}),
  tr: segment({from: [ 0, 10], to: [5, 15], forward: 'q  5 0,  5  5', backward: 'q 0 -5, -5 -5'}),
  bl: segment({from: [10, 20], to: [5, 15], forward: 'q -5 0, -5 -5', backward: 'q 0  5,  5  5'}),
  br: segment({from: [ 0, 20], to: [5, 15], forward: 'q  5 0,  5 -5', backward: 'q 0  5, -5  5'}),
};

// prettier-ignore
const shortArcsBottom = {
  tl: segment({from: [10,  0], to: [5, 5], forward: 'q -5 0, -5  5', backward: 'q 0 -5,  5 -5'}),
  tr: segment({from: [ 0,  0], to: [5, 5], forward: 'q  5 0,  5  5', backward: 'q 0 -5, -5 -5'}),
  bl: segment({from: [10, 10], to: [5, 5], forward: 'q -5 0, -5 -5', backward: 'q 0  5,  5  5'}),
  br: segment({from: [ 0, 10], to: [5, 5], forward: 'q  5 0,  5 -5', backward: 'q 0  5, -5  5'}),
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
        shapes: [shortArcsTop.tl],
      },
      {
        pattern: connections({
          b: false,
          l: include(hline),
          r: include(hline + bline),
        }),
        shapes: [shortArcsTop.tr],
      },
      {
        pattern: connections({ b: false, r: include(bline) }),
        shapes: [shortArcsTop.bl],
      },
      {
        pattern: connections({ b: false, l: include(bline) }),
        shapes: [shortArcsTop.br],
      },
    ],
  },
  {
    hotspot: endBottom,
    size: 1,
    rules: [
      {
        pattern: connections({ t: false, tr: include(bline) }),
        shapes: [shortArcsBottom.tl],
      },
      {
        pattern: connections({ t: false, tl: include(bline) }),
        shapes: [shortArcsBottom.tr],
      },
      {
        pattern: connections({
          t: false,
          tl: include(bline),
          r: include(hline),
        }),
        shapes: [shortArcsBottom.bl],
      },
      {
        pattern: connections({
          t: false,
          tr: include(bline),
          l: include(hline),
        }),
        shapes: [shortArcsBottom.br],
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
    shapes: [arcs.tl, arcs.bl],
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
    shapes: [arcs.tr, arcs.br],
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
    shapes: [arcs.tl],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      t: false,
      tr: include(endTop + hsplit),
      r: exclude(linkBottom),
    }),
    shapes: [ends.t],
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
    shapes: [arcs.tr],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      t: false,
      tl: include(endTop + hsplit),
      l: exclude(linkBottom),
    }),
    shapes: [ends.t],
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
    shapes: [arcs.bl],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      b: false,
      br: include(endBottom + hsplit),
      r: exclude(linkTop),
    }),
    shapes: [ends.b],
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
    shapes: [arcs.br],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      b: false,
      bl: include(endBottom + hsplit),
      l: exclude(linkTop),
    }),
    shapes: [ends.b],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ bl: include(endBottom) }),
    rules: rays(allDirections),
  },
];
