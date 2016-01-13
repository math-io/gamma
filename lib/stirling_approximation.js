'use strict';

// MODULES //

var polyval = require( 'compute-polynomial' );
var pow = require( 'math-power' );
var exp = require( 'math-exp' );


// CONSTANTS //

var SQRT2PI = 2.506628274631000502417;
var MAX_STIRLING = 143.01608;
var S = [
	7.87311395793093628397e-04,
	-2.29549961613378126380e-04,
	-2.68132617805781232825e-03,
	3.47222221605458667310e-03,
	8.33333333333482257126e-02
];


// GAMMA //

/**
* FUNCTION: gamma( x )
*	Evaluates the gamma function by using Stirling's formula. The polynomial is valid for 33 <= x <= 172.
*
* @param {Number} x - input value
* @returns {Number} function value
*/
function gamma( x ) {
	var w;
	var y;
	var v;

	w = 1 / x;
	w = 1 + polyval( S, w );
	y = exp( x );

	// Check `x` to avoid `pow()` overflow...
	if ( x > MAX_STIRLING ) {
		v = pow( x, 0.5*x - 0.25 );
		y = v * (v/y);
	} else {
		y = pow( x, x-0.5 ) / y;
	}
	return SQRT2PI * y * w;
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;