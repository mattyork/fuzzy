all: fuzzy.js

fuzzy.js: lint test

lint:
	@jshint lib test

test:
	@mocha

.PHONY: all fuzzy.js lint test
