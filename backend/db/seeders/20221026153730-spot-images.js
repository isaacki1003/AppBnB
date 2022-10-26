'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        url: 'www.testimage.com',
        preview: true
      },
      {
        url: 'www.testimage2.com',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('SpotImages', {
      url: { [Op.in]: ['www.funnyimage.com', 'www.crazyimage.com'] }
    }, {})
  }
};
