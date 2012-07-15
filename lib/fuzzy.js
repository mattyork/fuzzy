/*
 * FuzzySearch
 * https://github.com/myork/FuzzySearch
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */

/**
 TODO

 - Get benchmarks up
 - Get benchmarks running in the browser
 - Compare performance using my own position function to the regex function
 - Accept a template function to wrap each character. e.g. <span>m</span>atch
 */

(function() {

var root = this;

var fuzzy = {};

if (typeof exports !== 'undefined') {
  module.exports = fuzzy;
} else {
  root.fuzzy = fuzzy;
}

function fuzzyRegex(str) {
  return new RegExp('.*' + str.split('').join('.*') + '.*');
}

fuzzy.filter = function(str, arr, getStrToTest) {
  var regex = fuzzyRegex(str)
  getStrToTest = getStrToTest || function(el) {
    return el;
  };
  return arr.filter(function (val) {
    return regex.test(getStrToTest(val));
  });
}

fuzzy.test = function(pattern, string) {
  var patt = fuzzyRegex(pattern);
  return new RegExp(patt).test(string);
}

fuzzy.positions = function(pattern, string) {
  var pos = 0, positions = [], l = string.length;
  pattern.split('').forEach(function(ch) {
    while(pos < l && string.charAt(pos) !== ch) pos += 1;
    if(pos !== l) positions.push(pos);
  })
  if(positions.length && positions.length === pattern.length) {
    return positions;
  }
  return null;
}

}())

