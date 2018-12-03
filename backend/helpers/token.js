const jwt = require('jsonwebtoken');
const helper = require('./../helpers/helper');
const moment = require('moment');

module.exports = {

    getToken(req) {
        const authHeader = req.headers.authorization;
        return authHeader ? authHeader.split(' ')[1] : false;        
    },

    getTokenExpirationTime(req, units = 'minutes') {
        const token = this.getToken(req);
        const tokenData = jwt.decode(token, {complete: true});
        const exp = tokenData.payload.exp;
        return helper.dateDiff(moment.unix(exp), units);        
    },

    createToken(data) {
        return jwt.sign(data, process.env.SECRET_KEY, {
            expiresIn: Number(process.env.TTL)
        });
    }

}