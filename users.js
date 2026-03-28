const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const db = require('../initdb.js');

async function matchUser(username, password) {

  return new Promise((resolve, reject) => {

    const sql = `
      SELECT username, password, level
      FROM Users
      WHERE username = ? 
    `;

    db.get(sql, [username], async function(err, row) {

      if(err) {
        reject(err);
      } else {
        resolve(row); // returns user if found, undefined if not
      }

      try {
        const passwordMatches = await bcrypt.compare(password, row.password);

        if(!passwordMatches) {
            return resolve(undefined);
        }
        resolve ({
          username: row.username,
          level: row.level
        });
      }
      catch (compareErr) {
        reject(compareErr);
      }


    });

  });

}

module.exports = {
  matchUser
};
