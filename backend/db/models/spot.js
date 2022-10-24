'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(
        models.User,
          {
            foreignKey: 'ownerId',
            as: 'Owner'
          }
      );
      Spot.hasMany(
        models.SpotImage,
          { foreignKey: 'spotId', hooks: true }
      );
      Spot.hasMany(
        models.Booking,
         { foreignKey: 'spotId', hooks: true }
      );
      Spot.hasMany(
        models.Review,
          { foreignKey: 'spotId', hooks: true }
      );
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};