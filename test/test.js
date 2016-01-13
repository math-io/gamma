'use strict';

// MODULES //

var test = require( 'tape' );
var incrspace = require( 'compute-incrspace' );
var abs = require( 'math-abs' );
var gamma = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/data.json' );
var expected = require( './fixtures/expected.json' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof gamma === 'function', 'main export is a function' );
	t.end();
});

test( 'if provided a negative integer, the function returns `NaN`', function test( t ) {
	var values = incrspace( -1, -1000, -1 );
	var v;
	var i;

	for ( i = 0; i < values.length; i++ ) {
		v = gamma( values[ i ] );
		t.ok( v !== v, 'returns NaN when provided ' + values[ i ] );
	}
	t.end();
});

test( 'if provided negative infinity, the function returns `NaN`', function test( t ) {
	var v = gamma( Number.NEGATIVE_INFINITY );
	t.ok( v !== v, 'returns NaN when provided negative infinity' );
	t.end();
});

test( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var v = gamma( NaN );
	t.ok( v !== v, 'returns NaN when provided a NaN' );
	t.end();
});

test( 'if provided `-0`, the function returns negative infinity', function test( t ) {
	var v = gamma( -0 );
	t.equal( v, Number.NEGATIVE_INFINITY, 'returns -infinity' );
	t.end();
});

test( 'if provided `+0`, the function returns positive infinity', function test( t ) {
	var v = gamma( 0 );
	t.equal( v, Number.POSITIVE_INFINITY, 'returns +infinity' );
	t.end();
});

test( 'if `x > 171.6144...`, the function returns positive infinity', function test( t ) {
	var values = incrspace( 172, 1000, 10.1234 );
	var v;
	var i;

	for ( i = 0; i < values.length; i++ ) {
		v = gamma( values[ i ] );
		t.equal( v, Number.POSITIVE_INFINITY, 'returns +infinity when provided ' + values[ i ] );
	}
	t.end();
});

test( 'if `x < -170.56749...`, the function returns positive infinity', function test( t ) {
	var values = incrspace( -170.57, -1000, -10.1234 );
	var v;
	var i;

	for ( i = 0; i < values.length; i++ ) {
		v = gamma( values[ i ] );
		t.equal( v, Number.POSITIVE_INFINITY, 'returns +infinity when provided ' + values[ i ] );
	}
	t.end();
});

test( 'the function evaluates the gamma function', function test( t ) {
	var delta;
	var tol;
	var v;
	var i;

	for ( i = 0; i < data.length; i++ ) {
		v = gamma( data[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 1e-14 * Math.max( 1, abs( v ), abs( expected[ i ] ) );
		t.ok( delta <= tol, 'within tolerance. x: ' + data[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

test( 'if provided a positive integer, the function returns the factorial of (n-1)', function test( t ) {
	t.equal( gamma( 4 ), 6, 'returns 6' );
	t.equal( gamma( 5 ), 24, 'returns 24' );
	t.equal( gamma( 6 ), 120, 'returns 120' );
	t.end();
});
