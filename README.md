Gamma Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Gamma][gamma-function] function.

The [gamma function][gamma-function] extends the [factorial function][factorial-function] to [real][real] and [complex][complex] numbers. If `n` is a positive `integer`,

<div class="equation" align="center" data-raw-text="\Gamma ( n ) = (n-1)!" data-equation="eq:gamma_function_positive_integers">
	<img src="https://cdn.rawgit.com/math-io/gamma/b34a280280f619103d048d80a42495219a49be58/docs/img/eqn1.svg" alt="Gamma function for positive intgers.">
	<br>
</div>

Generalized to all complex numbers `z`, except for non-positive integers, the [gamma function][gamma-function] can be expressed as an infinite product

<div class="equation" align="center" data-raw-text="\Gamma ( z ) = \frac{e^{-\gamma z}}{z} \prod^{\infty}_{n=1} \left ( 1+\frac{z}{n}\right )^{-1} e^{z/n}" data-equation="eq:gamma_function_infinite_product">
	<img src="https://cdn.rawgit.com/math-io/gamma/b34a280280f619103d048d80a42495219a49be58/docs/img/eqn2.svg" alt="Gamma function for all complex numbers.">
	<br>
</div>

where `γ ~= 0.577216` is the  [Euler–Mascheroni constant][euler-mascheroni-constant].


## Installation

``` bash
$ npm install math-gamma
```


## Usage

``` javascript
var gamma = require( 'math-gamma' );
```


#### gamma( x )

Evaluates the [gamma function][gamma-function].

``` javascript
var val = gamma( 4 );
// returns 3! = 6

val = gamma( -3/2 );
// returns ~2.363

val = gamma( -1/2 );
// returns ~-3.545

val = gamma( 1/2 );
// returns ~1.772
```


## Examples

``` javascript
var linspace = require( 'compute-linspace' );
var gamma = require( 'math-gamma' );

var x = linspace( -10, 10, 100 );
var v;
var i;

for ( i = 0; i < x.length; i++ ) {
	v = gamma( x[ i ] );
	console.log( 'x: %d, f(x): %d', x[ i ], v );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-gamma.svg
[npm-url]: https://npmjs.org/package/math-gamma

[build-image]: http://img.shields.io/travis/math-io/gamma/master.svg
[build-url]: https://travis-ci.org/math-io/gamma

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/gamma/master.svg
[coverage-url]: https://codecov.io/github/math-io/gamma?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/gamma.svg
[dependencies-url]: https://david-dm.org/math-io/gamma

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/gamma.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/gamma

[github-issues-image]: http://img.shields.io/github/issues/math-io/gamma.svg
[github-issues-url]: https://github.com/math-io/gamma/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[gamma-function]: https://en.wikipedia.org/wiki/Gamma_function
[factorial-function]: https://github.com/math-io/factorial
[real]: https://en.wikipedia.org/wiki/Real_number
[complex]: https://en.wikipedia.org/wiki/Complex_number
[euler-mascheroni-constant]: https://github.com/compute-io/const-eulergamma
