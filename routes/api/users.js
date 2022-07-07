var express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { user, session } = require("../../model/database");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  console.log("session ID", req.cookies.sessionId);
  const userSessionId = req.cookies.sessionId;
  if (!userSessionId) {
    res.json("there is no user");
  } else {
    const userInfo = await session.get(userSessionId);
    res.send(userInfo);
  }
});

router.post("/", async function (req, res, next) {
  const { nickname, password, email } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  await user.put(email, { passwordHash, nickname });

  const sessionId = uuidv4();

  const newSession = await session.put(sessionId, {
    email,
    nickname,
  });

  res.cookie("sessionId", sessionId, { maxAge: 900000, httpOnly: true });

  res.send({ email, nickname });
});

module.exports = router;
