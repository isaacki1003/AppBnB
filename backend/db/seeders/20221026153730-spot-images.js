'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'www.testimage.com',
        preview: true
      },
      {
        spotId: 2,
        url: 'www.testimage2.com',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('SpotImages', {
      url: { [Op.in]: ['www.testimage.com', 'www.testimage2.com'] }
    }, {})
  }
};
