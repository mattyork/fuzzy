/*
 * FuzzySearch
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */

(function() {

var root = this;

var fuzzy = {};

if (typeof exports !== 'undefined') {
  module.exports = fuzzy;
} else {
  root.fuzzy = fuzzy;
}

function splice(str, idx, s) {
  return str.slice(0,idx) + s + str.slice(idx);
}

function fuzzyRegex(str) {
  return new RegExp('.*' + str.split('').join('.*') + '.*');
}

fuzzy.filter = function(pattern, arr, getStrToTest) {
  var regex = fuzzyRegex(pattern);
  getStrToTest = getStrToTest || function(el) {
    return el;
  };
  return arr.filter(function (val) {
    return regex.test(getStrToTest(val));
  });
};

fuzzy.test = function(pattern, string) {
  var patt = fuzzyRegex(pattern);
  return new RegExp(patt).test(string);
};

fuzzy.positions = function(pattern, string) {
  var pos = 0, positions = [], l = string.length;
  pattern.split('').forEach(function(ch) {
    while(pos < l && string.charAt(pos) !== ch) pos += 1;
    if(pos === l) return;
    positions.push(pos);
  });

  if(positions.length && positions.length === pattern.length) {
    return positions;
  }
  return null;
};

fuzzy.templatize = function(pattern, string, template) {
  var pos = 0
    , result = []
    , len = string.length;

  template = template || "{{char}}";

  // for each character in the string, either add it to the result
  // or run it through the template if its the next character in the
  // pattern
  string.split('').forEach(function(ch) {
    if(ch === pattern.charAt(pos)) {
      ch = template.replace(/\{\{char\}\}/, ch);
      pos += 1;
    }
    result[result.length] = ch;
  });
  if(pos === pattern.length) {
    return result.join('');
  }
  return null;
};

fuzzy.filter2 = function(pattern, arr, template, getStrToTest) {
  var regex = fuzzyRegex(pattern);
  getStrToTest = getStrToTest || function(el) {
    return el;
  };
  return arr.reduce(function(prev, curr, idx, arr) {
    var str = getStrToTest(curr);
    var rendered = fuzzy.templatize(pattern, str, template);
    if(rendered != null) {
      prev.push({str: rendered, idx: idx});
    }
    return prev;
  }, []);
};



}());

