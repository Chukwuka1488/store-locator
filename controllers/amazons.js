const Amazon = require("../models/Amazon");

// @desc Get all amazon forest data
// @route GET /api/v1/amazon
// @access Public
exports.getAmazons = async (req, res, next) => {
  try {
    const amazons = await Amazon.find();

    return res.status(200).json({
      success: true,
      count: amazons.length,
      data: amazons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Create an amazon data
// @route POST /api/v1/amazon
// @access Public
exports.addAmazon = async (req, res, next) => {
  try {
    const amazon = await Amazon.create(req.body);

    return res.status(200).json({
      success: true,
      data: amazon,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "This amazon already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};
