var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "My 배민" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "로그인" });
});

router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "회원가입" });
});

module.exports = router;
