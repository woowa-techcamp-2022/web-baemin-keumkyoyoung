var express = require("express");
var router = express.Router();
const { user, session } = require("../model/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

router.post("/login", async function (req, res, next) {
  const { password, email } = req.body;
  console.log(password, email);

  // await bcrypt.compare(password, user.passwordHash)

  try {
    const userInfo = await user.get(email);
    const passwordCorrect =
      userInfo === null
        ? false
        : await bcrypt.compare(password, userInfo.passwordHash);

    if (!passwordCorrect) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const sessionId = uuidv4();

    const newSession = await session.put(sessionId, {
      email: userInfo.email,
      nickname: userInfo.nickname,
    });

    res.cookie("sessionId", sessionId, { maxAge: 900000, httpOnly: true });
    return res.json("success");
  } catch (error) {
    // console.log(error);
    return res.json(error);
  }

  // fetch 왜 안됨
});

router.get("/user", async function (req, res, next) {
  console.log("session ID", req.cookies.sessionId);
  const userSessionId = req.cookies.sessionId;
  if (!userSessionId) {
    res.json("there is no user");
  } else {
    const userInfo = await session.get(userSessionId);
    res.send(userInfo);
  }
});

router.post("/user", async function (req, res, next) {
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
