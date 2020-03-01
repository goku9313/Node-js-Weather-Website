const request = require("request");

const forecast = (lon, lat, callback) => {
  const url =
    "https://api.darksky.net/forecast/d780a383ad4dec3b71e0542944d9bfb6/" +
    encodeURIComponent(lon) +
    "," +
    encodeURIComponent(lat) +
    "?units=si";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to find location!", undefined);
    } else if (body.error) {
      callback(
        "Unable to search for location. Try another location",
        undefined
      );
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is " +
          body.currently.temperature +
          " degree celcius temperature and There are " +
          body.currently.precipProbability +
          " % chances of rain!"
      );
    }
  });
};

module.exports = forecast;
