//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const amazonSchema = new Schema({
  amazonId: {
    type: String,
    required: [true, "Please add an amazon ID"],
    unique: true,
    trim: true,
    maxlength: [100, "Amazon ID must be less than 100 characters"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    type: {
      type: String, // Don't do  `{location: {type: String}}`
      enum: ["Point"], // 'location.type' must be 'Point'
      //   required: true,
    },
    coordinates: {
      type: [Number],
      //   required: true,
      index: "2dsphere",
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Amazon = mongoose.model("Amazon", amazonSchema);

//Export function to create "SomeModel" model class
module.exports = Amazon;
