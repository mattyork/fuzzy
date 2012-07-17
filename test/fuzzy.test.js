var fuzzy = fuzzy || require('../lib/fuzzy')
  , chai = chai || require('chai')
  , expect = chai.expect;

describe('fuzzy', function(){
  describe('.test', function(){
    it('should return true when fuzzy match', function(){
      expect(fuzzy.test('back', 'imaback')).to.be.True;
      expect(fuzzy.test('back', 'bakck')).to.be.True;
      expect(fuzzy.test('shig', 'osh kosh modkhigow')).to.be.True;
    });
    it('should return false when no fuzzy match', function(){
      expect(fuzzy.test('back', 'abck')).to.be.False;
      expect(fuzzy.test('okmgk', 'osh kosh modkhigow')).to.be.False;
    });
  });
  describe('.positions', function(){
    it('should return null when no fuzzy match', function(){
      expect(fuzzy.positions('abc', 'zazzb')).to.not.exist;
      expect(fuzzy.positions('', 'dosifsd')).to.not.exist;
    });
    it('should return positions when there is a fuzzy match', function(){
      expect(fuzzy.positions('abc', 'azzbdscpw')).to.eql([0, 3, 6]);
    });
  });
  describe('.simpleFilter', function(){
    it('should filter the elements of a stringing array', function(){
      expect(fuzzy.simpleFilter('a', ['a'])).to.eql(['a']);
      expect(fuzzy.simpleFilter('ab', ['aba', 'c', 'cacb'])).to.eql(['aba', 'cacb']);
    });
    it('should use optional func to get string out of array entry', function() {
        var arr = [{arg: 'hizzahpooslahp'}, {arg: 'arppg'}];
        expect(fuzzy.simpleFilter('poop', arr, function(original) {
          return original.arg;
        })).to.eql([{arg: 'hizzahpooslahp'}]);
    });
  });
  describe('.filter', function(){
    it('should return the index and matching array elements', function(){
      expect(fuzzy.filter('a', ['a'])).to.eql([{string: 'a', index: 0, original: 'a'}]);
      expect(fuzzy.filter('ab', ['aba', 'c', 'cacb'])).to.eql([
        {string: 'aba' , index: 0, original: 'aba'},
        {string: 'cacb', index: 2, original: 'cacb'}
      ]);
    });
    it('should be case insensitive', function(){
      expect(fuzzy.filter('a', ['A'])).to.eql([{string: 'A', index: 0, original: 'A'}]);
    });
    it('should use optional template stringing to wrap each element', function(){
      expect(fuzzy.filter('a', ['a'], 'test{{char}}blah')).to.eql([
        {string: 'testablah', index: 0, original: 'a'}
      ]);
      expect(fuzzy.filter('ab', ['cacbc'], '<{{char}}>')).to.eql([
        {string: 'c<a>c<b>c', index: 0, original: 'cacbc'}
      ]);
    });
    it('should use optional func to get string out of array entry', function() {
      var arr = [{arg: 'hizzahpooslahp'}, {arg: 'arppg'}];
      expect(fuzzy.filter('poop', arr, null, function(original) {
        return original.arg;
      })).to.eql([
        { string: 'hizzahpooslahp'
        , index: 0
        , original: {arg: 'hizzahpooslahp'} }]);
    });
  });
});
