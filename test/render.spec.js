import chai from 'chai';

import {
  getBlock,
  matchAll,
  addMask,
  charactersToRegExp,
  applyMask,
  makeSpiral,
} from '../render.js';

const { expect } = chai;

describe('render', () => {
  describe('makeSpiral', () => {
    specify('size zero', () => {
      expect(makeSpiral(0)).to.deep.equal([[0, 0]]);
    });
    specify('size one', () => {
      // prettier-ignore
      expect(makeSpiral(1)).to.deep.equal([
        [ 0,  0], 
        [ 0, -1], [ 1, -1], 
        [ 1,  0], [ 1,  1],
        [ 0,  1], [-1,  1],
        [-1,  0], [-1, -1],
      ]);
    });
    specify('size two', () => {
      // prettier-ignore
      expect(makeSpiral(2)).to.deep.equal([
        [ 0,  0], 
        [ 0, -1], [ 1, -1], 
        [ 1,  0], [ 1,  1],
        [ 0,  1], [-1,  1],
        [-1,  0], [-1, -1],
        [-1, -2], [ 0, -2], [ 1, -2], [ 2, -2],
        [ 2, -1], [ 2,  0], [ 2,  1], [ 2,  2], 
        [ 1,  2], [ 0,  2], [-1,  2], [-2,  2],
        [-2,  1], [-2,  0], [-2, -1], [-2, -2],
      ]);
    });
    specify('size three', () => {
      // prettier-ignore
      expect(makeSpiral(3)).to.deep.equal([
        [ 0,  0], 
        [ 0, -1], [ 1, -1], 
        [ 1,  0], [ 1,  1],
        [ 0,  1], [-1,  1],
        [-1,  0], [-1, -1],
        [-1, -2], [ 0, -2], [ 1, -2], [ 2, -2],
        [ 2, -1], [ 2,  0], [ 2,  1], [ 2,  2], 
        [ 1,  2], [ 0,  2], [-1,  2], [-2,  2],
        [-2,  1], [-2,  0], [-2, -1], [-2, -2],
        [-2, -3], [-1, -3], [ 0, -3], [ 1, -3], [ 2, -3], [ 3, -3],
        [ 3, -2], [ 3, -1], [ 3,  0], [ 3,  1], [ 3,  2], [ 3,  3], 
        [ 2,  3], [ 1,  3], [ 0,  3], [-1,  3], [-2,  3], [-3,  3],
        [-3,  2], [-3,  1], [-3,  0], [-3, -1], [-3, -2], [-3, -3], 
      ]);
    });
  });

  describe('getBlock', () => {
    describe('size zero', () => {
      it('should return single space from empty data', () => {
        const lines = [];
        const expected = ' ';
        expect(getBlock(lines, 0, 0, 0)).to.deep.equal(expected);
        expect(getBlock(lines, 1, 2, 0)).to.deep.equal(expected);
        expect(getBlock(lines, -1, 0, 0)).to.deep.equal(expected);
      });
      it('should return source character', () => {
        const lines = ['a'];
        const expected = 'a';
        expect(getBlock(lines, 0, 0, 0)).to.deep.equal(expected);
      });
      it('should return single space from out-of-range coordinates', () => {
        const lines = ['a'];
        const expected = ' ';
        expect(getBlock(lines, -1, 0, 0)).to.deep.equal(expected);
        expect(getBlock(lines, 0, -1, 0)).to.deep.equal(expected);
        expect(getBlock(lines, -1, -1, 0)).to.deep.equal(expected);
        expect(getBlock(lines, 1, 0, 0)).to.deep.equal(expected);
        expect(getBlock(lines, 0, 1, 0)).to.deep.equal(expected);
      });
    });

    describe('size one', () => {
      it('should return empty block from empty data', () => {
        const lines = [];
        const expected = ' '.repeat(9);
        expect(getBlock(lines, 0, 0, 1)).to.deep.equal(expected);
        expect(getBlock(lines, 1, 2, 1)).to.deep.equal(expected);
        expect(getBlock(lines, -1, 0, 1)).to.deep.equal(expected);
      });
      it('should return existing data', () => {
        const lines = ['1234', '5678', '9ABC', 'DEF0'];
        expect(getBlock(lines, 3, 2, 0)).to.deep.equal('F');
        expect(getBlock(lines, 1, 1, 1)).to.deep.equal('6237BA951');
        expect(getBlock(lines, 2, 2, 1)).to.deep.equal('B78C0FEA6');
      });
      it('should fill missing data with spaces', () => {
        const lines = ['a'];
        expect(getBlock(lines, 0, 0, 1)).to.deep.equal('a        ');
        expect(getBlock(lines, 1, 0, 1)).to.deep.equal(' a       ');
        expect(getBlock(lines, 0, 1, 1)).to.deep.equal('       a ');
        expect(getBlock(lines, 1, 1, 1)).to.deep.equal('        a');
        expect(getBlock(lines, -1, 0, 1)).to.deep.equal('     a   ');
        expect(getBlock(lines, 0, -1, 1)).to.deep.equal('   a     ');
        expect(getBlock(lines, -1, -1, 1)).to.deep.equal('    a    ');
      });
      it('should return empty block from out-of-range coordinates', () => {
        const lines = ['a'];
        const expected = '         ';
        expect(getBlock(lines, -2, 0, 1)).to.deep.equal(expected);
        expect(getBlock(lines, 0, -2, 1)).to.deep.equal(expected);
        expect(getBlock(lines, -2, -2, 1)).to.deep.equal(expected);
        expect(getBlock(lines, 2, 0, 1)).to.deep.equal(expected);
        expect(getBlock(lines, 0, 2, 1)).to.deep.equal(expected);
      });
    });
  });

  describe('matchAll', () => {
    it('should succeed on empty lines ', () => {
      expect(matchAll([], [])).to.be.true;
    });
    it('should accept empty patterns', () => {
      expect(matchAll(['a'], [])).to.be.true;
    });
    it('should accept string patterns', () => {
      expect(matchAll(['a'], ['a'])).to.be.true;
      expect(matchAll(['a'], ['b'])).to.be.false;
    });
    it('should accept regexp patterns', () => {
      expect(matchAll(['a'], [/a/])).to.be.true;
      expect(matchAll(['a'], [/b/])).to.be.false;
    });
    it('should match all lines', () => {
      expect(matchAll(['a', 'b'], [/a/, 'b'])).to.be.true;
      expect(matchAll(['a', 'b'], [/b/])).to.be.false;
      expect(matchAll(['a', 'b'], [/a/, /a/])).to.be.false;
    });
  });

  describe('addMask', () => {
    it('should accept empty source', () => {
      const src = [];
      const dst = [[false]];
      const expected = [[false]];
      expect(addMask(dst, src, 1, 1)).to.deep.equal(expected);
    });
    it('should extend destination size', () => {
      expect(addMask([], [[true]], 0, 0)).to.deep.equal([[true]]);
      expect(addMask([], [[true]], 1, 0)).to.deep.equal([, [true]]);
      expect(addMask([], [[true]], 0, 1)).to.deep.equal([[, true]]);
      expect(addMask([], [[true]], 1, 1)).to.deep.equal([, [, true]]);
      expect(addMask([], [[false]], 3, 3)).to.deep.equal([, , , [, , , false]]);
    });
    it('should accumulate into destination', () => {
      expect(addMask([[true]], [[false]], 0, 0)).to.deep.equal([[true]]);
      expect(addMask([[false]], [[false]], 0, 0)).to.deep.equal([[false]]);
      expect(addMask([], [[]], 0, 0)).to.deep.equal([[]]);
      expect(addMask([], [[false]], 0, 0)).to.deep.equal([[false]]);
      expect(addMask([[false]], [[true]], 0, 0)).to.deep.equal([[true]]);
    });
    it('should support arbitrary sizes', () => {
      // prettier-ignore
      const source = [
        [, true],
        [true]
      ];

      expect(addMask([], source, 2, 4)).to.deep.equal(
        // prettier-ignore
        [
          ,
          ,
          [, , , , false, true],
          [, , , , true],
        ]
      );
    });
    it('should accept negative coordinates', () => {
      // prettier-ignore
      const source = [
        [, true],
        [true]
      ];

      expect(addMask([], source, 0, -1)).to.deep.equal([[true], []]);
      expect(addMask([], source, 1, -1)).to.deep.equal([, [true], []]);
      expect(addMask([], source, -1, 0)).to.deep.equal([[true]]);
      expect(addMask([], source, -1, -1)).to.deep.equal([[]]);
      expect(addMask([], source, -2, -2)).to.deep.equal([]);
    });
  });

  describe('charactersToRegExp', () => {
    it('should accept empty lists', () => {
      expect(charactersToRegExp([])).to.equal(null);
    });
    it('should accept single values lists', () => {
      expect(charactersToRegExp(['a']).toString()).to.equal(/[a]/g.toString());
    });
    it('should merge several characters into one range', () => {
      expect(charactersToRegExp(['a', 'b']).toString()).to.equal(
        /[ab]/g.toString()
      );
    });
    it('should accept special characters', () => {
      expect(charactersToRegExp(['\\']).toString()).to.equal(
        /[\\]/g.toString()
      );
      expect(charactersToRegExp(['[']).toString()).to.equal(/[\[]/g.toString());
      expect(charactersToRegExp([']']).toString()).to.equal(/[\]]/g.toString());
      expect(charactersToRegExp(['^']).toString()).to.equal(/[\^]/g.toString());
      expect(charactersToRegExp(['-']).toString()).to.equal(/[\-]/g.toString());
      expect(
        charactersToRegExp(['\\', '[', ']', '^', '-']).toString()
      ).to.equal(/[\\\[\]\^\-]/g.toString());
      expect(charactersToRegExp(['$*+?()']).toString()).to.equal(
        /[$*+?()]/g.toString()
      );
    });
  });

  describe('applyMask', () => {
    it('should replace erased characters with space', () => {
      const source = ['1234', '5678', '9ABC', 'DEF0'];
      const mask = [[, true], , [false, , true], [, , , true]];
      const expected = ['1 34', '5678', '9A C', 'DEF '];
      expect(applyMask(source, mask)).to.deep.equal(expected);
    });
  });
});
