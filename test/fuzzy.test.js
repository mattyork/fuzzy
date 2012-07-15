var require = require || function(){}
  , fuzzy = fuzzy || require('../lib/fuzzy')
  , chai = chai || require('chai')
  , expect = chai.expect

describe('fuzzy', function(){
  describe('.test', function(){
    it('should return true when fuzzy match', function(){
      expect(fuzzy.test('back', 'imaback')).to.be.True
      expect(fuzzy.test('back', 'bakck')).to.be.True
      expect(fuzzy.test('shig', 'osh kosh modkhigow')).to.be.True
    })
    it('should return false when no fuzzy match', function(){
      expect(fuzzy.test('back', 'abck')).to.be.False
      expect(fuzzy.test('okmgk', 'osh kosh modkhigow')).to.be.False
    })
  })
  describe('.positions', function(){
    it('should return null when no fuzzy match', function(){
      expect(fuzzy.positions('abc', 'zazzb')).to.not.exist
      expect(fuzzy.positions('', 'dosifsd')).to.not.exist
    })
    it('should return positions when there is a fuzzy match', function(){
      expect(fuzzy.positions('abc', 'azzbdscpw')).to.eql([0, 3, 6])
    })
  })
  describe('.filter', function(){
    it('should filter the elements of a string array', function(){
      expect(fuzzy.filter('a', ['a'])).to.eql(['a'])
      expect(fuzzy.filter('ab', ['aba', 'ccc', 'bab'])).to.eql(['aba', 'bab'])
    })
    it('should use optional func to get str out of array entry', function() {
        var arr = [{arg: 'hizzahpooslahp'}, {arg: 'arppg'}]
        expect(fuzzy.filter('poop', arr, function(el) {
          return el.arg
        })).to.eql([{arg: 'hizzahpooslahp'}])
    })
  })
})
