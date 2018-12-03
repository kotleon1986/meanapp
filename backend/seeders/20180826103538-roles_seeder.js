'use strict';
const Role = require('./../models').Role;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Role.destroy({ truncate: true });
    return queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        display_name: 'Admin'
      },
      {
        name: 'user',
        display_name: 'User'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
