'use strict';

/**
* NOTE: the original C code, the long comment, copyright, license, and the constants are from [Cephes]{@link http://netlib.sandia.gov/cephes/cprob/gamma.c}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/**
* tgamma.c
*
* Gamma function
*
*
* SYNOPSIS:
*
*   double x, y, tgamma();
*   extern int signgam;
*
*   y = tgamma( x );
*
*
* DESCRIPTION:
*
*   Returns gamma function of the argument.  The result is correctly signed, and the sign (+1 or -1) is also returned in a global (extern) variable named signgam. This variable is also filled in by the logarithmic gamma function lgamma().
*
*   Arguments |x| <= 34 are reduced by recurrence and the function approximated by a rational function of degree 6/7 in the interval (2,3).
*
*   Large arguments are handled by Stirling's formula.
*
*   Large negative arguments are made positive using a reflection formula.
*
*
* ACCURACY:
*
*                      Relative error:
* arithmetic   domain     # trials      peak         rms
*    DEC      -34, 34      10000       1.3e-16     2.5e-17
*    IEEE    -170,-33      20000       2.3e-15     3.3e-16
*    IEEE     -33,  33     20000       9.4e-16     2.2e-16
*    IEEE      33, 171.6   20000       2.3e-15     3.2e-16
*
* Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
*
*
* COPYRIGHT
*
*   Cephes Math Library Release 2.8:  June, 2000
*   Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
*
* LICENSE
*
*   The readme file at http://netlib.sandia.gov/cephes/ reads:
*      > Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*      > The two known misprints in the book are repaired here in the source listings for the gamma function and the incomplete beta integral.
*
*      > Stephen L. Moshier
*      > moshier@na-net.ornl.gov
*/

// MODULES //

var isNegativeInteger = require( 'validate.io-negative-integer' );
var isnan = require( 'validate.io-nan' );
var abs = require( 'math-abs' );
var floor = require( 'math-floor' );
var sin = require( 'math-sin' );
var evalrational = require( 'math-evalrational' ).factory;
var stirlingApprox = require( './stirling_approximation.js' );
var smallApprox = require( './small_approximation.js' );


// CONSTANTS //

var PINF = Number.POSITIVE_INFINITY;
var NINF = Number.NEGATIVE_INFINITY;
var PI = Math.PI;
var P = [
	9.99999999999999996796e-01,
	4.94214826801497100753e-01,
	2.07448227648435975150e-01,
	4.76367800457137231464e-02,
	1.04213797561761569935e-02,
	1.19135147006586384913e-03,
	1.60119522476751861407e-04,
	0
];
var Q = [
	1.00000000000000000320e+00,
	7.14304917030273074085e-02,
	-2.34591795718243348568e-01,
	3.58236398605498653373e-02,
	1.18139785222060435552e-02,
	-4.45641913851797240494e-03,
	5.39605580493303397842e-04,
	-2.31581873324120129819e-05
];

// FUNCTIONS //

// Compile function to evaluate rational function based on the above coefficients...
var rateval = evalrational( P, Q );


// GAMMA //

/**
* FUNCTION: gamma( x )
*	Evaluates the gamma function.
*
* @param {Number} x - input value
* @returns {Number} function value
*/
function gamma( x ) {
	var sign;
	var q;
	var p;
	var z;
	if (
		isNegativeInteger( x ) ||
		x === NINF ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0 ) {
		// Check for negative zero...
		if ( 1/x < 0 ) {
			return NINF;
		}
		return PINF;
	}
	if (
		x < -170.5674972726612 ||
		x > 171.61447887182298
	) {
		return PINF;
	}
	q = abs( x );
	if ( q > 33 ) {
		if ( x >= 0 ) {
			return stirlingApprox( x );
		}
		p = floor( q );

		// Check whether `x` is even...
		if ( (p&1) === 0 ) {
			sign = -1;
		} else {
			sign = 1;
		}
		z = q - p;
		if ( z > 0.5 ) {
			p += 1;
			z = q - p;
		}
		z = q * sin( PI * z );
		return sign * PI / ( abs(z)*stirlingApprox(q) );
	}
	// Reduce `x`...
	z = 1;
	while ( x >= 3 ) {
		x -= 1;
		z *= x;
	}
	while ( x < 0 ) {
		if ( x > -1e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1;
	}
	while ( x < 2 ) {
		if ( x < 1e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1;
	}
	if ( x === 2 ) {
		return z;
	}
	x -= 2;
	return z * rateval( x );
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;
