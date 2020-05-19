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
      .then(weatherData => getPhoto(city, weatherData))
      .then(returnObj => {
        res.send(returnObj)
      })
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
    .then(response => response.data);
}

 let getPhoto = (city, weatherData) => {
  const baseURL = `https://pixabay.com/api/?`;
  const params = `key=${process.env.PIXABAY_API_KEY}&q=${city}&image_type=photo&safesearch=true`;

  return axios.get(baseURL + params)
    .then(response =>
      {
      let imageURL = null;
      let numOfHits = response.data.hits.length;
      if (numOfHits != 0) {
        imageURL = response.data.hits[0].webformatURL;
      }
      return constructObjectForUI(imageURL, weatherData);
    }
  );
}

let constructObjectForUI = (imageURL, weatherData) => {
  let obj = {
    "image": imageURL,
    "country_code": weatherData.country_code,
    "temperature": ((weatherData.data[0].temp * (9/5)) + 32).toFixed(1)
  };
  return obj;
}

app.get('/altPhoto', (req, res) => {
    let country = req.query.countryCode;
    getCountryPhoto(country)
      .then(response => {
        res.send(response);
      })
      .catch(error => {
        console.error(error);
      });
});

let getCountryPhoto = (country) => {
  const baseURL = `https://pixabay.com/api/?`;
  let retryURL = baseURL + `key=${process.env.PIXABAY_API_KEY}&q=${country} country&image_type=photo&safesearch=true`;
  return axios.get(retryURL)
    .then(response => {
      let obj = {
        "image": response.data.hits[0].webformatURL
      };
      return obj;
    });
}
