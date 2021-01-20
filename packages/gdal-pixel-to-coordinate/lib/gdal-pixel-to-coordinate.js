'use strict';

/**
 * gdalPixelToCoordinate
 * @description
 * returns the earth coordinates of a specific pixel
 * @param {*} ds - gdal dataset, assumed to be opened
 * @param {number} col - column index of pixel
 * @param {number} row - row index of pixel
 * @returns {*[]} - earth coordinates in an array (lng, lat)
 */
function gdalPixelToCoordinate( ds, col, row ) {
	const [ c, a, b, f, d, e ] = ds.geoTransform;

	const xp = ( a * col ) + ( b * row ) + ( a * 0.5 ) + ( b * 0.5 ) + c;
	const yp = ( d * col ) + ( e * row ) + ( d * 0.5 ) + ( e * 0.5 ) + f;
	return [ xp, yp ];
}

module.exports = gdalPixelToCoordinate;
