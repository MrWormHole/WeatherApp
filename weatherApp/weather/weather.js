const request = require("request");

var fetchWeather  = (forecastIOKey,lat,lng,callback) => {
  request({
    url: `https://api.darksky.net/forecast/${forecastIOKey}/${lat},${lng}`,
    json : true
  },(error,response,body) => {
    if(!error && response.statusCode === 200){
      callback(null,{
        summary: body.currently.summary,
        temperature: calculateCelsius(body.currently.temperature),
        apparentTemperature: calculateCelsius(body.currently.apparentTemperature)
      });
    }
    else{
      callback("Unable to connect forecast.io",null);
    }
  });
};

//utility
var calculateCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) / 1.8).toFixed(1);
};

module.exports.fetchWeather = fetchWeather;
