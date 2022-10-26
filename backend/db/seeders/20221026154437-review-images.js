'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'www.test1.com'
      },
      {
        reviewId: 2,
        url: 'www.test2.com'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('ReviewImages', {
      url: { [Op.in]: ['www.test1.com', 'www.test2.com'] }
    })
  }
};
