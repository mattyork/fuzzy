all: fuzzy.js

fuzzy.js: lint

lint:
	@jshint lib test

test:
	@mocha
