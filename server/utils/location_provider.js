const Promise = require('bluebird');
const axios = require('axios');
const secrets = require('../secrets.json');

function requestGeocoding(address) {
  const updatedAddr = address.split(' ').join('+');
  return axios.get('https://maps.googleapis.com/maps/api/geocode/json'
    + '?key=' + secrets.google_geocoding_api_key
    + '&address=' + updatedAddr);
}

function getLocation(response) {
  return new Promise((resolve, reject) => {
    location = response.data.results[0].geometry.location;
    resolve(location);
  });
}

module.exports =  function getLocationFromAddress(address) {
  return requestGeocoding(address).then(getLocation);
}
