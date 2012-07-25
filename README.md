# fuzzy

1k standalone fuzzy search / fuzzy filter for javascript a la Textmate and Sublime Text's command-T fuzzy file search.

## Getting Started
Install with: `npm install fuzzy`

Very basic usage:

Padawan: Simply filter the array of strings.

```javascript
var list = ['baconing', 'narwhal', 'a mighty bear canoe'];
var results = fuzzy.filter('bcn', list)
var matches = results.map(function(el) { return el.string; });
console.log(matches);
// [ 'baconing', 'a mighty bear canoe' ]
```

Jedi: Wrap each matching character with given strings

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

## Examples
Check out the html files in the examples directory

## Contributing
Fork the repo!

    git clone <your_fork>
    cd fuzzy
    npm install -d
    make

Add unit tests for any new or changed functionality. Lint, test, and minify using make, then shoot me a pull request.

## Release History
v0.1.0 - July 25, 2012

## License
Copyright (c) 2012 Matt York
Licensed under the MIT license.
