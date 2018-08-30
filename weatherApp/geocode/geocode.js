const request = require("request");

var geocodeAddress = (googleAPIkey , address , callback) => {
  request({
    //status code should be 200
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + `&key=${googleAPIkey}`,
    json: true
  }, (error,response,body) => {
    if(error){
      callback("Unable to connect google servers" , null);
    }
    else if(body.status === "ZERO_RESULTS"){
      callback("Unable to find that address" , null);
    }
    else if(body.status === "OK" && response.statusCode === 200){
      callback(null , {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
    else{
      console.log("\nPlease assign your myGoogleAPIKey on app.js\n");
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
