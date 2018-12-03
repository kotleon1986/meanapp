const express = require('express');
const router = express.Router();
const passport = require('passport');
const {requiredAdmin, refreshToken, passportOpts} = require('../../middlewares/passport');
const RoleController = require('./../../controllers/admin/role');
const Role = new RoleController();

router.get('/', passport.authenticate('jwt', passportOpts), requiredAdmin, refreshToken, Role.get);


module.exports = router;