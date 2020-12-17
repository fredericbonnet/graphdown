/*
 * Character constants
 */

export const blank = ' ';
export const endTop = '.';
export const endBottom = "'";
export const anchor = '+';
export const vline = '|';
export const hline = '-';
export const dline = '\\';
export const uline = '/';

/*
 * Linkable neighbors in each direction
 */
export const linkTop = vline + anchor + endTop;
export const linkBottom = vline + anchor + endBottom;
export const linkLeft = hline + anchor + endTop + endBottom;
export const linkRight = hline + anchor + endTop + endBottom;
