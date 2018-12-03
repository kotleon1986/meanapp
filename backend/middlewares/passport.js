const passportJwt = require('passport-jwt');
const tokenHelper = require('./../helpers/token');
const Model = require('../models/index');
const User = Model.User;

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

module.exports = (passport) => {    
    const jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = process.env.SECRET_KEY;

    const strategy = new JwtStrategy(jwtOptions, (payload, next) => {
        User.find({
            where: {
                id: payload.user.id,
                email: payload.user.email
            },
            include: ['role']
        }).then((user) => {
            return next(null, user);
        }).catch((err) => {
            return next(err);
        });
    });

    passport.use(strategy);
};

module.exports.requiredAdmin = (req, res, next) => {
    if (req.user.role.name !== 'admin') {
        res.status(403).send({
            "success": false,
            "message": "Access Denied"
        });
    } else {
        return next(null, req.user);
    }
};

module.exports.refreshToken = (req, res, next) => {
    const tokenExpirationTime = tokenHelper.getTokenExpirationTime(req);
    if (tokenExpirationTime > -2 && tokenExpirationTime < 0) {
        res.token = tokenHelper.createToken({user: req.user});
    }

    next(null, req, res);
};

module.exports.passportOpts = {
    session: false, failWithError: true
};