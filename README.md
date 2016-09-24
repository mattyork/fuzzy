# fuzzy

1k standalone fuzzy search / fuzzy filter a la Sublime Text's command-p fuzzy file search. Works in both node and browser.

[![Example](http://i.imgur.com/18qZ9kZ.png)](http://htmlpreview.github.io/?https://github.com/mattyork/fuzzy/blob/master/examples/disney.html)

[Try it out!](http://htmlpreview.github.io/?https://github.com/mattyork/fuzzy/blob/master/examples/disney.html)

## Get it

Node:

```bash
$ npm install --save fuzzy
$ node
> var fuzzy = require('fuzzy');
> console.log(fuzzy)
{ test: [Function],
  match: [Function],
  filter: [Function] }
```

Browser:

```html
<script src="/path/to/fuzzy.js"></script>
<script>
  console.log(fuzzy);
  // Object >
  //   filter: function (pattern, arr, opts) {
  //   match: function (pattern, string, opts) {
  //   test: function (pattern, string) {
</script>
```

## Use it

Padawan: Simply filter an array of strings.

```javascript
var list = ['baconing', 'narwhal', 'a mighty bear canoe'];
var results = fuzzy.filter('bcn', list)
var matches = results.map(function(el) { return el.string; });
console.log(matches);
// [ 'baconing', 'a mighty bear canoe' ]
```

Jedi: Wrap matching characters in each string

```javascript
var list = ['baconing', 'narwhal', 'a mighty bear canoe'];
var options = { pre: '<', post: '>' };
var results = fuzzy.filter('bcn', list, options)
console.log(results);
// [
//   {string: '<b>a<c>o<n>ing'           , index: 0, score: 3, original: 'baconing'},
//   {string: 'a mighty <b>ear <c>a<n>oe', index: 2, score: 3, original: 'a mighty bear canoe'}
// ]
```

Jedi Master: sometimes the array you give is not an array of strings. You can
pass in a function that creates the string to match against from each element
in the given array

```javascript
var list = [
    {rompalu: 'baconing', zibbity: 'simba'}
  , {rompalu: 'narwhal' , zibbity: 'mufasa'}
  , {rompalu: 'a mighty bear canoe', zibbity: 'saddam hussein'}
];
var options = {
    pre: '<'
  , post: '>'
  , extract: function(el) { return el.rompalu; }
};
var results = fuzzy.filter('bcn', list, options);
var matches = results.map(function(el) { return el.string; });
console.log(matches);
// [ '<b>a<c>o<n>ing', 'a mighty <b>ear <c>a<n>oe' ]
```

Chewbacca: sometimes you don't want to get unsafely wrapped html structures,
and you'd rather do it yourself later. Prepending and appending strings is
cool until you use React and don't want XSS. You can tell fuzzy.js to return
small 'match info' objects to suit your needs better.

```javascript
var list = ['rey', 'kylo ren', 'finn'];
var options = { returnMatchInfo: true };
var results = fuzzy.filter('ren', list, options);
console.log(results);
// [ { string:
//      [ {match: true, char: 'r'},
//        {match: true, char: 'e'},
//        {match: false, char: 'y'} ],
//     score: 4,
//     index: 0,
//     original: 'rey' },
//   { string:
//      [ {match: false, char: 'k'},
//        {match: false, char: 'y'},
//        {match: false, char: 'l'},
//        {match: false, char: 'o'},
//        {match: false, char: ' '},
//        {match: true,  char: 'r'},
//        {match: true,  char: 'e'},
//        {match: false, char: 'n'} ],
//     score: 4,
//     index: 1,
//     original: 'kylo ren' } ]
```

## Examples
Check out the html files in the [examples](https://github.com/mattyork/fuzzy/tree/master/examples) directory.

[Try it here.](http://htmlpreview.github.io/?https://github.com/mattyork/fuzzy/blob/master/examples/disney.html)

## Documentation
[Code is well documented](https://github.com/mattyork/fuzzy/blob/master/lib/fuzzy.js) and the [unit tests](https://github.com/mattyork/fuzzy/blob/master/test/fuzzy.test.js) cover all functionality

## Contributing
Fork the repo!

    git clone <your_fork>
    cd fuzzy
    npm install
    make

Add unit tests for any new or changed functionality. Lint, test, and minify using make, then shoot me a pull request.

## Release History
v0.1.0 - July 25, 2012

* Initial Release

v0.1.1 - September 19, 2015

* Fix broken links in package.json
* Fix examples

## License
Copyright (c) 2015 Matt York
Licensed under the MIT license.

## TODO

1. Search improvement: behave a bit more like sublime text by getting
   the BEST match in a given string, not just the first. For example,
   searching for 'bass' in 'bodacious bass' should match against 'bass',
   but it currently matches like so: `<b>od<a>ciou<s> ba<s>s`. There is
   a test already written, just need to implement it. Naive O(n^2) worst
   case: find every match in the string, then select the highest scoring
   match. Should benchmark this against current implementation once implemented
   Also, "reactive rice" would be `<r><e>active r<i><c>e`
2. Search feature: Work on multiple strings in a match. For example, be able
   to match against 'stth' against an object { folder: 'stuff', file: 'thing' }
3. Async batch updates so the UI doesn't block for huge sets. Or maybe Web Workers?
4. Performance performance performance!
