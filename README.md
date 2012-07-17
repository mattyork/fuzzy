# fuzzy

Fuzzy search function for javascript

## Getting Started
Install the module with: `npm install fuzzy`

```javascript
var list = ['baconing', 'narwhal', 'a mighty bear can'];
var template = '<{{char}}>';
fuzzy.filter('bcn', list, template)
// [
//   {string: '<b>a<c>o<n>ing',          index: 0, original: 'baconing'},
//   {string: 'a mighty <b>ear <c>a<n>', index: 2, original: 'a mighty bear can'}
// ]
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using make

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Matt York
Licensed under the MIT license.

## TODO

- Add algorithms and algorithm choices. Keep file small, though
- Comment the code
- Get docco style documentation
- Get benchmarks up
- Get benchmarks running in the browser
- Compare benchmarks of my template impl with filter2 to npm fuzzy-filter
- Compare performance using my own position function to the regex function
- Optimize! Paging, maybe? Web Workers? Callbacks + async?
- Google Closurify
