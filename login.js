const express = require('express');
var router = express.Router()
const ArticlesModel = require('../models/articles.js')

// Displays the login page
router.get("/", async function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // render the login page
  res.render("login", req.TPL);
});

// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", async function(req, res)
{
  delete(req.session.username);
  res.redirect("/home");
});

//added table matching function to login route 
router.post("/attemptlogin", async function(req, res)
  {
      const username = req.body.username;
      const password = req.body.password;

      const user = await ArticlesModel.matchUsers(username, password);

      if(!user) {
        res.render("login", {
          error: "Invalid username or password!"
      });
      return;
    }

    req.session.user = user;

    if (user.level == "editor") {
      res.redirect("/editors");
    } 
    else {
      res.redirect("/members");
    }

  });

module.exports = router;

//fixed TypeError - didn't have 'module.exports = router' in my local file 
