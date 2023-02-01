const request = require("request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=e8bac9a32a0a2bfdc04aa932233c1f1b&query=" +
    encodeURIComponent(address);
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback(
        "Unable to connect to location services: " +
          body.error.context.query.message,
        undefined
      );
    } else if (body.data.length === 0) {
      callback("Location invalid.", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].locality,
      });
    }
  });
};
module.exports = { geocode: geocode };
