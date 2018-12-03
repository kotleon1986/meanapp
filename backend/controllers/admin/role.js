const Api = require('../../services/api');
const Model = require('./../../models');
const Role = Model.Role;

class RoleController {
    async get(req, res, next) {
        const roles = await Role.findAll();
        return Api.send(res, {roles: roles});
    }
}

module.exports = RoleController;