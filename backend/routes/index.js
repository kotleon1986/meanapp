const express = require('express');
const router = express.Router();

// routes
router.use('/auth', require('./auth'));
router.use('/profile', require('./profile'));

// admin routes
router.use('/admin', require('./admin'));

module.exports = router;
