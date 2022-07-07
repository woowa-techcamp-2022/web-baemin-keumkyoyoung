const { user, session } = require("../../model/database");
const bcrypt = require("bcrypt");
var express = require("express");
const { v4: uuidv4 } = require("uuid");

var router = express.Router();

/* GET users listing. */
user;
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async function (req, res, next) {
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

module.exports = router;
