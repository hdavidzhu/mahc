'use strict';
module.exports = function(sequelize, DataTypes) {
  var Community = sequelize.define('Community', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Community;
};
