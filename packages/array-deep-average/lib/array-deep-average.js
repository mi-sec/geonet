'use strict';

function arrayDeepAverage( ...params ) {
	function gatherAverage( ...p ) {
		const obj = { sum: 0, count: 0 };

		for ( let i = 0; i < p.length; i++ ) {
			const data = p[ i ];

			if ( Array.isArray( data ) ) {
				for ( let i = 0; i < data.length; i++ ) {
					const a = gatherAverage( data[ i ] );
					obj.sum += a.sum;
					obj.count += a.count;
				}
			}
			else {
				obj.sum += data;
				obj.count++;
			}
		}

		return obj;
	}

	const result = gatherAverage( params );
	return result.sum / result.count;
}

module.exports = arrayDeepAverage;
