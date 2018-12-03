const express = require('express');
const router = express.Router();
const passport = require('passport');
const validate = require('express-validation');
const validators = require('./../validators');
const brute = require('./../middlewares/brute');
const uploader = require('multer')({ dest: 'public/uploads/' });
const {passportOpts} = require('../middlewares/passport');
const AuthController = require('./../controllers/auth');
const Auth = new AuthController();

router.post('/login', brute.prevent, validate(validators('auth.login')), Auth.login);

router.post('/register', brute.prevent, uploader.single('photo'), Auth.register);

router.get('/token', passport.authenticate('jwt', passportOpts), Auth.token);

router.post('/password/forgot', validate(validators('auth.forgotPassword')), Auth.forgotPassword);

router.get('/token/check', validate(validators('auth.tokenCheck', true)), Auth.resetPasswordTokenCheck);

router.put('/password/reset', validate(validators('auth.resetPassword')), Auth.resetPassword);

router.post('/social/login', validate(validators('auth.socialLogin')), Auth.socialLogin);

module.exports = router;
