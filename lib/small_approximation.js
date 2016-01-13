'use strict';

// CONSTANTS //

var EULER = require( 'compute-const-eulergamma' );
var PINF = Number.POSITIVE_INFINITY;


// GAMMA //

/**
* FUNCTION: gamma( x, z )
*	Computes a small-value approximation.
*
* @param {Number} x - input value
* @param {Number} z
* @returns {Number} approximation
*/
function gamma( x, z ) {
	if ( x === 0 ) {
		return PINF;
	}
	return z / ((1 + EULER*x) * x );
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;
