/*
 * Fuzzy
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */

(function() {

var root = this;

var fuzzy = {};

// Use in node or in browser
if (typeof exports !== 'undefined') {
  module.exports = fuzzy;
} else {
  root.fuzzy = fuzzy;
}

// prefix & suffix for score calculation
// need this in order to split matching & scoring in two phases
var PREFIX = '<';
var SUFFIX = '>';

var calculateScore = function(string) {
  return string.split(PREFIX).length - 1 + (string.split(SUFFIX + PREFIX).length - 1) * 10;
};

var recursiveMatch = function(pattern, string, compareString) {
  if (pattern.length === 0 || string.length === 0 || pattern.length > string.length) {
    return [string];
  }

  var result = [];

  for(var idx = 0; idx < string.length; idx++) {
    if (pattern[0] === compareString[idx]) {
      var ch = PREFIX + string[idx] + SUFFIX;

      var arr = recursiveMatch(pattern.slice(1), string.slice(idx + 1), compareString.slice(idx + 1));

      arr = arr.map(function(str){
        return string.slice(0, idx) + ch + str;
      });

      result[result.length] = arr;
    }
  }

  return [].concat.apply([], result); // flatten
};

// Return all elements of `array` that have a fuzzy
// match against `pattern`.
fuzzy.simpleFilter = function(pattern, array) {
  return array.filter(function(string) {
    return fuzzy.test(pattern, string);
  });
};

// Does `pattern` fuzzy match `string`?
fuzzy.test = function(pattern, string) {
  return fuzzy.match(pattern, string) !== null;
};

fuzzy.match = function(pattern, string, opts) {
  opts = opts || {};

  /**
    pre - prefix
    post - suffix
    compareString - String to compare against. This might be a
      lowercase version of the raw string
  **/
  var pre = opts.pre || ''
    , post = opts.post || ''
    , compareString = opts.caseSensitive && string || string.toLowerCase();

  pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

  var result = recursiveMatch(pattern, string, compareString)
    .filter(function(el) {
      return el.split(PREFIX).length - 1 === pattern.length;
    });

  if (result.length === 0) {
    return null;
  }

  return result
    .map(function(el) {
      return {
        rendered: el.split(PREFIX).join(pre).split(SUFFIX).join(post),
        score: calculateScore(el),
      };
    })

    .reduce(function(prev, next) {
      return prev.score > next.score ? prev : next;
    });
}

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
//        // Optional function. Input is an entry in the given arr`,
//        // output should be the string to test `pattern` against.
//        // In this example, if `arr = [{crying: 'koala'}]` we would return
//        // 'koala'.
//      , extract: function(arg) { return arg.crying; }
//    }
fuzzy.filter = function(pattern, arr, opts) {
  if(!arr || arr.length === 0) {
    return []
  }
  if (typeof pattern !== 'string') {
    return arr
  }
  opts = opts || {};
  return arr
    .reduce(function(prev, element, idx, arr) {
      var str = element;
      if(opts.extract) {
        str = opts.extract(element);
      }
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
