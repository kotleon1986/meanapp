const Joi = require('joi');

module.exports = {
    login: {
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8)
    },

    forgotPassword: {
        email: Joi.string().email().required()        
    },

    tokenCheck: {
        token: Joi.string().required()
    },

    resetPassword: {
        token: Joi.string().required(),
        password: Joi.string().required().min(8)
    },

    socialLogin: {
        email: Joi.string().email().required()
    }
};
