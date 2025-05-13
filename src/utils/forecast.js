const request = require("postman-request");

const weatherCheck = (latitude, longitude, callback) => {
  let url = `https://api.weatherapi.com/v1//current.json?key=00ff175660c440b38c8124022242007&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the Weather Service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const body = response.body;
      callback(undefined, {
        name: body.location.name,
        region: body.location.region,
        country: body.location.country,
        last_updated: body.current.last_updated,
        temp_c: body.current.temp_c,
        feelslike_c: body.current.feelslike_c,
        condition: body.current.condition.text,
        latitude: body.location.lat,
        longitude: body.location.lon,
      });
    }
  });
};

module.exports = weatherCheck;
