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

// If `pattern` matches `string`, wrap each matching character
// in `opts.pre` and `opts.post`. If no match, return null
fuzzy.match = function(pattern, string, opts) {
  opts = opts || {};
  var patternIdx = 0
    , result = []
    , len = string.length
    , totalScore = 0
    , currScore = 0
    // prefix
    , pre = opts.pre || ''
    // suffix
    , post = opts.post || ''
    // String to compare against. This might be a lowercase version of the
    // raw string
    , compareString =  opts.caseSensitive && string || string.toLowerCase()
    , ch, compareChar;

  pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

  var patternCache = fuzzy.traverse(compareString, pattern, 0, 0, []);
  if(!patternCache) {
    return null;
  }

  return {rendered: fuzzy.render(string, patternCache.cache, pre, post), score: patternCache.score};
};

fuzzy.traverse = function(string, pattern, stringIndex, patternIndex, patternCache) {

  // if the pattern search at end
  if(pattern.length === patternIndex) {

    // calculate score and copy the cache containing the indices where it's found
    return {score : fuzzy.calculateScore(patternCache), cache : patternCache.slice()};
  }

  // if string at end or remaining pattern > remaining string
  if(string.length === stringIndex || pattern.length - patternIndex > string.length - stringIndex) {
    return null;
  }

  var c = pattern[patternIndex];
  var index = string.indexOf(c, stringIndex);
  var best, temp;

  while(index > -1) {
    patternCache.push(index);
    temp = fuzzy.traverse(string, pattern, index+1, patternIndex+1, patternCache);
    patternCache.pop();

    // if downstream traversal failed, return best answer so far
    if(!temp) {
      return best;
    }

    if(!best || best.score < temp.score) {
      best = temp;
    }

    index = string.indexOf(c, index+1);
  }

  return best;
};

fuzzy.calculateScore = function(patternCache) {
  var score = 0;
  var temp = 1;
  patternCache.forEach(function(index, i) {
    if(i > 0) {
      if(patternCache[i-1] + 1 === index) {
        temp += temp + 1;
      } else {
        temp = 1;
      }
    }

    score += temp;
  });
  return score;
};

fuzzy.render = function(string, indices, pre, post) {
  var rendered = string.substring(0, indices[0]);
  indices.forEach(function(index, i) {
    rendered += pre + string[index] + post +
      string.substring(index + 1, (indices[i+1]) ? indices[i+1] : string.length);
  });
  return rendered;
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
//        // Optional function. Input is an entry in the given arr`,
//        // output should be the string to test `pattern` against.
//        // In this example, if `arr = [{crying: 'koala'}]` we would return
//        // 'koala'.
//      , extract: function(arg) { return arg.crying; }
//    }
fuzzy.filter = function(pattern, arr, opts) {
  opts = opts || {};
  return arr
    .reduce(function(prev, element, idx, arr) {
      var str = element;
      if(opts.extract) {
        str = opts.extract(element);

        if(!str) { // take care of undefineds / nulls / etc.
          str = '';
        }
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

