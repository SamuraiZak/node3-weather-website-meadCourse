const request = require("postman-request");
const geocode = (address, callback) => {
  const url = `https://us1.locationiq.com/v1/search?key=pk.97bd7577951b209061d4c6be67559157&format=json&q=${encodeURIComponent(
    address,
  )}&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to LocationIq", undefined);
    } else if (response.body.error) {
      callback("Unable to find a location, try another search", undefined);
    } else {
      callback(undefined, {
        location: response.body[0].display_name,
        latitude: response.body[0].lat,
        longitude: response.body[0].lon,
      });
    }
  });
};

module.exports = geocode;
