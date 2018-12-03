const express = require('express');
const router = express.Router();
const passport = require('passport');
const uploader = require('multer')({ dest: 'public/uploads/' });
const {requiredAdmin, refreshToken, passportOpts} = require('../../middlewares/passport');
const UserController = require('./../../controllers/admin/user');
const User = new UserController();

router.get('/', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, User.get);

router.get('/:id', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, User.show);

router.post('/', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, uploader.single('photo'), User.create);

router.put('/:id', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, User.update);

router.post('/:id/photo/change', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, uploader.single('photo'), User.changePhoto);

router.put('/:id/photo/remove', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, User.removePhoto);

router.patch('/:id/:status', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, User.status);

router.put('/:id/password/change', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, User.changePassword);

router.put('/:id/password/reset', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, User.resetPassword);

router.delete('/:id', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, User.remove);

module.exports = router;
