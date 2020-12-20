/*
 * Character constants
 */

export const blank = ' ';
export const endTop = '.';
export const endBottom = "'";
export const hsplit = ':';
export const anchor = '+';
export const vline = '|';
export const hline = '-';
export const dline = '\\';
export const uline = '/';
export const arrowLeft = '<';
export const arrowRight = '>';
export const arrowTop = '^';
export const arrowBottom = 'v';
export const disc = '*';
export const ring = 'o';

export const decorations = disc + ring;

/*
 * Linkable neighbors in each direction
 */
export const linkTop = vline + anchor + endTop + arrowTop;
export const linkBottom = vline + anchor + endBottom + arrowBottom;
export const linkLeft = hline + anchor + endTop + endBottom + arrowLeft;
export const linkRight = hline + anchor + endTop + endBottom + arrowRight;
export const linkTopLeft = dline + '(';
export const linkTopRight = uline + ')';
export const linkBottomLeft = uline + '(';
export const linkBottomRight = dline + ')';
