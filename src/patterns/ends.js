import {
  endTop,
  endBottom,
  bline,
  linkBottom,
  linkTop,
  linkTopRight,
  linkTopLeft,
} from '../characters.js';
import { path, wide } from '../shapes.js';
import { connections, include, except } from '../utils.js';
import { lines } from './lines.js';

/*
 * Shapes
 */

// prettier-ignore
export const ends = {
  t:  path([5, 10], 'l  0  10'),
  b:  path([5, 10], 'l  0 -10'),
  l:  path([5, 10], 'l  5  0'),
  r:  path([5, 10], 'l -5  0'),
  tl: path([5, 10], 'l  5  10'),
  tr: path([5, 10], 'l -5  10'),
  br: path([5, 10], 'l -5 -10'),
  bl: path([5, 10], 'l  5 -10'),
};

// prettier-ignore
const wideEnds = {
  t: path([5, 10], 'l  0  10', wide),
  b: path([5, 10], 'l  0 -10', wide),
  l: path([5, 10], 'l  5  0', wide),
  r: path([5, 10], 'l -5  0', wide),
};

// prettier-ignore
const bottomEnds = {
  l:  path([0,  20], 'l  -5 0'),
  r:  path([10, 20], 'l   5 0'),
  ll: path([0,  20], 'l -10 0'),
  rr: path([10, 20], 'l  10 0'),
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
