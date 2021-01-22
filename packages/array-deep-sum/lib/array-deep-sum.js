'use strict';

/**
 * arrayDeepSum
 * @description
 * add up all values in an array recursively
 * @param {[]|[number]} params - array of numbers (nested or flat)
 * @returns {number} - sum of input
 */
function arrayDeepSum( ...params ) {
	let n = 0;

	for ( let i = 0; i < params.length; i++ ) {
		const data = params[ i ];

		if (
			Array.isArray( data ) ||
			data instanceof Uint8Array ||
			data instanceof Uint8Array ||
			data instanceof Int8Array ||
			data instanceof Int16Array ||
			data instanceof Uint16Array ||
			data instanceof Int32Array ||
			data instanceof Uint32Array ||
			data instanceof Float32Array ||
			data instanceof Float64Array
		) {
			for ( let i = 0; i < data.length; i++ ) {
				n += arrayDeepSum( data[ i ] );
			}
		}
		else {
			n += data;
		}
	}

	return n;
}

module.exports = arrayDeepSum;
