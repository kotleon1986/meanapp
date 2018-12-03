const express = require('express');
const router = express.Router();
const passport = require('passport');
const validate = require('express-validation');
const brute = require('./../middlewares/brute');
const validators = require('./../validators');
const uploader = require('multer')({ dest: 'public/uploads/' });
const {passportOpts, refreshToken} = require('../middlewares/passport');
const ProfileController = require('./../controllers/profile');
const profile = new ProfileController();

router.put('/update', passport.authenticate('jwt', passportOpts), validate(validators('profile.update')), refreshToken, profile.update);

router.put('/photo/change', passport.authenticate('jwt', passportOpts), uploader.single('photo'), refreshToken, profile.changePhoto);

router.put('/photo/remove', passport.authenticate('jwt', passportOpts), refreshToken, profile.removePhoto);

router.put('/password/change', passport.authenticate('jwt', passportOpts), validate(validators('profile.changePassword')), refreshToken, profile.changePassword);

module.exports = router;