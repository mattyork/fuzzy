all: fuzzy.js

fuzzy.js: lint test build

test:
	@./node_modules/.bin/mocha

build:
	@./node_modules/.bin/uglifyjs lib/fuzzy.js >fuzzy-min.js

clean:
	rm fuzzy-min.js

.PHONY: all fuzzy.js lint test build
