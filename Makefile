all: fuzzy.js

fuzzy.js: lint test

lint:
	@jshint lib test examples \
	&& echo "  ✔\033[32m passed jshint, yo! \033[0m"

test:
	@mocha

.PHONY: all fuzzy.js lint test
