const Joi = require('joi');

module.exports = {
    update: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
    },

    changePassword: {
        oldPassword: Joi.string().required(),
        password: Joi.string().required().min(8)
    }
};
