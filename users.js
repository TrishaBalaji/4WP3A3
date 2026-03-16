const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const db = require('../initdb.js');

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

async function matchUser(username, password) {

  return new Promise((resolve, reject) => {

    const sql = `
      SELECT username, level
      FROM Users
      WHERE username = ? AND password = ?
    `;

    db.get(sql, [username, password], function(err, row) {

      if(err) {
        reject(err);
      } else {
        resolve(row); // returns user if found, undefined if not
      }

    });

  });

}

module.exports = {
  matchUser
};
