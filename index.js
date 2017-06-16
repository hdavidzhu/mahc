const mymap = L.map('mapid');

// Load Mapbox
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: 'pk.eyJ1IjoiaGRhdmlkemh1IiwiYSI6ImNqMzh0ODJpZDAydG0yd3RsYTNzcTNtM2EifQ.fBEUuSCxZDSaXab6hRPV5A'
  }).addTo(mymap);

axios.get('/house_2012.json').then(function(response) {
  const geoJSONData = response.data;
  var geojson = L.geoJSON(geoJSONData).addTo(mymap);
  mymap.fitBounds(geojson.getBounds());
});

// var marker = L.marker([51.5, -0.09]).addTo(mymap);
//
// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);
//
// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap);
//
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");
//
// var popup = L.popup()
//   .setLatLng([51.5, -0.09])
//   .setContent("I am a standalone popup.")
//   .openOn(mymap);
//
// mymap.on('click', function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(mymap);
// });
