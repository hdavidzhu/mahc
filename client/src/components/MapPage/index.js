import React from 'react';

import { findDOMNode } from 'react-dom';
import axios from 'axios';
import OpenLayer from 'openlayers/dist/ol-debug.js';

import './index.css';
// import Map from '../Map';

export default class MapPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.renderMap();
  }

  componentDidUpdate() {
    this.renderMap();
  }

  render() {
    return (
      <div id="my-map" ref="myMap"></div>
    );
  }

  renderMap() {

    // Clear old maps.
    while (this.refs.myMap.firstChild) {
      this.refs.myMap.removeChild(this.refs.myMap.firstChild);
    }

    // TODO: Refactor into a better location.
    var map = new OpenLayer.Map({
      layers: [
        new OpenLayer.layer.Tile({
          source: new OpenLayer.source.OSM()
        })
      ],
      target: this.refs.myMap,
      controls: OpenLayer.control.defaults({
        attributionOptions: ({
          collapsible: false
        })
      }),
      view: new OpenLayer.View()
    });

    axios
      .get('/house_5.json')
      .then(function(response) {
        const geoJSONData = response.data;

        var vectorSource = new OpenLayer.source.Vector({
          features: (new OpenLayer.format.GeoJSON()).readFeatures(geoJSONData)
        });

        var vectorLayer = new OpenLayer.layer.Vector({
          source: vectorSource
        });

        map.addLayer(vectorLayer);

        var extent = vectorSource.getExtent();
        map.getView().fit(extent, map.getSize());
      })
      .then(() => axios.get('/api/communities'))
      .then((res) => {
        const communities = res.data;

        var vectorSource = new OpenLayer.source.Vector({});
        var locationLayer = new OpenLayer.layer.Vector({
          source: vectorSource
        });

        const features = communities.map((community) => {
          return new OpenLayer.Feature({
            geometry: (new OpenLayer.geom.Point([community.longitude, community.latitude])).transform('EPSG:4326', 'EPSG:3857')
          });
        });

        vectorSource.addFeatures(features);
        map.addLayer(locationLayer);
      });
  }
}
