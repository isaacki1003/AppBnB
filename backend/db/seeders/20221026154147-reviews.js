'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

/** @type {import('sequelize-cli').Migration} */
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
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options);
  }
};
