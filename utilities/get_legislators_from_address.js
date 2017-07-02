// NOTE: This code is ported over to python and is no longer used.

var Promise = require('bluebird');
const axios = require('axios');
const secrets = require('../secrets.json');

function processAddress(address) {
  updatedAddr = address.split(' ').join('+');
  return new Promise((resolve, reject) => {
    resolve(updatedAddr);
  });
}

function requestGeocoding(address) {
  return axios.get('https://maps.googleapis.com/maps/api/geocode/json'
    + '?key=' + secrets.google_geocoding_api_key
    + '&address=' + address);
}

function getLatLong(response) {
  return new Promise((resolve, reject) => {
    location = response.data.results[0].geometry.location;
    resolve(location);
  });
}

function requestOpenStates(location) {
  return axios
    .get('https://openstates.org/api/v1/legislators/geo/'
      + '?apikey=' + secrets.openstates_api_key
      + '&lat=' + location.lat + '&long=' + location.lng);
}

function getLegislators(response) {
  console.log(response.data);
}

function getLegislatorsFromAddress(address) {
  return processAddress(address)
    .then(requestGeocoding)
    .then(getLatLong)
    .then(requestOpenStates)
    .then(getLegislators);
}

module.exports = getLegislatorsFromAddress;

if (require.main === module) {
  address = process.argv.slice(2).join(" ");
  getLegislatorsFromAddress(address);
}
