# `@geonet/gdal-pixel-to-coordinate`

> Extract coordinates from a pixel gdal dataset.geoTransform

## Usage

```
const gdal                  = require( 'gdal' );
const gdalPixelToCoordinate = require('@geonet/gdal-pixel-to-coordinate');

const dataset = gdal.open( path.join( __dirname, './sample.tif' ) );
const coords  = gdalPixelToCoordinate( dataset, 0, 0 );
```
