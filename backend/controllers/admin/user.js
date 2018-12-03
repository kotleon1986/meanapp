const bcrypt = require('bcrypt');
const helper = require('./../../helpers/helper');
const Api = require('../../services/api');
const Model = require('./../../models');
const User = Model.User;

class UserController {

    async get(req, res, next) {
        try {
            const includes = ['role'];
            const data = await Api.table(req, User, includes);
            return Api.send(res, data);
        } catch(err) {
            next(err);
        }
    }

    async show(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            return Api.send(res, {user: user});
        } catch(err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const user = await User.register(req, 'welcome');
            return Api.send(res, {user: user}, 'User created successfully');
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            await user.update(req.body);
            Api.send(res, {user: user}, 'User updated successfully');
        } catch(err) {
            next(err);
        }
    }

    async changePhoto(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            const avatar = await User.changePhoto(req, user);
            return Api.send(res, { avatar: avatar }, 'Photo successfully changed');
        } catch(err) {
            next(err);
        }
    }

    async removePhoto(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            await User.removePhoto(user);
            Api.send(res, 'Photo removed successfully');
        } catch(err) {
            next(err);
        }
    }

    async status(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            await user.update({
                status: req.params.status
            });
            
            const message = (req.params.status == 1) ? 'User activated' : 'User disabled';
            Api.send(res, {user: user}, message);
        } catch(err) {
            next(err);
        }
    }

    async remove(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            await user.destroy();
            Api.send(res, 'User removed successfully');
        } catch(err) {
            next(err);
        }
    }

    async changePassword(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            await user.update({
                password: await bcrypt.hash(req.body.password, 10)
            });
            Api.send(res, 'Password changed successfully');
        } catch(err) {
            next(err);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            await user.update({ 
                password: await bcrypt.hash(helper.generateRandomString(), 10) 
            });
            await User.resetPassword(user);
            Api.send(res, 'Password reset request sent successfully');
        } catch(err) {
            next(err);
        }
    }

}

module.exports = UserController;