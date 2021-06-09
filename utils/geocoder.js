const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODER_PROVIDER,

  // Optional depending of the providers
  httpAdapter: "https", // Default
  apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

//initialize here
const geocoder = NodeGeocoder(options);

// // Using callback
// geocoder.geocode("29 champs elysée paris", function (err, res) {
//   console.log(res);
// });

// // Or using Promise
// geocoder
//   .geocode("29 champs elysée paris")
//   .then(function (res) {
//     console.log(res);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// to be used as a middleware in mongoose 39:30
module.exports = geocoder;
