'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING,
                field: 'first_name'
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING,
                field: 'last_name'
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            roleId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                field: 'role_id'
            },
            avatar: {
                allowNull: true,
                type: Sequelize.STRING
            },
            status: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            resetToken: {
                allowNull: true,
                type: Sequelize.STRING,
                field: 'reset_token'
            },
            tokenExpires: {
                allowNull: true,
                type: Sequelize.DATE,
                field: 'token_expires'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'updated_at'
            },
            deletedAt: {
                type: Sequelize.DATE,
                field: 'deleted_at'
            }
        }, {
            timestamps: true,
            destroyTime: 'deletedAt',
            paranoid: true            
        }).then(() => queryInterface.addIndex('users', [
            'first_name', 'last_name', 'email', 'role_id'
        ]));
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};