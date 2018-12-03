const logger = require('./../services/logger');
const helper = require('./../helpers/helper');

module.exports = (err, req, res, next) => {
    let message = {}, status = 500;
    if (typeof err === 'object') {
        switch(err.name) {
            case 'SequelizeValidationError':
                err.errors.map(error => {
                    message[error.path] = error.message;
                });
                status = 400;
                break;

            case 'AuthenticationError':
                message = 'You must authorize to perform this request';
                status = 401;
                break;

            case 'Error':
                if(err.errors && typeof err.errors === 'object') {
                    err.errors.map((error) => {
                        let errorMessage = error.messages[0];
                        let matches = errorMessage.match(/\"(.+?)\"/g);
                        errorMessage = errorMessage.replace(matches[0], helper.capitalize( matches[0].replace(/[^\w\s]/gi, '') ));
                        message[error.field[0]] = errorMessage;
                    });

                    status = 422;
                } else {
                    message = 'Failed to process request';
                }

                logger.error(err);                    
                break;

            default:
                message = 'Failed to process request';
                logger.error(err);
                break;
        }
    } else {
        logger.error(err);
        message = err;
    }

    console.log('err: ', err);

    res.status(status).json({
        success: false,
        message: message
    });
};
