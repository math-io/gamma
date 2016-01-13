'use strict';

var linspace = require( 'compute-linspace' );
var gamma = require( './../lib' );

var x = linspace( -10, 10, 100 );
var v;
var i;

for ( i = 0; i < x.length; i++ ) {
	v = gamma( x[ i ] );
	console.log( 'x: %d, f(x): %d', x[ i ], v );
}
