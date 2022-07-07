var express = require("express");
var router = express.Router();
var usersRouter = require("./users");
var loginRouter = require("./login");

router.use("/user", usersRouter);
router.use("/login", loginRouter);

module.exports = router;
