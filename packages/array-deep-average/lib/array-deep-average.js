'use strict';

function arrayDeepAverage( ...params ) {
	function gatherAverage( ...p ) {
		const obj = { sum: 0, count: 0 };

		for ( let i = 0; i < p.length; i++ ) {
			const data = p[ i ];

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
