const communityController = require('../controllers').community;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: "Welcome to MAHC's API!"
  }));
  app.get('/api/communities', communityController.list);
  app.post('/api/communities', communityController.create);
  app.delete('/api/communities', communityController.delete);
  app.get('/api/communities/update-missing-lat-lng', communityController.updateMissingLatLng);
}
