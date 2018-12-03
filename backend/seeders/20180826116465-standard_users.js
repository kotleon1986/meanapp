'use strict';
const bcrypt = require('bcrypt');
const models = require('./../models');
const User = models.User;
const Role = models.Role;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.destroy({ truncate: true });
    const password = await bcrypt.hash('test1234', 10);
    const roles = await Role.findAll();
    return queryInterface.bulkInsert('users', [
      {
        first_name: 'Admin',
        last_name: 'User',
        email: 'test@admin.com',
        password: password,
        role_id: roles.find(r => r.name === 'admin').id,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@user.com',
        password: password,
        role_id: roles.find(r => r.name === 'user').id,
        status: 1,        
        created_at: new Date(),
        updated_at: new Date()     
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
