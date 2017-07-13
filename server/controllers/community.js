const axios = require('axios');
const secrets = require('../secrets');
const Community = require('../models').Community;

const getLocationFromAddress = require('../utils/location_provider');

module.exports = {
  create(req, res) {
    return getLocationFromAddress(req.body.address)
      .then((location) => {
        return Community.create({
          name: req.body.name,
          address: req.body.address,
          latitude: location.lat,
          longitude: location.lng
        })
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

  delete(req, res) {
    return Community
      .destroy({
        where: {
          id: req.query.id
        }
      })
      .then(() => res.status(200).send())
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
