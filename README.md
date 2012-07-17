# fuzzy

Fuzzy search / fuzzy filter function for javascript a la Textmate or Sublime Text's fuzzy file search.

Feel free to use now, but beware that breaking changes are imminent.

## Getting Started
Install the module with: `npm install fuzzy`

```javascript
var list = ['baconing', 'narwhal', 'a mighty bear canoe'];
var template = '<{{char}}>';
fuzzy.filter('bcn', list, template)
// [
//   {string: '<b>a<c>o<n>ing',          index: 0, original: 'baconing'},
//   {string: 'a mighty <b>ear <c>a<n>oe', index: 2, original: 'a mighty bear canoe'}
// ]
```

## Documentation
_(Coming soon... probably)_

## Examples
Check the examples directory

## Contributing
Fork the repo!

    git clone <your_fork>
    cd fuzzy
    npm install -d
    make

Add unit tests for any new or changed functionality. Lint, test, and minify using make, then shoot me a pull request.

## Release History
Super Alpha Beta Zeta Tau. More greek letters than you know = not ready for prime time. Don't use this.

## License
Copyright (c) 2012 Matt York
Licensed under the MIT license.

## TODO

- Simplify. Remove the earlier stuff
- Change template interface to make more sense
- Get docco style documentation
- Fix up directors example. Add movies, make it fast
- Add .editorconfig
- Get benchmarks up
- Get benchmarks running in the browser
- Compare benchmarks of my template impl with filter2 to npm fuzzy-filter
- Compare performance using my own position function to the regex function
- Optimize! Paging, maybe? Web Workers? Async w/callbacks?
- Google Closurify
