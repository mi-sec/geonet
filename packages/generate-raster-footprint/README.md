# `@geonet/generate-raster-footprint`

> Generate GeoJSON footprint for a given raster

## Usage

```
const path                    = require( 'path' );
const generateRasterFootprint = require( '@geonet/generate-raster-footprint' );

const fpath            = path.join( __dirname, './sample.tif' );
const geojsonFootprint = await generateRasterFootprint( fpath, 1, 4, 0 );
```
