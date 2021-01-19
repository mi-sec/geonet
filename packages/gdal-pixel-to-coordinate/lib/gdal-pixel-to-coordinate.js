'use strict';

function gdalPixelToCoordinate( ds, col, row ) {
	const [ c, a, b, f, d, e ] = ds.geoTransform;

	const xp = ( a * col ) + ( b * row ) + ( a * 0.5 ) + ( b * 0.5 ) + c;
	const yp = ( d * col ) + ( e * row ) + ( d * 0.5 ) + ( e * 0.5 ) + f;
	return [ xp, yp ];
}

module.exports = gdalPixelToCoordinate;
