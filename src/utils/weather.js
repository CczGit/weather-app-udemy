const request = require("request");

const weather = (latitude, longitude, location, callback) => {
  const weatherUrl =
    "http://api.weatherstack.com/current?access_key=be002ce3b1a177280822b5df9ba96267&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url: weatherUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(
        "Unable to reach weather services: " + error + " " + weatherUrl,
        undefined
      );
    } else if (body.success === false) {
      callback(
        "Unable to reach weather services: " +
          body.error.info +
          " " +
          weatherUrl,
        undefined
      );
    } else {
      callback(
        undefined,

        {
          description:
            location +
            " is " +
            body.current.weather_descriptions[0] +
            ". It is currently " +
            body.current.temperature +
            " degrees out and feels like " +
            body.current.feelslike,
          temperature: body.current.temperature,
          feelslike: body.current.feelslike,
        }
      );
    }
  });
};
module.exports = { weather: weather };
