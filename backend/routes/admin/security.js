const express = require('express');
const router = express.Router();
const passport = require('passport');
const {requiredAdmin, refreshToken, passportOpts} = require('../../middlewares/passport');
const SecurityController = require('./../../controllers/admin/security');
const Security = new SecurityController();

router.get('/login_attempts', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, Security.getLoginAttempts);

router.put('/login_attempts/:id/reset', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, Security.resetLoginAttempts);

router.get('/error_logs', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, Security.getErrorLogs);

router.put('/error_logs/reset', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, Security.resetErrorLogs)


module.exports = router;