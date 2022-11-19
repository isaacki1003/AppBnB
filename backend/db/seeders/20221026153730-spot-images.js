'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/b027074b-b708-4e00-84f6-37e8d1ab7aac.jpeg?im_w=720',
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
