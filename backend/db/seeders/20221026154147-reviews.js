'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
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

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Reviews', {
      review: { [Op.in]: ['Awesome!', 'Terrible!', 'Alright!'] }
    })
  }
};
