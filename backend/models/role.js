'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    displayName: {
      type: DataTypes.STRING,
      field: 'display_name'
    }
  }, {
    timestamps: false,
    tableName: 'roles'
  });

  Role.associate = (models) => {
    Role.hasMany(models.User, {foreignKey: 'role_id'});
  };

  return Role;
};