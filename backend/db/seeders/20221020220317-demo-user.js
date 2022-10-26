'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Barack',
        lastName: 'Obama',
        username: 'Demo-lition',
        firstName: 'Isaac',
        lastName: 'Ki',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'Donald',
        lastName: 'Trump',
        username: 'FakeUser1',
        firstName: 'Hoon',
        lastName: 'Kim',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstName: 'Joe',
        lastName: 'Biden',
        username: 'FakeUser2',
        firstName: 'Leyland',
        lastName: 'Chin',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
