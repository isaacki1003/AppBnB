'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
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
          { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      );
      Spot.hasMany(
        models.Booking,
         { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      );
      Spot.hasMany(
        models.Review,
          { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
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
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'An address is required.'
        },
        len: {
          args: [1, 250],
          msg: 'Please provide an address.'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A city is required.'
        },
        len: {
          args: [1, 250],
          msg: 'Please provide a city.'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A state is required.'
        },
        len: {
          args: [1, 250],
          msg: 'Please provide a state.'
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A country is required.'
        },
        len: {
          args: [1, 250],
          msg: 'Please provide a country.'
        }
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A name is required.'
        },
        len: {
          args: [6, 300],
          msg: 'Please provide a name (less than 300 characters).'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A description is required.'
        },
        len: {
          args: [30, 300],
          msg: 'Please provide a description (less than 300 characters).'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Price must be a number.'
        },
        min: {
          args: [1],
          msg: 'Price cannot be less than $1'
        },
        notNull: {
          msg: 'A price is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
