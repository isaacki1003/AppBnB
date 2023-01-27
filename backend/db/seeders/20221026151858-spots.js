'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Spots'
    return queryInterface.bulkInsert(options, [
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
        ownerId: 3,
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
        ownerId: 3,
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
        ownerId: 3,
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
        ownerId: 3,
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
        ownerId: 3,
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
      },
      {
        ownerId: 2,
        address: '27560 E Pacific Coast Hwy',
        city: 'Malibu',
        state: 'CA',
        country: 'United States of America',
        lat: 123,
        lng: 123,
        name: 'Romantic Beachfront Retreat',
        description: 'Entire rental unit hosted by Gil',
        price: 123
      },
      {
        ownerId: 2,
        address: '28032 Sea Ln Dr',
        city: 'Malibu',
        state: 'CA',
        country: 'United States of America',
        lat: 123,
        lng: 123,
        name: 'Breathtaking Views and Modern Design',
        description: 'Entire home hosted by Daniel',
        price: 123
      },
      {
        ownerId: 2,
        address: '5016 W Washington Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States of America',
        lat: 123,
        lng: 123,
        name: 'Modern Villa with Unmatched Skyline Views',
        description: 'Entire home hosted by Marina',
        price: 123
      },
      {
        ownerId: 2,
        address: '27834 E Pacific Coast Hwy',
        city: 'Malibu',
        state: 'CA',
        country: 'United States of America',
        lat: 123,
        lng: 123,
        name: 'Modern Malibu Paradise',
        description: 'Entire home hosted by Jeffrey',
        price: 123
      },
      {
        ownerId: 2,
        address: '63656 Doggie Trail',
        city: 'Joshua Tree',
        state: 'CA',
        country: 'United States of America',
        lat: 123,
        lng: 123,
        name: 'Invisible House',
        description: 'Entire home hosted by Fieldtrip',
        price: 123
      },
      {
        ownerId: 2,
        address: '11006 Massachusetts Ave',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States of America',
        lat: 123,
        lng: 123,
        name: 'Lakefront Shipping Container',
        description: 'Entire cabin hosted by Robyn',
        price: 123
      },
      {
        ownerId: 2,
        address: '734 Levering Ave',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States of America',
        lat: 123,
        lng: 123,
        name: 'Architecture Cave House',
        description: 'Cycladic home hosted by Laskarina',
        price: 123
      },
      {
        ownerId: 2,
        address: '714 Levering Ave',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States of America',
        lat: 123,
        lng: 123,
        name: 'Full Luxury Treehouse',
        description: 'Entire villa hosted by Petra',
        price: 123
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Spots'
    return queryInterface.dropTable(options, options);
  }
};
