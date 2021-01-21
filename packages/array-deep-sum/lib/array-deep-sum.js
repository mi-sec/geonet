'use strict';

function arrayDeepSum( ...params ) {
	let n = 0;

	for ( let i = 0; i < params.length; i++ ) {
		const data = params[ i ];

		if ( Array.isArray( data ) ) {
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
