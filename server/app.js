const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up express
const app = express();

// Log requests to console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: "Welcome!"
}));

module.exports = app;
