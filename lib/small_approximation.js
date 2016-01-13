'use strict';

// CONSTANTS //

var EULER = require( 'compute-const-eulergamma' );


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
	return z / ((1 + EULER*x) * x );
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;
