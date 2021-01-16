import ends from './patterns/ends.js';
import junctions from './patterns/junctions.js';
import ticks from './patterns/ticks.js';
import corners from './patterns/corners.js';
import angles from './patterns/angles.js';
import lines from './patterns/lines.js';
import symbols from './patterns/symbols.js';
import curves from './patterns/curves.js';
import arrows from './patterns/arrows.js';
import decorations from './patterns/decorations.js';
import rays from './patterns/rays.js';

/** @typedef {import('../render').Pattern} Pattern*/

/** @type {Pattern[]} */
export const patterns = [
  ...junctions,
  ...curves,
  ...angles,
  ...corners,
  ...arrows,
  ...decorations,
  ...ends,
  ...ticks,
  ...lines,
  ...rays,
  ...symbols,
];
