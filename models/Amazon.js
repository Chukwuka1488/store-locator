//Require Mongoose
const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

//Define a schema
const Schema = mongoose.Schema;

const amazonSchema = new Schema({
  amazonId: {
    type: String,
    required: [true, "Please add an amazon ID"],
    unique: true,
    trim: true,
    maxlength: [10, "Amazon ID must be less than 100 characters"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
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

// to create a piece of mongoose middleware
// Geocode and create location
amazonSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  }; // format it as a point on the map

  // Do not save address
  this.address = undefined;
  next();
});

const Amazon = mongoose.model("Amazon", amazonSchema);

//Export function to create "SomeModel" model class
module.exports = Amazon;
