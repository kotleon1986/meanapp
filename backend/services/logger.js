const fs = require('fs');
const moment = require('moment');
const {format, createLogger, transports} = require('winston');
const {printf} = format;
const {capitalize} = require('../helpers/helper');

const messageFormat = printf(info => {
    return `${moment()} ${capitalize(info.level)}: ${info.message}`;
});

checkFolder = () => {
    const fs = require('fs');
    const dir = './logs';
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        fs.chmodSync(dir, 755);
    }
};

checkFolder();
module.exports = createLogger({
    format: messageFormat,
    transports: [
        new transports.File({filename: process.cwd() + '/logs/error.log', level: 'error'})
    ]
});
