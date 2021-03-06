'use strict';

// MODULES //

var tape = require( 'tape' );
var incrspace = require( 'compute-incrspace' );
var abs = require( 'math-abs' );
var PINF = require( 'const-pinf-float64' );
var NINF = require( 'const-ninf-float64' );
var gamma = require( './../lib' );


// FIXTURES //

var data1 = require( './fixtures/data1.json' );
var expected1 = require( './fixtures/expected1.json' );
var data2 = require( './fixtures/data2.json' );
var expected2 = require( './fixtures/expected2.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof gamma === 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided a negative integer, the function returns `NaN`', function test( t ) {
	var values = incrspace( -1, -1000, -1 );
	var v;
	var i;

	for ( i = 0; i < values.length; i++ ) {
		v = gamma( values[ i ] );
		t.ok( v !== v, 'returns NaN when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'if provided negative infinity, the function returns `NaN`', function test( t ) {
	var v = gamma( NINF );
	t.ok( v !== v, 'returns NaN when provided negative infinity' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var v = gamma( NaN );
	t.ok( v !== v, 'returns NaN when provided a NaN' );
	t.end();
});

tape( 'if provided `-0`, the function returns negative infinity', function test( t ) {
	var v = gamma( -0 );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided `+0`, the function returns positive infinity', function test( t ) {
	var v = gamma( 0 );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'if `x > 171.6144...`, the function returns positive infinity', function test( t ) {
	var values = incrspace( 172, 1000, 10.1234 );
	var v;
	var i;

	for ( i = 0; i < values.length; i++ ) {
		v = gamma( values[ i ] );
		t.equal( v, PINF, 'returns +infinity when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'if `x < -170.56749...`, the function returns positive infinity', function test( t ) {
	var values = incrspace( -170.57, -1000, -10.1234 );
	var v;
	var i;

	for ( i = 0; i < values.length; i++ ) {
		v = gamma( values[ i ] );
		t.equal( v, PINF, 'returns +infinity when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'the function evaluates the gamma function (positive integers)', function test( t ) {
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

tape( 'the function evaluates the gamma function (decimal values)', function test( t ) {
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

tape( 'if provided a positive integer, the function returns the factorial of (n-1)', function test( t ) {
	t.equal( gamma( 4 ), 6, 'returns 6' );
	t.equal( gamma( 5 ), 24, 'returns 24' );
	t.equal( gamma( 6 ), 120, 'returns 120' );
	t.end();
});

tape( 'the function uses a small value approximation near left boundaries (abs(x)<33)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;

	x = -20.99999999999999;
	v = gamma( x );

	expected = -1.8364310433257593e-6;

	delta = abs( v - expected );
	tol = 1e-14;

	t.ok( delta < tol, 'within tolerance. x: ' + x + '. Value: ' + v + '. Expected: ' + expected + '. Tolerance: ' + tol + '.' );

	t.end();
});

tape( 'the function uses a small value approximation near right boundaries (abs(x)<33)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;

	x = -20.00000000000001;
	v = gamma( x );

	expected = -3.856505190983844e-5;

	delta = abs( v - expected );
	tol = 1e-14;

	t.ok( delta < tol, 'within tolerance. x: ' + x + '. Value: ' + v + '. Expected: ' + expected + '. Tolerance: ' + tol + '.' );

	t.end();
});
