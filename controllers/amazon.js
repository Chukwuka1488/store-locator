const Amazon = require("../models/Amazon");

// @desc Get all amazon forest data
// @route GET /api/v1/amazon
// @access Public
exports.getAmazon = async (req, res, next) => {
  try {
    const amazonData = await Amazon.find();

    return res.status(200).json({
      success: true,
      count: amazonData.length,
      data: amazonData,
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
    const amazonData = await Amazon.create(req.body);

    return res.status(200).json({
      success: true,
      data: amazonData,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "This amazon already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};
