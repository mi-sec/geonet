'use strict';

const generateRasterFootprint = require( '..' );
const { promises: fs }        = require( 'fs' );
const { expect }              = require( 'chai' );
const path                    = require( 'path' );

describe( '@geonet/generate-raster-footprint', () => {
	const fpath = path.join( __dirname, './sample-nodata.tif' );

	it( 'should generate a geojson footprint of a specified raster', async () => {
		const geojsonNoBuffer         = await generateRasterFootprint( fpath, 1, 4, 0 );
		const geojsonNoBufferExpected = JSON.parse(
			await fs.readFile( path.join( __dirname, './sample-nodata-nobuffer.geojson' ), 'utf-8' )
		);

		expect( geojsonNoBuffer ).to.deep.eq( geojsonNoBufferExpected );
	} );

	it( 'should generate a low precision buffered geojson footprint of a specified raster', async () => {
		const geojsonLowPrecisionBuffer         = await generateRasterFootprint( fpath, 1, 4, 1.1 );
		const geojsonLowPrecisionBufferExpected = JSON.parse(
			await fs.readFile( path.join( __dirname, './sample-nodata-low-precision-buffer.geojson' ), 'utf-8' )
		);

		expect( geojsonLowPrecisionBuffer ).to.deep.eq( geojsonLowPrecisionBufferExpected );
	} );
} );
