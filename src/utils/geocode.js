const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZ29rdTkzMTMiLCJhIjoiY2s2ajNhbWRvMDU4azNtbzdqOXZ1Y291ayJ9.WapG2DOmNcTdgEr-KNRsJQ";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to internet!", undefined);
    } else if (body.features.length == 0) {
      callback(
        "Unable to search for location. Try another location",
        undefined
      );
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1]
      });
    }
  });
};

module.exports = geocode;
