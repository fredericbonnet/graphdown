import chai from 'chai';

import { connections, include, except, exclude } from '../src/utils.js';

const { expect } = chai;

describe('utils', () => {
  describe('include', () => {
    it('should return a pattern including all characters', () => {
      expect(include('abc')).to.equal(`[abc]`);
    });
    it('should escape special characters', () => {
      expect(include('^a-b\\][')).to.equal(`[\\^a\\-b\\\\\\]\\[]`);
    });
  });

  describe('except', () => {
    it('should return a negative lookahead excluding all characters', () => {
      expect(except('abc')).to.equal(`(?![abc])`);
    });
    it('should escape special characters', () => {
      expect(except('^a-b\\][')).to.equal(`(?![\\^a\\-b\\\\\\]\\[])`);
    });
  });

  describe('exclude', () => {
    it('should return a pattern excluding all characters', () => {
      expect(exclude('abc')).to.equal(`[^abc]`);
    });
    it('should escape special characters', () => {
      expect(exclude('^a-b\\][')).to.equal(`[^\\^a\\-b\\\\\\]\\[]`);
    });
  });

  describe('connections', () => {
    it('should return a regexp', () => {
      expect(connections({})).to.be.instanceOf(RegExp);
    });
    it('should accept an empty list of directions', () => {
      expect(connections({}).toString()).to.equal(`/^.........$/`);
    });
    it('should accept top as boolean', () => {
      expect(connections({ t: true }).toString()).to.equal(
        `/^.[|+.\\^].......$/`
      );
      expect(connections({ t: false }).toString()).to.equal(
        `/^.[^|+.\\^].......$/`
      );
    });
    it('should accept top as custom string', () => {
      expect(connections({ t: '[a-z]' }).toString()).to.equal(
        `/^.[a-z].......$/`
      );
    });
    it('should accept right as boolean', () => {
      expect(connections({ r: true }).toString()).to.equal(
        `/^...[\\-+.'>].....$/`
      );
      expect(connections({ r: false }).toString()).to.equal(
        `/^...[^\\-+.'>].....$/`
      );
    });
    it('should accept right as custom string', () => {
      expect(connections({ r: '[a-z]' }).toString()).to.equal(
        `/^...[a-z].....$/`
      );
    });
    it('should accept bottom as boolean', () => {
      expect(connections({ b: true }).toString()).to.equal(
        `/^.....[|+'v]...$/`
      );
      expect(connections({ b: false }).toString()).to.equal(
        `/^.....[^|+'v]...$/`
      );
    });
    it('should accept bottom as custom string', () => {
      expect(connections({ b: '[a-z]' }).toString()).to.equal(
        `/^.....[a-z]...$/`
      );
    });
    it('should accept left as boolean', () => {
      expect(connections({ l: true }).toString()).to.equal(
        `/^.......[\\-+.'<].$/`
      );
      expect(connections({ l: false }).toString()).to.equal(
        `/^.......[^\\-+.'<].$/`
      );
    });
    it('should accept left as custom string', () => {
      expect(connections({ l: '[a-z]' }).toString()).to.equal(
        `/^.......[a-z].$/`
      );
    });
    it('should accept combined values', () => {
      expect(
        connections({ t: true, r: false, b: '[a-z]', l: '[1-9]' }).toString()
      ).to.equal(`/^.[|+.\\^].[^\\-+.'>].[a-z].[1-9].$/`);
    });
  });
});
