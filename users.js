const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function init() {
  try {
    db = await sqlite.open({
      filename: 'database.db',
      driver: sqlite3.Database
    });
  } catch(err) {
      console.error(err);
  }
}

init();

async function matchUser(username, password, level) {

  await db.get(
    "SELECT username, password, level FROM Users WHERE username = ? AND password = ?",
    [username, password, level]
  );

  return user;
}

module.exports = { matchUser };
