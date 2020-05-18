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
    let getCurrentForecast = req.query.withinWeek == 'true';
    let departureDate = req.query.departure;
    let dayAfter = req.query.dayAfter;
    getGeoNamesLocationData(city)
      .then(response => getForecast(response, getCurrentForecast, departureDate, dayAfter))
      .then(a => res.send(a))
      .catch(error => {
        console.error(error);
      });
});

let getGeoNamesLocationData = (city) => {
  const baseURL = `http://api.geonames.org/postalCodeSearchJSON?placename=${city}`;
  const auth = `&username=${process.env.GEO_NAMES_USERNAME}`;

  return axios.get(baseURL + auth)
    .then(response => response.data.postalCodes[0]);
}

let getForecast = (locationInfo, getCurrentForecast, departureDate, dayAfter) => {
  const baseURL = `http://api.weatherbit.io/v2.0/`;
  let params = '';

  if (getCurrentForecast) {
    params = `current?key=${process.env.WEATHERBIT_API_KEY}&lat=${locationInfo.lat}&lon=${locationInfo.lng}`;
  } else {
    params = `history/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${locationInfo.lat}&lon=${locationInfo.lng}&start_date=${departureDate}&end_date=${dayAfter}`;
  }

  return axios.get(baseURL + params)
    .then(response => {
      console.log(response.data)
            console.log(response.data.data[0])
    });
}
