import chai from 'chai';

import { connections } from '../utils';

const { expect } = chai;

describe('utils', () => {
  describe('connections', () => {
    it('should return a regexp', () => {
      expect(connections([])).to.be.instanceOf(RegExp);
    });
    it('should accept an empty list of directions', () => {
      expect(connections([]).toString()).to.equal(`/^.........$/`);
    });
    it('should accept top as boolean', () => {
      expect(connections([true]).toString()).to.equal(`/^.[|.+].......$/`);
      expect(connections([false]).toString()).to.equal(`/^.[^|.+].......$/`);
    });
    it('should accept top as custom string', () => {
      expect(connections(['[a-z]']).toString()).to.equal(`/^.[a-z].......$/`);
    });
    it('should accept right as boolean', () => {
      expect(connections([, , true]).toString()).to.equal(
        `/^...[\\-+.'].....$/`
      );
      expect(connections([, , false]).toString()).to.equal(
        `/^...[^\\-+.'].....$/`
      );
    });
    it('should accept right as custom string', () => {
      expect(connections([, , '[a-z]']).toString()).to.equal(
        `/^...[a-z].....$/`
      );
    });
    it('should accept bottom as boolean', () => {
      expect(connections([, , , , true]).toString()).to.equal(
        `/^.....[|'+]...$/`
      );
      expect(connections([, , , , false]).toString()).to.equal(
        `/^.....[^|'+]...$/`
      );
    });
    it('should accept bottom as custom string', () => {
      expect(connections([, , , , '[a-z]']).toString()).to.equal(
        `/^.....[a-z]...$/`
      );
    });
    it('should accept left as boolean', () => {
      expect(connections([, , , , , , true]).toString()).to.equal(
        `/^.......[\\-+.'].$/`
      );
      expect(connections([, , , , , , false]).toString()).to.equal(
        `/^.......[^\\-+.'].$/`
      );
    });
    it('should accept left as custom string', () => {
      expect(connections([, , , , , , '[a-z]']).toString()).to.equal(
        `/^.......[a-z].$/`
      );
    });
    it('should accept combined values', () => {
      expect(
        connections([true, , false, , '[a-z]', , '[1-9]']).toString()
      ).to.equal(`/^.[|.+].[^\\-+.'].[a-z].[1-9].$/`);
    });
  });
});
