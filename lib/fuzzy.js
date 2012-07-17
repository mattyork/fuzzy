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

// Namespace for helper functions
var helpers = {

  // Returns the simple fuzzy regular expression for `str`
  fuzzyRegex: function(str) {
    return new RegExp('.*' + str.split('').join('.*') + '.*');
  }
};

// Do a simple filter of `pattern` against `array`. `extract` is
// an optional function that is called on each `arr` element to
// extract the string from the element
fuzzy.simpleFilter = function(pattern, arr, extract) {
  var regex = helpers.fuzzyRegex(pattern);
  extract = extract || function(el) {
    return el;
  };
  return arr.filter(function (el) {
    return regex.test(extract(el));
  });
};

// Does `pattern` match `str`?
fuzzy.test = function(pattern, string) {
  var patt = helpers.fuzzyRegex(pattern);
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

// if `pattern` matches `string`, wrap render the `template` against each
// matching character. `template` should have {{char}} as the matching
// character (though you don't have to include the {{char}} if you want
// to get rid of the matching character)
fuzzy.templatize = function(pattern, string, template) {
  var pos = 0
    , result = []
    , len = string.length;

  pattern = pattern.toLowerCase();
  template = template || "{{char}}";

  // for each character in the string, either add it to the result
  // or run it through the template if its the next char in pattern
  string.split('').forEach(function(ch) {
    if(ch.toLowerCase() === pattern.charAt(pos)) {
      ch = template.replace(/\{\{char\}\}/, ch);
      pos += 1;
    }
    result[result.length] = ch;
  });

  // return rendered string if we have a match for every char
  if(pos === pattern.length) {
    return result.join('');
  }

  return null;
};

// The normal entry point. Filters `arr` for matches against `pattern`.
// It returns an array with matching values of the type:
// [{
//     string:   '<b>lah' // The rendered string
//   , index:    2        // The index of the element in `arr`
//   , original: 'blah'   // The original element in `arr`
// }]
// `template` is an optional arg that, for example, will render
//            '>{{char}}<' to '>p<' for a match against 'p'
// `extract`  is an optional arg that will be called against each
//            element in `arr` to get string to test `pattern` against
fuzzy.filter = function(pattern, arr, template, extract) {
  extract = extract || function(el) {
    return el;
  };

  return arr.reduce(function(prev, curr, idx, arr) {
    var str = extract(curr);
    var rendered = fuzzy.templatize(pattern, str, template);
    if(rendered != null) {
      prev[prev.length] = {string: rendered, index: idx, original: curr};
    }
    return prev;
  }, []);
};


}());

