
const express = require("express");
const router = express.Router();

const games = require('./games')

router.use("/games", games);

module.exports = router;