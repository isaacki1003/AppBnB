'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'Awesome!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Terrible!',
        stars: 1
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Alright!',
        stars: 3
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Disappointing!',
        stars: 2
        },
        {
        spotId: 5,
        userId: 2,
        review: 'Decent!',
        stars: 3
        },
        {
        spotId: 6,
        userId: 2,
        review: 'Mediocre!',
        stars: 2
        },
        {
        spotId: 7,
        userId: 2,
        review: 'Great location!',
        stars: 4
        },
        {
        spotId: 8,
        userId: 2,
        review: 'Loved it!',
        stars: 5
        },
        {
        spotId: 9,
        userId: 2,
        review: 'Not worth the price!',
        stars: 2
        },
        {
        spotId: 10,
        userId: 2,
        review: 'Could have been better!',
        stars: 3
        },
        {
        spotId: 11,
        userId: 2,
        review: 'A pleasant stay!',
        stars: 4
        },
        {
        spotId: 12,
        userId: 2,
        review: 'Would not recommend!',
        stars: 2
        },
        {
        spotId: 13,
        userId: 2,
        review: 'Comfortable!',
        stars: 4
        },
        {
        spotId: 14,
        userId: 2,
        review: 'Not as described!',
        stars: 2
        },
        {
        spotId: 15,
        userId: 2,
        review: 'Good value!',
        stars: 4
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options);
  }
};
