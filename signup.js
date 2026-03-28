const express = require('express');
const router = express.Router();
const db = require('../initdb.js');
const bcrypt = require("bcrypt");

//access signup page 
router.get("/", (req, res) => {
    req.TPL.error = null;
    req.TPL.success = null;
    res.render("signup", req.TPL);
});

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    req.TPL.error = null;
    req.TPL.success = null;

    if (!username || !password || username.length < 6 || password.length < 6) {
        req.TPL.error = "Username/password cannot be less than 6 characters in length!";
        return res.render("signup", req.TPL);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
        "INSERT INTO Users VALUES (?,?,?)",
        [username, hashedPassword, "member"],
        function(err) {
            if (err) {
                req.TPL.error = "Error creating account.";
                return res.render("signup", req.TPL);
            }

            req.TPL.success = "User account created!";
            return res.render("signup", req.TPL);
        }
    );
} catch (err) {
    console.error(err);
    req.TPL.error = "Error creating account.";
    return res.render("signup", req.TPL);
}
    });

module.exports = router; 
