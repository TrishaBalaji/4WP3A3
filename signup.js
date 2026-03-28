const express = require('express');
const router = express.Router();
const db = require('../initdb.js');

//access signup page 
router.get("/", (req, res) => {
    req.TPL.error = null;
    req.TPL.success = null;
    res.render("signup", req.TPL);
});

router.post("/", (req, res) => {
    const { username, password } = req.body;

    req.TPL.error = null;
    req.TPL.success = null;

    // Validation
    if (!username || !password || username.length < 6 || password.length < 6) {
        req.TPL.error = "Username/password cannot be less than 6 characters in length!";
        return res.render("signup", req.TPL);
    }
    
    //insert new user into database
    db.run(
        "INSERT INTO Users VALUES (?,?,?)",
        [username, password, "member"],
        function(err) {
            if (err) {
                req.TPL.error = "Error creating account.";
                return res.render("signup", req.TPL);
            }

            req.TPL.success = true;
            return res.render("signup", req.TPL);
        }
    );
  });
module.exports = router; 
