const shell = require('shelljs');
const moment = require('moment');
const crypto = require('crypto');

module.exports = {

    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    createDirectoriesRecursively: (path) => {
        shell.mkdir('-p', path);
    },

    dateDiff(date, time) {        
        return moment().diff(date, time || 'days');
    },

    generateRandomString(length) {
        return crypto.randomBytes(length || 10).toString('hex');
    },

    getFilterParams(params) {
        const nonFilterKeys = [
            'page', 'size', 'search',
            'order', 'dir', 'export'
        ];

        const filterParams = {...params};
        nonFilterKeys.forEach((key) => {
            delete filterParams[key];
        });

        return filterParams;
    }

};