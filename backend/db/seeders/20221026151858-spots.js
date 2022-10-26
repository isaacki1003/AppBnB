'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        address: '123 Lake Lane',
        city: 'Lake Arrowhead',
        state: 'CA',
        country: 'United States of America',
        lat: 35.56,
        lng: 21.44,
        name: 'A-Frame Cabin w Views, Cedar Hot Tub & Sun Deck',
        description: 'A-Frame gem with Lake rights tucked away in the trees of Lake Arrowhead on an acre of land.',
        price: 450
      },
      {
        address: '234 Hobbit Lane',
        city: 'Cedar City',
        state: 'UT',
        country: 'United States of America',
        lat: 11.15,
        lng: 45.44,
        name: "Hobbit Cottage",
        description: 'ucked away in our peaceful garden, this modern Hobbit Cottage will delight you! ',
        price: 123
      },
      {
        address: '345 Bear Blvd',
        city: 'Big Bear Lake',
        state: 'CA',
        country: 'United States of America',
        lat: 12.46,
        lng: 434.23,
        name: 'Luxury Modern Cabin',
        description: 'With a 1/3 acre of peaceful forest-like space, this is a spot for travelers to reset, relax, and recharge.',
        price: 150.12
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['111 Vault Lane', '946 Arrow St', '337 Arrow St'] }
     }, {})
  }
};
