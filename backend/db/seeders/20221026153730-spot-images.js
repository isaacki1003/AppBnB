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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/dfe9fd1e-a010-43c9-b546-0bbc7d59f7f3.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/0e074fc5-2d13-422d-bc5a-af14595f2f38.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/53b475a3-104f-462e-8faf-85a7bcd1f13b.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/5a06ec14-3591-459f-86ec-dfe5be7c203c.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/21fe9b78-125d-4426-b17f-44f7d08e58cd.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714659286766381030/original/ca8633af-3e34-4d5d-9911-52dc04c93f6a.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714659286766381030/original/d6c6423d-8541-4465-9da4-2713c700886f.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714659286766381030/original/684fb868-e732-41eb-a284-37fb42067cd1.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714659286766381030/original/d8b7b02a-a9da-481d-a50f-45c49650625f.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53861259/original/770022af-2d93-4385-afe3-4790a9a5d096.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53861259/original/463a493b-4d2a-4be8-aaf7-79e60a3b18ed.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53861259/original/a35e1913-340f-4074-a80c-04870bd11edf.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53861259/original/a0783062-6ece-498f-a1e9-a9e4ffca139b.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/b0c977d9-57ba-4f70-bbb4-8b3cd3ae8dc4.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48507726/original/ee79ca7b-0d05-42af-a0ab-aac4baa3e5e3.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48507726/original/2b75d60f-07e1-46d3-a268-a84cca5848c0.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-3478607/original/01fd5ae1-2fc0-4fa2-a69d-6344a99a78f1.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-3478607/original/6d0f58aa-8cf1-4090-a6a4-e40e2ebaf698.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-3478607/original/3955bfce-b88f-4fbd-af32-e17a44683e5d.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/5f2f8e5e-5cb2-4171-a15a-3c2542c42ab8.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/def76b5e-8a60-487a-9d53-4bf71d58a3f3.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/df3ba0d9-cf2d-401e-b2a6-5d0c8b55f392.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34816258/original/2d7809ce-da38-4c1f-a225-097229c56561.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34816258/original/283d3c28-cea1-4e6c-a052-643b27eb10d4.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34816258/original/95a7aac2-a809-42e5-853b-444f93b60747.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/8255bdb1-1d65-4325-a744-6487dc51453b.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34577812/original/abeb8e1c-b2e8-4a09-9a7a-eb2584c6fef9.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34577812/original/8b0bb13c-9a61-4cee-9882-9c177473124b.jpeg?im_w=720',
        preview: false
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
