import {
  endTop,
  endBottom,
  bline,
  linkBottom,
  linkTop,
  linkTopRight,
  linkTopLeft,
} from '../characters.js';
import { segment, wide } from '../shapes.js';
import { connections, include, except } from '../utils.js';
import { lines } from './lines.js';

/*
 * Shapes
 */

// prettier-ignore
export const ends = {
  t:  segment({from: [5, 10], to: [ 5, 20]}),
  b:  segment({from: [5, 10], to: [ 5,  0]}),
  l:  segment({from: [5, 10], to: [10, 10]}),
  r:  segment({from: [5, 10], to: [ 0, 10]}),
  tl: segment({from: [5, 10], to: [10, 20]}),
  tr: segment({from: [5, 10], to: [ 0, 20]}),
  br: segment({from: [5, 10], to: [ 0,  0]}),
  bl: segment({from: [5, 10], to: [10,  0]}),
};

// prettier-ignore
const wideEnds = {
  t: segment({from: [5, 10], to: [ 5, 20]}, wide),
  b: segment({from: [5, 10], to: [ 5,  0]}, wide),
  l: segment({from: [5, 10], to: [10, 10]}, wide),
  r: segment({from: [5, 10], to: [ 0, 10]}, wide),
};

// prettier-ignore
const bottomEnds = {
  l:  segment({from: [0,  20], to: [ -5, 20]}),
  r:  segment({from: [10, 20], to: [ 15, 20]}),
  ll: segment({from: [0,  20], to: [-10, 20]}),
  rr: segment({from: [10, 20], to: [ 20, 20]}),
};

/*
 * Character patterns
 */
export default [
  /*
   * Open ends
   */

  /* Top-left */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ br: true }),
    shapes: [ends.tl],
  },

  /* Top */
  {
    hotspot: '╻',
    shapes: [wideEnds.t],
  },
  {
    hotspot: '╷',
    shapes: [ends.t],
  },
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ b: true }),
    shapes: [ends.t],
  },

  /* Top-right */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ bl: true }),
    shapes: [ends.tr],
  },

  /* Right */
  {
    hotspot: '╸',
    shapes: [wideEnds.r],
  },
  {
    hotspot: '╴',
    shapes: [ends.r],
  },

  /* Bottom-right */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ tl: true }),
    shapes: [ends.br],
  },

  /* Bottom */
  {
    hotspot: '╹',
    shapes: [wideEnds.b],
  },
  {
    hotspot: '╵',
    shapes: [ends.b],
  },
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ t: true }),
    shapes: [ends.b],
  },

  /* Bottom-left */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ tr: true }),
    shapes: [ends.bl],
  },

  /* Left */
  {
    hotspot: '╺',
    shapes: [wideEnds.l],
  },
  {
    hotspot: '╶',
    shapes: [ends.l],
  },

  /* Bottom line */
  {
    hotspot: bline,
    size: 1,
    shapes: [lines['_']],
    rules: [
      {
        pattern: connections(
          { l: except(endTop) + include(linkTop) },
          { bl: except(endBottom) + include(linkBottom) }
        ),
        shapes: [bottomEnds.l],
      },
      {
        pattern: connections(
          { r: except(endTop) + include(linkTop) },
          { br: except(endBottom) + include(linkBottom) }
        ),
        shapes: [bottomEnds.r],
      },
      {
        pattern: connections({ l: include(linkTopRight) }),
        shapes: [bottomEnds.ll],
      },
      {
        pattern: connections({ r: include(linkTopLeft) }),
        shapes: [bottomEnds.rr],
      },
    ],
  },
];
