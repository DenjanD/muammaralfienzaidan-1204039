// UTS GIS 1204039
var point = ee.Geometry.Point([107.292, -7.7018]);

var datal8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");

var image = ee.Image(
  datal8
    .filterBounds(point)
    .filterDate("2020-10-01", "2022-10-31")
    .sort("CLOUD_COVER")
    .first()
);

var nir = image.select("B5");
var red = image.select("B4");
var ndvi = nir.subtract(red).divide(nir.add(red)).rename("NDVI");

var ndviParams = { min: -1, max: 1, palette: ["blue", "white", "green"] };
Map.addLayer(ndvi, ndviParams, "NDVI image");
