const express = require("express");
const router = express.Router();
const book = require("../Controllers/bookController");
// GET home page.
router.get("/", book.index);
module.exports = router;
