'use strict';
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const moment = require('moment');
const uploader = require('./../services/uploader');
const mailer = require('./../services/mailer');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name',
            validate: {
                len: {
                    args: 2,
                    msg: 'First Name must be at least 2 characters in length'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name',
            validate: {
                len: {
                    args: 2,
                    msg: 'Last Name must be at least 2 characters in length'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email'
                },
                isUnique: async (email, next) => {
                    try {
                        const user = await User.find({
                            where: {
                                email: email
                            }
                        });
                        if (user) {
                            return next('Email address already in use!');
                        }

                        next();
                    } catch (err) {
                        return next(err);
                    }
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Password is required'
                },
                len: {
                    args: [8],
                    msg: 'Password must be minimum 8 characters long'
                }
            }
        },
        roleId: {
            type: DataTypes.INTEGER,
            field: 'role_id',
            defaultValue: 2
        },
        avatar: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            get() {
                return (this.getDataValue('status')) ? {type: 'success', text: 'Active'} : {type: 'danger', text: 'Disabled'}
            }
        },
        resetToken: {
            type: DataTypes.STRING,
            field: 'reset_token'
        },
        tokenExpires: {
            type: DataTypes.DATE,
            field: 'token_expires'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at'
        },
        name: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.get('firstName')} ${this.get('lastName')}`;                
            }
        }
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'users',
        destroyTime: 'deletedAt',
        indexes: [
            {
                unique: true,
                fields: ['email']
            },
            {
                field: ['first_name', 'last_name', 'email', 'role_id']
            }
        ]
    });

    User.searchFields = ['firstName', 'lastName', 'email'];

    User.associate = (models) => {
        User.belongsTo(models.Role, {foreignKey: 'role_id', as: 'role'});
    };
    
    User.beforeCreate(async (user) => {
        const password = await bcrypt.hash(user.password, 10);
        user.password = password;
        return password;
    });

    User.comparePassword = async (user, password) => await bcrypt.compare(password, user.password);

    User.register = async (req, emailTemplate, social = false) => {
        const data = social ? req : req.body;

        if (req.file) {
            data.avatar = await uploader.upload(req, 'users');
        }

        const user = await User.create(data);
        await mailer.send(data.email, 'Account Created', emailTemplate, {
            user: user,
            password: data.password
        });
        
        return user;        
    };

    User.changePhoto = async(req, user) => {
        if (user.avatar) {
            uploader.remove(user.avatar);
        }

        const avatar = await uploader.upload(req, 'users');
        user.avatar = avatar;
        await user.save();
        return avatar;
    };

    User.removePhoto = async(user) => {
        if (uploader.remove(user.avatar)) {
            user.avatar = '';
            return await user.save();            
        } else {
            throw('Error removing photo');            
        }
    };

    User.resetPassword = async(user) => {
        user.resetToken = uuid();
        user.tokenExpires = moment().add(process.env.RESET_PASSWORD_TOKEN_DAYS, 'days');
        await user.save();

        return await mailer.send(user.email, 'Password Reset Request', 'forgot-password', {
            link: `${process.env.FRONT_URL}/reset-password/${user.resetToken}`,
            user: user
        });
    };

    return User;
};