const yargs = require("yargs");

const geocode = require("./geocode/geocode.js");
const weather = require("./weather/weather.js");
const myGoogleAPIKey = "YOUR-GOOGLE-API-KEY"; //FILL THIS WITH YOUR OWN OR IT WILL NOT WORK.Go to google play developer console for geocode API
const myForecastIOKey = "72ae25e20a422f19ec9a6f4b17157976"; //You can also change this.Since it is free i am sharing this
const argv = yargs
  .options({
    a:{
      demand: true,
      alias: "address",
      describe: "Address to fetch for weather",
      string: true
    }})
  .help()
  .alias("help","h")
  .argv;

geocode.geocodeAddress(myGoogleAPIKey , argv.address , (errorMessage,geocodeResults) => {
  if(errorMessage){
    console.log(errorMessage);
    console.log("saddsda");
  }
  else{
    console.log("\n" + geocodeResults.address);
    weather.fetchWeather(myForecastIOKey, geocodeResults.latitude, geocodeResults.longitude ,(errorMessage,weatherResults) =>{
      if(errorMessage){
        console.log(errorMessage);
      }
      else{
        console.log("Summary: " + weatherResults.summary);
        console.log("Temperature: " + weatherResults.temperature + "°C");
        console.log("Apparent Temperature: " + weatherResults.apparentTemperature + "°C" + "\n");
      }
    });
  }
});
