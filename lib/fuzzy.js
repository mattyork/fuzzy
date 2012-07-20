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

// Return all elements of `array` that have a fuzzy
// match against `pattern`.
fuzzy.simpleFilter = function(pattern, array) {
  return array.filter(function(string) {
    return fuzzy.test(pattern, string);
  });
};

// Does `pattern` fuzzy match `str`?
fuzzy.test = function(pattern, string) {
  return fuzzy.match(pattern, string) !== null;
};

// If `pattern` matches `string`, wrap render the `template` against each
// matching character. `template` should have {{char}} as the matching
// character (though you don't have to include the {{char}} if you want
// to get rid of the matching character)
fuzzy.match = function(pattern, string, opts) {
  var pos = 0
    , result = []
    , len = string.length
    , totalScore = 0
    , currScore = 0
    , pre = opts && opts.pre || ''
    , post = opts && opts.post || ''
    , caseSens = opts && opts.caseSensitive
    , compareString =  caseSens && string || string.toLowerCase()
    , ch, compareChar;

  pattern = caseSens && pattern || pattern.toLowerCase();

  // For each character in the string, either add it to the result
  // or wrap in template if its the next string in the pattern
  for(var i = 0; i < len; i++) {
    ch = string[i];
    if(compareString[i] === pattern[pos]) {
      ch = pre + ch + post;
      pos += 1;
      currScore += 1 + currScore;
    } else {
      currScore = 0;
    }
    totalScore += currScore;
    result[result.length] = ch;
  }

  // return rendered string if we have a match for every char
  if(pos === pattern.length) {
    return {rendered: result.join(''), score: totalScore};
  }

  return null;
};

// The normal entry point. Filters `arr` for matches against `pattern`.
// It returns an array with matching values of the type:
//
//     [{
//         string:   '<b>lah' // The rendered string
//       , index:    2        // The index of the element in `arr`
//       , original: 'blah'   // The original element in `arr`
//     }]
//
// `opts` is an optional argument bag. Details:
//
//    opts = {
//        // string to put before a matching character
//        pre:     '<b>'
//
//        // string to put after matching character
//      , post:    '</b>'
//
//        // Optional function. Input is an element from the passed in
//        // `arr`, output should be the string to test `pattern` against.
//        // In this example, if `arr = [{crying: 'koala'}]` we would return
//        // 'koala'.
//      , extract: function(arg) { return arg.crying; }
//    }
fuzzy.filter = function(pattern, arr, opts) {
  var extract = opts && opts.extract || function(el) {
    return el;
  };

  return arr
          .reduce(function(prev, element, idx, arr) {
            var str = extract(element);
            var rendered = fuzzy.match(pattern, str, opts);
            if(rendered != null) {
              prev[prev.length] = {
                  string: rendered.rendered
                , score: rendered.score
                , index: idx
                , original: element
              };
            }
            return prev;
          }, [])
          // Sort by score. Browsers are inconsistent wrt stable/unstable
          // sorting, so force stable by using the index in the case of tie.
          // See http://ofb.net/~sethml/is-sort-stable.html
          .sort(function(a,b) {
            var compare = b.score - a.score;
            if(compare) return compare;
            return a.index - b.index;
          });
};


}());

