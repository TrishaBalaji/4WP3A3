const express = require('express');
var router = express.Router()
const ArticlesModel = require('../models/articles.js')
const UsersModel = require('../models/users.js')

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

//attempts to login a user
//added table matching function to login route
//resolved login error, it redirects to members and editors pages now
router.post("/attemptlogin", async function(req, res) 
  {
      console.log("Login attempt started");
      const username = req.body.username;
      const password = req.body.password;
      try {
        const user = await UsersModel.matchUser(username, password);

        if(user) {
          req.session.username = user.username;
          if(user.level === "editor") {
            console.log("Redirecting to editors");
            res.redirect("/editors");
          }
          else if(user.level === "member"){
            console.log("Redirecting to members");
            res.redirect("/members");
          }
          else {
            console.log("Invalid login");
            req.session.login_error = "Invalid username and/or password!";
            res.redirect("/login");
          }
        } else {
          console.log("No matching user found");
          req.session.login_error = "Invalid username and/or password!";
          return res.redirect("/login");
        }
      }
      catch(err){
        console.error(err);
        req.session.login_error = "Login error occurred";
        res.redirect("/login");
      }

  }); 

  module.exports = router;
