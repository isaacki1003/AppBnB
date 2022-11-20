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
        name: 'A-Frame Secluded Cabin',
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
      },
      {
        ownerId: 1,
        address: '3744 Tree Lane',
        city: 'Topanga Canyon',
        state: 'CA',
        country: 'United States of America',
        lat: 31,
        lng: 12,
        name: 'Modern Treehouse',
        description: 'The house sits beautifully in the canyon, its organic feel and yet modern design transcends the idea of California living by blending indoor/outdoor through massive windows, incredible ceiling heights and stunning views. ',
        price: 352
      },
      {
        ownerId: 2,
        address: '111 Ocean Ave',
        city: 'Santa Monica',
        state: 'CA',
        country: 'United States of America',
        lat: 153,
        lng: 135,
        name: 'Beachfront Bungalow',
        description: 'Situated directly on the Exotic Big Rock Beach, Breathtaking unobstructed ocean views. Wake up to the sound of crashing waves less than 50 feet away. ',
        price: 142
      },
      {
        ownerId: 3,
        address: '222 Mountain Rd',
        city: 'Desert Valley',
        state: 'CA',
        country: 'United States of America',
        lat: 15,
        lng: 2356,
        name: 'Saddle Peak',
        description: 'The ultra modern structure, perched at the edge of a lush escarpment, features an unimpeded view of the rugged countryside from its abundance of full-length windows.',
        price: 135
      },
      {
        ownerId: 1,
        address: '132 Forest Rd',
        city: 'New York',
        state: 'NY',
        country: 'United States of America',
        lat: 14,
        lng: 263,
        name: 'Martel Villa',
        description: 'Welcome to this amazing Smart Modern resort feel home walking distance to Melrose shopping, with 5bedrooms 6.5 baths, Extra beds can be added including a master bedroom a great sized private balcony & a luxurious master bath with a soaking tub. ',
        price: 362
      },
      {
        ownerId: 2,
        address: '1945 Malibu Rd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States of America',
        lat: 262,
        lng: 234,
        name: 'Modern Luxury Retreat',
        description: 'Relax in a luxurious 3-story Malibu getaway with spectacular ocean & mountain views.',
        price: 632
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
