const express = require("express");
const { getAmazon } = require("../controllers/amazon");

const router = express.Router();

// get a location in the amazon forest

router.route("/").get(getAmazon);

module.exports = router;
