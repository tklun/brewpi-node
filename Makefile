MOCHA_OPTS=
REPORTER = nyan

check: test

# test: test-unit  test-acceptance

test: test-unit

test-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

test-acceptance:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--bail \
		test/acceptance/*.js

test-cov: lib-cov
	@BREWPI_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@jscoverage --no-highlight lib lib-cov

benchmark:
	@./support/bench

clean:
	rm -f coverage.html
	rm -fr lib-cov
	rm -fr covershot

.PHONY: test test-unit test-acceptance benchmark clean
