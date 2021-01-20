https://geotiffjs.github.io/
http://app.geotiff.io/

GDAL `gdaltindex`:
```
docker run --rm -v /home/ec2-user/:/home --workdir /home/data/SRTM/SRTM30m/v2.1/ osgeo/gdal:ubuntu-full-latest gdaltindex -t_srs EPSG:4326 index_file.shp `ls data/SRTM/SRTM30m/v2.1/`
```
