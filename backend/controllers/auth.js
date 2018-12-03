const bcrypt = require('bcrypt');
const requestIp = require('request-ip');
const Api = require('../services/api');
const uploader = require('./../services/uploader');
const tokenHelper = require('./../helpers/token');
const helper = require('./../helpers/helper');
const Models = require('./../models');
const User = Models.User;
const Role = Models.Role;
const LoginAttempt = Models.LoginAttempt;

class AuthController {

    async login(req, res, next) {
        try {
            const ip = requestIp.getClientIp(req);
            const loginAttempts = await LoginAttempt.findOne({ where: { ip: ip} });

            if (loginAttempts && loginAttempts.attempts >= 5) {
                return Api.send(res, 'Login attempts limit has been reached. Please contact support.', 403);
            }

            const user = await User.find({
                where: {
                    email: req.body.email
                },
                include: [ 'role' ]
            });

            if (user && await User.comparePassword(user, req.body.password)) {
                if (user.status.type == 'danger') {
                    return Api.send(res, 'Your account has been deactivated. Please contact support', 403);
                }

                const userData = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    name: user.name,
                    avatar: user.avatar,
                    role: user.role
                };

                if(loginAttempts) {
                    loginAttempts.update({
                        'attempts': 0
                    });
                }

                return Api.send(res, {
                    user: userData,
                    token: tokenHelper.createToken({user: userData})
                }, 'Login successful');
            } else {
                if(loginAttempts) {
                    await loginAttempts.update({attempts: (loginAttempts.attempts + 1)})
                } else {
                    await LoginAttempt.create({
                        ip: ip,
                        email: req.body.email,
                        attempts: 1
                    });
                }

                return Api.send(res, 'User not found', 404);
            }
        }
        catch (err) {
            next(err);
        }
    }

    async register(req, res, next) {
        try {
            if (req.body.roleId) {
                delete req.body.roleId;
            }

            await User.register(req, 'register');
            return Api.send(res, 'Registration successful');
        }
        catch (err) {
            next(err);
        }
    }

    async token(req, res, next) {
        Api.send(res, {
            token: tokenHelper.createToken({user: req.user})
        });
    }

    async forgotPassword(req, res, next) {
        try {
            const user = await User.find({
                where: {
                    email: req.body.email
                }
            });
            
            if (user) {
                await User.resetPassword(user);
            }

            return Api.send(res, 'Request sent successfully. Check your email.');
        } catch(err) {
            next(err);
        }
    }

    async resetPasswordTokenCheck(req, res, next) {
        try {
            const user = await User.find({
                where: {
                    resetToken: req.query.token
                }
            });
    
            if (!user || helper.dateDiff(user.tokenExpires) > 0) {
                return Api.send(res, 'Token expired. Please send request again.', null, 400);
            } else {
                return Api.send(res);
            }
        } catch(err) {
            next(err);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const user = await User.find({
                where: {
                    resetToken: req.body.token
                }
            });
    
            if (!user || helper.dateDiff(user.tokenExpires) > 0) {
                return Api.send(res, 'Invalid token', null, 400);
            }
    
            await user.update({
                password: await bcrypt.hash(req.body.password, 10),
                resetToken: null,
                tokenExpires: null
            });

            return Api.send(res, 'Password reset successfully');
        } catch(err) {
            next(err);
        }
    }

    async socialLogin(req, res, next) {
        try {
            let user = await User.find({
                where: {
                    email: req.body.email
                },
                include: ['role']
            });
    
            if (!user) {
                const userName = req.body.name.split(' ');
                const data = {
                    firstName: userName[0],
                    lastName: userName[1],
                    email: req.body.email,
                    password: helper.generateRandomString(),
                    avatar: req.body.image
                };

                user = await User.register(data, 'register', true);
            }

            user.role = await Role.findById(user.roleId);

            const userData = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                name: user.name,
                avatar: user.avatar,
                role: user.role
            };
            
            return Api.send(res, {
                user: userData,
                token: tokenHelper.createToken({user: userData})
            }, 'Login successful');
        } catch(err) {
            next(err);
        }
    }
}


module.exports = AuthController;