const express = require('express');
const router = express.Router();

// routes
router.use('/users', require('./users'));
router.use('/roles', require('./roles'));
router.use('/security', require('./security'));

module.exports = router;
