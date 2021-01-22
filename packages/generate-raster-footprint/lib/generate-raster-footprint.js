'use strict';

const path                         = require( 'path' );
const gdal                         = require( 'gdal-next' );
const geojsonRewind                = require( '@mapbox/geojson-rewind' );
const gdalPixelToCoordinate        = require( '@geonet/gdal-pixel-to-coordinate' );
const arrayDeepAverage             = require( '@geonet/array-deep-average' );
const turfHelpers                  = require( '@turf/helpers' );
const turfTransformScale           = require( '@turf/transform-scale' );
const { default: turfBboxPolygon } = require( '@turf/bbox-polygon' );
const { default: turfUnion }       = require( '@turf/union' );

// TODO::: determine blockSize based on pixel resolution
/**
 * generateRasterFootprint
 * @description
 * Generate GeoJSON footprint for a given raster
 * @param {string} fpath
 * path to file
 * @param {number} [fband=1]
 * band to create a footprint of (typically 1)
 * @param {number} [fblockSize=1024]
 * block size to average and evaluate against the noDataValue
 * for example `1024` would be the average of a 1024 pixel block; if the block average is equal to the `noDataValue`,
 * the area is not added to the footprint overview
 * @param {number} [transformScaleBuffer=0]
 * sometimes footprints have lines that should be merged, but precision float errors prevent it
 * optionally transform scale a buffer around each assessed pixel block to prevent merge issues
 * scale of `1.0001` to `1.1` is recommended. see http://turfjs.org/docs/#transformScale for more info
 * @returns {Promise<object>} - footprint returned in a feature collection
 */
async function generateRasterFootprint( fpath, fband = 1, fblockSize = 1024, transformScaleBuffer = 0 ) {
	fpath         = path.resolve( fpath );
	const dataset = await gdal.openAsync( fpath );
	const band    = dataset.bands.get( fband );

	let feature     = null;
	const blockSize = fblockSize;
	for (
		let x = 0, y = 0, nextTick = false, done = false;
		!done;
		nextTick ? ( x = 0, nextTick = false ) : x += blockSize
	) {
		if ( y >= band.size.y - blockSize - 1 && x >= band.size.x - blockSize - 1 ) {
			done = true;
		}

		if ( x >= band.size.x - blockSize ) {
			x        = band.size.x - blockSize;
			nextTick = true;
		}

		if ( y >= band.size.y - blockSize ) {
			y = band.size.y - blockSize;
		}

		const data = new Float32Array( Buffer.allocUnsafe( blockSize * blockSize ) );
		band.pixels.read( x, y, blockSize, blockSize, data );

		const average = arrayDeepAverage( data );

		if ( average !== band.noDataValue ) {
			let poly = turfBboxPolygon( [
				...gdalPixelToCoordinate( dataset, x, y ),
				...gdalPixelToCoordinate( dataset, x + blockSize, y + blockSize )
			] );

			try {
				if ( transformScaleBuffer ) {
					// slightly increase polygon scale to correct high precision
					// errors so the polygon union happens properly
					poly = turfTransformScale( poly, transformScaleBuffer );
				}

				feature = !feature ? poly : turfUnion( feature, poly );
			}
			catch ( e ) {
				console.error( 'Error on', fpath, e );
			}
		}

		if ( nextTick ) {
			x = 0;
			y += blockSize;
		}
	}

	feature = geojsonRewind( feature );

	return turfHelpers.featureCollection( [ feature ] );
}

module.exports = generateRasterFootprint;
