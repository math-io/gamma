'use strict';

// MODULES //

var test = require( 'tape' );
var incrspace = require( 'compute-incrspace' );
var abs = require( 'math-abs' );
var gamma = require( './../lib' );


// FIXTURES //

// var data = require( './fixtures/data.json' );
// var expected = require( './fixtures/expected.json' );


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

test( 'if `x < 170.56749...`, the function returns positive infinity', function test( t ) {
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
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	// TODO: more `x` to cover various branches

	x = [
		4.9790119248836735e+00,
		7.7388724745781045e+00,
		-2.7688005719200159e-01,
		-5.0106036182710749e+00,
		9.6362937071984173e+00,
		2.9263772392439646e+00,
		5.2290834314593066e+00,
		2.7279399104360102e+00,
		1.8253080916808550e+00,
		-8.6859247685756013e+00
	];

	// The expected results below were computed by the high precision calculators at http://keisan.casio.com/
	expected = [
		2.3254348370739963835386613898e+01,
		2.991153837155317076427529816e+03,
		-4.561154336726758060575129109e+00,
		7.719403468842639065959210984e-01,
		1.6111876618855418534325755566e+05,
		1.8706575145216421164173224946e+00,
		3.4082787447257502836734201635e+01,
		1.579733951448952054898583387e+00,
		9.3834586598354592860187267089e-01,
		-2.093995902923148389186189429e-05
	];

	for ( i = 0; i < x.length; i++ ) {
		v = gamma( x[ i ] );
		delta = abs( v - expected[ i ] );
		if ( v < 1e5 ) {
			tol = 1e-14;
		} else {
			tol = 1e-9;
		}
		t.ok( delta < tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '.' );
	}
	t.end();
});

test( 'if provided a positive integer, the function returns the factorial of (n-1)', function test( t ) {
	t.equal( gamma( 4 ), 6, 'returns 6' );
	t.equal( gamma( 5 ), 24, 'returns 24' );
	t.equal( gamma( 6 ), 120, 'returns 120' );
	t.end();
});
