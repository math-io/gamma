'use strict';

// MODULES //

var test = require( 'tape' );
var incrspace = require( 'compute-incrspace' );
var abs = require( 'math-abs' );
var PINF = require( 'const-pinf-float64' );
var NINF = require( 'const-ninf-float64' );
var gamma = require( 'gamma' );


// FIXTURES //

var data1 = require( './../fixtures/data1.json' );
var expected1 = require( './../fixtures/expected1.json' );
var data2 = require( './../fixtures/data2.json' );
var expected2 = require( './../fixtures/expected2.json' );


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
	var v = gamma( NINF );
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
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

test( 'if provided `+0`, the function returns positive infinity', function test( t ) {
	var v = gamma( 0 );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

test( 'if `x > 171.6144...`, the function returns positive infinity', function test( t ) {
	var values = incrspace( 172, 1000, 10.1234 );
	var v;
	var i;

	for ( i = 0; i < values.length; i++ ) {
		v = gamma( values[ i ] );
		t.equal( v, PINF, 'returns +infinity when provided ' + values[ i ] );
	}
	t.end();
});

test( 'if `x < -170.56749...`, the function returns positive infinity', function test( t ) {
	var values = incrspace( -170.57, -1000, -10.1234 );
	var v;
	var i;

	for ( i = 0; i < values.length; i++ ) {
		v = gamma( values[ i ] );
		t.equal( v, PINF, 'returns +infinity when provided ' + values[ i ] );
	}
	t.end();
});

test( 'the function evaluates the gamma function (positive integers)', function test( t ) {
	var delta;
	var tol;
	var v;
	var i;

	for ( i = 0; i < data1.length; i++ ) {
		v = gamma( data1[ i ] );
		delta = abs( v - expected1[ i ] );
		tol = 2.75e-12 * Math.max( 1, abs( v ), abs( expected1[ i ] ) );
		t.ok( delta <= tol, 'within tolerance. x: ' + data1[ i ] + '. Value: ' + v + '. Expected: ' + expected1[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

test( 'the function evaluates the gamma function (decimal values)', function test( t ) {
	var delta;
	var tol;
	var v;
	var i;

	for ( i = 0; i < data2.length; i++ ) {
		v = gamma( data2[ i ] );
		delta = abs( v - expected2[ i ] );
		tol = 2.75e-12 * Math.max( 1, abs( v ), abs( expected2[ i ] ) );
		t.ok( delta <= tol, 'within tolerance. x: ' + data2[ i ] + '. Value: ' + v + '. Expected: ' + expected2[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

test( 'if provided a positive integer, the function returns the factorial of (n-1)', function test( t ) {
	t.equal( gamma( 4 ), 6, 'returns 6' );
	t.equal( gamma( 5 ), 24, 'returns 24' );
	t.equal( gamma( 6 ), 120, 'returns 120' );
	t.end();
});
