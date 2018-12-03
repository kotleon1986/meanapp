'use strict';
module.exports = (sequelize, DataTypes) => {
  const LoginAttempt = sequelize.define('LoginAttempt', {
    ip: DataTypes.STRING,
    email: DataTypes.STRING,
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {
    tableName: 'login_attempts'
  });

  LoginAttempt.searchFields = ['ip'];

  return LoginAttempt;
};