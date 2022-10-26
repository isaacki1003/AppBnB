'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Lake Lane',
        city: 'Lake Arrowhead',
        state: 'CA',
        country: 'United States of America',
        lat: 35,
        lng: 21,
        name: 'A-Frame Cabin w Views, Cedar Hot Tub & Sun Deck',
        description: 'A-Frame gem with Lake rights tucked away in the trees.',
        price: 450
      },
      {
        ownerId: 1,
        address: '234 Hobbit Lane',
        city: 'Cedar City',
        state: 'UT',
        country: 'United States of America',
        lat: 11,
        lng: 45,
        name: "Hobbit Cottage",
        description: 'Tucked away in our peaceful garden!',
        price: 123
      },
      {
        ownerId: 2,
        address: '345 Bear Blvd',
        city: 'Big Bear Lake',
        state: 'CA',
        country: 'United States of America',
        lat: 12,
        lng: 434,
        name: 'Luxury Modern Cabin',
        description: 'This is a spot for travelers.',
        price: 150
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['123 Lake Lane', '234 Hobbit Lane', '345 Bear Blvd'] }
     }, {})
  }
};
