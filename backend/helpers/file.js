const fs = require('fs');

module.exports = {

    readFile(path) {
        return fs.readFileSync(path, 'utf8');
    },

    resetFile(path) {
        return fs.truncateSync(path);
    }

}