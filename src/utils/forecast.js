const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=cd66b7d08bd8ec83a4a3d8fb86028039&query=" +
    latitude +
    ",%20" +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather server!!", undefined);
    } else if (body.error) {
      callback("Unable to find location!!", undefined);
    } else {
      callback(
        undefined,
        "It is " +
          body.current.weather_descriptions[0] +
          " and " +
          body.current.temperature +
          " degress out and feels like " +
          body.current.feelslike +
          " degress out."
      );
    }
  });
};

module.exports = forecast;
