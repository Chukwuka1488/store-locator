const express = require("express");
const { getAmazons, addAmazon } = require("../controllers/amazons");

const router = express.Router();

// get a location in the amazon forest

router.route("/").get(getAmazons).post(addAmazon);

module.exports = router;
