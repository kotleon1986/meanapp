const bcrypt = require('bcrypt');
const Api = require('../services/api');
const Token = require('./../helpers/token');
const Models = require('./../models');
const User = Models.User;

class ProfileController {

    async update(req, res, next) {
        try {
            const user = req.user;
            const currentEmail = user.email;

            await user.update(req.body);
            const userData = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                name: user.name,
                avatar: user.avatar,
                role: user.role
            };

            const responseData = {
                user: userData
            };

            if (user.email != currentEmail) {
                res.token = Token.createToken(responseData);
            }

            return Api.send(res, responseData, 'Profile updated successfully');
        }
        catch (err) {
            next(err);
        }
    }

    async changePhoto(req, res, next) {
        try {
            if (!req.file) {
                return Api.error(res, 'Please upload photo');
            }
    
            const avatar = await User.changePhoto(req, req.user);
            return Api.send(res, { avatar: avatar }, 'Photo successfully changed');
        }
        catch (err) {
            next(err);
        }
    }

    async removePhoto(req, res, next) {
        try {
            await User.removePhoto(req.user);
            Api.send(res, 'Photo removed successfully');
        }
        catch (err) {
            next(err);
        }
    }

    async changePassword(req, res, next) {
        try {
            const passwordCorrect = await User.comparePassword(req.user, req.body.oldPassword);
            
            if (passwordCorrect) {
                req.user.password = await bcrypt.hash(req.body.password, 10);
                await req.user.save();
                return Api.send(res, 'Password changed successfully');
            } else {
                return Api.send(res, 'Old password is wrong. Try again.', 400);
            }
        }
        catch (err) {
            next(err);
        }
    }

}

module.exports = ProfileController;