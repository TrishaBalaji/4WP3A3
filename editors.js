const express = require('express');
var router = express.Router()
const editor = require('.app.js'); //error opening file from folder 

// Display the editors page
router.get("/", editor, async function(req, res)
{
  res.render("editors", req.TPL);
});

module.exports = router;
