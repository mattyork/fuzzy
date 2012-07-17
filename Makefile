all: fuzzy.js

fuzzy.js: lint test build

lint:
	@jshint lib test examples \
	&& echo "  ✔\033[32m passed jshint, yo! \033[0m"

test:
	@mocha

build:
	@./node_modules/uglify-js/bin/uglifyjs lib/fuzzy.js >fuzzy-min.js

clean:
	rm fuzzy-min.js

.PHONY: all fuzzy.js lint test build
