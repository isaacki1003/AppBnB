'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );

      Review.belongsTo(
        models.Spot,
          { foreignKey: 'spotId' }
      );

      Review.hasMany(
        models.ReviewImage,
          { foreignKey: 'reviewId', onDelete: 'CASCADE', hooks: true }
      );
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 200],
          msg: "Review must be between 5 and 200 characters."
        },
        notNull: {
          msg: "A review is required."
        }
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: "Review must be an integer between 1 and 5.",
        min: {
          args: 1,
          msg: "Please provide a rating above 1."
        },
        max: {
          args: 5,
          msg: "Please provide a rating below 5."
        },
        notNull: {
          msg: "Rating is required."
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
