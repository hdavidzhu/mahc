axios.get('/files/house_5.json').then(function(response) {
  const geoJSONData = response.data;

  var vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geoJSONData)
  });

  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ],
    target: 'my-map',
    controls: ol.control.defaults({
      attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
        collapsible: false
      })
    }),
    view: new ol.View()
  });
  var extent = vectorSource.getExtent();
  map.getView().fit(extent, map.getSize());
});
