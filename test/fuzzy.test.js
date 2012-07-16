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
  describe('.filter', function(){
    it('should filter the elements of a string array', function(){
      expect(fuzzy.filter('a', ['a'])).to.eql(['a']);
      expect(fuzzy.filter('ab', ['aba', 'c', 'cacb'])).to.eql(['aba', 'cacb']);
    });
    it('should use optional func to get str out of array entry', function() {
        var arr = [{arg: 'hizzahpooslahp'}, {arg: 'arppg'}];
        expect(fuzzy.filter('poop', arr, function(el) {
          return el.arg;
        })).to.eql([{arg: 'hizzahpooslahp'}]);
    });
  });
  describe('.filter2', function(){
    it('should return the index and matching array elements', function(){
      expect(fuzzy.filter2('a', ['a'])).to.eql([{str: 'a', idx: 0}]);
      expect(fuzzy.filter2('ab', ['aba', 'c', 'cacb'])).to.eql([
        {str: 'aba' , idx: 0},
        {str: 'cacb', idx: 2}
      ]);
    });
    // TODO: refactor test to be after template test
    it('should use optional func to get str out of array entry', function() {
      var arr = [{arg: 'hizzahpooslahp'}, {arg: 'arppg'}];
      expect(fuzzy.filter2('poop', arr, null, function(el) {
        return el.arg;
      })).to.eql([{str: 'hizzahpooslahp', idx: 0}]);
    });
    it('should use optional template string to wrap each element', function(){
      expect(fuzzy.filter2('a', ['a'], 'test{{char}}blah')).to.eql([
        {str: 'testablah', idx: 0}
      ]);
      expect(fuzzy.filter2('ab', ['cacbc'], '<{{char}}>')).to.eql([
        {str: 'c<a>c<b>c', idx: 0}
      ]);
    });
  });
});
