var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'my-map',
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  view: new ol.View()
});

axios
  .get('/house_5.json')
  .then(function(response) {
    const geoJSONData = response.data;

    var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(geoJSONData)
    });

    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    map.addLayer(vectorLayer);

    var extent = vectorSource.getExtent();
    map.getView().fit(extent, map.getSize());
  })
  .then(() => axios.get('/api/communities'))
  .then((res) => {
    communities = res.data;
    console.log(communities);

    var vectorSource = new ol.source.Vector({});
    var locationLayer = new ol.layer.Vector({
      source: vectorSource
    });

    features = communities.map((community) => {
      return new ol.Feature({
        geometry: (new ol.geom.Point([community.longitude, community.latitude])).transform('EPSG:4326', 'EPSG:3857')
      });
    });

    vectorSource.addFeatures(features);
    map.addLayer(locationLayer);
  });
