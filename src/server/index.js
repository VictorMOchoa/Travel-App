const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.static('dist'))




console.log(__dirname)

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/trip', (req, res) => {
    let city = req.query.city;
    getGeoNamesLocationData(city)
    .then(response => getDarkSkyWeatherData(response))
    .then(a => res.send(a))
    .catch(error => {
      console.log('an erorr at trip level')
      console.error(error);
    });
    //   .then(locationInfo => getDarkSkyWeatherData(locationInfo))
});

function getGeoNamesLocationData(city) {
  const baseURL = `http://api.geonames.org/postalCodeSearchJSON?placename=${city}`;
  const auth = `&username=${process.env.GEO_NAMES_USERNAME}`;

  return axios.get(baseURL + auth)
    .then(response => response.data.postalCodes[0]);
}

let getDarkSkyWeatherData = (locationInfo) => {
  console.log("in dark sky data")
  console.log(locationInfo);
  const darkSkyURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/37.8267,-122.4233`
  //DARK_SKY_API_KEY
  // return axios.get(baseURL + auth)
  //   .then(response => response.data.postalCodes[0]);
}

function errorOut() {

}
