import ends from './patterns/ends.js';
import junctions from './patterns/junctions.js';
import ticks from './patterns/ticks.js';
import corners from './patterns/corners.js';
import angles from './patterns/angles.js';
import lines from './patterns/lines.js';
import symbols from './patterns/symbols.js';
import curves from './patterns/curves.js';

export const patterns = [
  ...junctions,
  ...curves,
  ...angles,
  ...corners,
  ...ends,
  ...ticks,
  ...lines,
  ...symbols,
];
