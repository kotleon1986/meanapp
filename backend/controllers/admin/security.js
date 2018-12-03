const FileHelper = require('./../../helpers/file');
const Api = require('./../../services/api');
const Model = require('./../../models');
const LoginAttempt = Model.LoginAttempt;

class SecurityController {
    async getLoginAttempts(req, res, next) {
        try {
            const loginAttempts = await Api.table(req, LoginAttempt);
            return Api.send(res, loginAttempts);
        } catch(err) {
            next(err);
        }
    }

    async resetLoginAttempts(req, res, next) {
        try {
            const loginAttempts = await LoginAttempt.findById(req.params.id);
            await loginAttempts.update({ attempts: 0 });
            return Api.send(res, 'Reset successful');
        } catch(err) {
            next(err);
        }
    }

    async getErrorLogs(req, res, next) {
        try {
            let logs = [];
            let readLogs = FileHelper.readFile(`${process.cwd()}/logs/error.log`);
            if (readLogs.length) {
                readLogs = readLogs.split("\n");
                logs = readLogs.map(log => {
                    log = log.split(' Error: ');
                    return {
                        date: log[0],
                        message: log[1]
                    }
                });                
            }

            return Api.send(res, {logs: logs});
        } catch(err) {
            next(err);
        }
    }

    async resetErrorLogs(req, res, next) {
        try {
            FileHelper.resetFile(`${process.cwd()}/logs/error.log`);
            return Api.send(res, 'Logs cleared');
        } catch(err) {
            next(err);
        }
    }
}

module.exports = SecurityController;