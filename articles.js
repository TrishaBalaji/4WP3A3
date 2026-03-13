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

// Return all of the articles
async function getAllArticles()
{
  let results = await db.all("SELECT * FROM Articles");
  return results;
}

// Create a new article given a title, content and username
async function createArticle(article,username)
{
  await db.run("INSERT INTO Articles VALUES (?,?,?)",
         [article.title, username, article.content]);
}

//check table for matching username and password
async function matchUsers(username, password)
{
  let result = await db.get("SELECT username, password FROM Users WHERE username = ? AND password = ?", 
    [username, password]
  );
  return result;
}

module.exports = {getAllArticles
                 ,createArticle
                 ,matchUsers};
