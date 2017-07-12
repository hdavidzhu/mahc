const axios = require('axios');
const secrets = require('../secrets');
const Community = require('../models').Community;

module.exports = {
  create(req, res) {
    return Community.create({
      name: req.body.name,
      address: req.body.address
    })
    .then(community => res.status(201).send(community))
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Community
      .all()
      .then(communities => {
        console.log(communities);
        res.status(200).send(communities);
      })
      .catch(error => res.status(400).send(error));
  },

  updateMissingLatLng(req, res) {
    return Community
      .all() // TODO: Make this only apply to listings without geocoding
      .then(communities => Promise.all(communities.map((community) => {
        return axios.get('https://maps.googleapis.com/maps/api/geocode/json'
          + '?key=' + secrets.google_geocoding_api_key
          + '&address=' + community.address)
        .then((geocodeRes) => {
          var location = geocodeRes.data.results[0].geometry.location;
          community.latitude = location.lat;
          community.longitude = location.lng;
          return community.save();
        });
      })))
      .then(communities => res.status(200).send(communities))
      .catch(error => res.status(400).send(error));
  }
};
