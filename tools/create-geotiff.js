const path = require( 'path' );
const gdal = require( 'gdal-next' );

// https://gdal.org/tutorials/geotransforms_tut.html
// GT(0) x-coordinate of the upper-left corner of the upper-left pixel.
// GT(1) w-e pixel resolution / pixel width.
// GT(2) row rotation (typically zero).
// GT(3) y-coordinate of the upper-left corner of the upper-left pixel.
// GT(4) column rotation (typically zero).
// GT(5) n-s pixel resolution / pixel height (negative value for a north-up image).
//
// Transformation from image coordinate space to georeferenced coordinate space:
// X_geo = GT(0) + X_pixel * GT(1) + Y_line * GT(2)
// Y_geo = GT(3) + X_pixel * GT(4) + Y_line * GT(5)
//
// In case of north up images:
// GT(2), GT(4) coefficients are zero.
// GT(1), GT(5) is the pixel size.
// GT(0), GT(3) position is the top left corner of the top left pixel of the raster.
( async () => {
	const blockSize = 64;
	const w         = blockSize;
	const h         = blockSize;
	const fname     = path.join( __dirname, './sample.tif' );
	const bandcount = 1;
	console.log( [
		`creating: ${ fname }`,
		`size: ${ w } x ${ h } (${ blockSize * blockSize })`,
		`bands: ${ bandcount }`
	].join( '\n' ) );

	const src     = await gdal.openAsync( fname, 'w', 'GTiff', blockSize, blockSize, bandcount, gdal.GDT_Byte );
	const outband = src.bands.get( 1 );
	const buf     = Buffer.alloc( blockSize * blockSize ).fill( 0xFF );

	const data = new Uint8Array( buf );
	outband.pixels.write( 0, 0, blockSize, blockSize, data );

	const bounds = {
		minX: -77.14999794960022,
		maxX: -76.89999997615814,
		minY: 38.80000103940057,
		maxY: 39.0500187220633
	};
	console.log( `bbox: [ ${ bounds.minX }, ${ bounds.minY }, ${ bounds.maxX }, ${ bounds.maxY } ]` );

	const gcps = [
		{ dfGCPPixel: 0, dfGCPLine: 0, dfGCPX: bounds.minX, dfGCPY: bounds.maxY, dfGCPZ: 0 },
		{ dfGCPPixel: 255, dfGCPLine: 0, dfGCPX: bounds.maxX, dfGCPY: bounds.maxY, dfGCPZ: 0 },
		{ dfGCPPixel: 255, dfGCPLine: 255, dfGCPX: bounds.maxX, dfGCPY: bounds.minY, dfGCPZ: 0 },
		{ dfGCPPixel: 0, dfGCPLine: 255, dfGCPX: bounds.minX, dfGCPY: bounds.minY, dfGCPZ: 0 }
	];

	const sDiagonal = new gdal.LineString();
	sDiagonal.points.add( bounds.minX, bounds.minY );
	sDiagonal.points.add( bounds.maxX, bounds.maxY );

	const pixelsAlongDiagonal = Math.sqrt( w * w + h * h );
	const tr                  = sDiagonal.getLength() / pixelsAlongDiagonal;

	// order of these operations matters
	src.setGCPs( gcps );
	src.srs          = gdal.SpatialReference.fromEPSG( 4326 );
	src.geoTransform = [ bounds.minX, tr, 0, bounds.maxY, 0, -tr ];

	const checksum = gdal.checksumImage( outband, 0, 0, blockSize, blockSize );
	console.log( `checksum: 0x${ checksum.toString( 16 ).toUpperCase() }` );

	src.close();
} )();
