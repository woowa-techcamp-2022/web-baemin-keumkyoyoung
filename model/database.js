const { Level } = require("level");

const db = new Level("database/user", { valueEncoding: "json" });

const user = db.sublevel("user", { valueEncoding: "json" });
const session = db.sublevel("session", { valueEncoding: "json" });

// Create a database
module.exports = {
  user,
  session,
};
