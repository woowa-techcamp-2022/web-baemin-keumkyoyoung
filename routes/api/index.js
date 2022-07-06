var express = require('express');
var router = express.Router();
var usersRouter = require('./users');

router.use('/user', usersRouter);

module.exports = router;
