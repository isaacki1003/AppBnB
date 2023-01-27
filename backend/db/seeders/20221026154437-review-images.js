'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-15058446/original/56ff5e60-671b-4736-9d50-e3b59dc9d185.jpeg?im_w=1440'
      },
      {
        reviewId: 2,
        url: 'https://a0.muscache.com/im/pictures/6861fc2a-ca6b-473a-b64d-7303f3836584.jpg?im_w=1440'
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options);
  }
};
