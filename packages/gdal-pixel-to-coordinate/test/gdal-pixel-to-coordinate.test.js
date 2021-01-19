'use strict';

const gdalPixelToCoordinate = require( '..' );
const { assert }            = require( 'chai' );
const path                  = require( 'path' );
const gdal                  = require( 'gdal-next' );

describe( '@geonet/gdal-pixel-to-coordinate', () => {
	let dataset;

	beforeEach( () => {
		dataset = gdal.open( path.join( __dirname, './sample.tif' ) );
	} );

	it( 'should extract coordinate for pixel ( 0, 0 )', () => {
		const bounds = {
			minX: -77.14999794960022,
			maxX: -76.89999997615814,
			minY: 38.80000103940057,
			maxY: 39.0500187220633
		};

		const coords = gdalPixelToCoordinate( dataset, 0, 0 );
		const delta  = 0.01;
		assert.closeTo( coords[ 0 ], bounds.minX, delta );
		assert.closeTo( coords[ 1 ], bounds.maxY, delta );
	} );

	it( 'should extract coordinate for pixel ( 64, 64 )', () => {
		const bounds = {
			minX: -77.14999794960022,
			maxX: -76.89999997615814,
			minY: 38.80000103940057,
			maxY: 39.0500187220633
		};

		const coords = gdalPixelToCoordinate( dataset, 64, 64 );
		const delta  = 0.01;
		assert.closeTo( coords[ 0 ], bounds.maxX, delta );
		assert.closeTo( coords[ 1 ], bounds.minY, delta );
	} );
} );
