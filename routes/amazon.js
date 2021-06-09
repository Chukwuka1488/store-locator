const express = require("express");
const { getAmazon, addAmazon } = require("../controllers/amazon");

const router = express.Router();

// get a location in the amazon forest

router.route("/").get(getAmazon).post(addAmazon);

module.exports = router;
