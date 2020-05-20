import { isInputValid, calculateDaysFromNow, calculateTripLength } from './inputUtils.js'

let handleSubmit = (event) => {
   // Get the values from the UI
   let cityName = document.getElementById('city-name').value;
   let departDate = document.getElementById('depart-date').value;
   let returnDate = document.getElementById('return-date').value;

   if ( isInputValid(departDate) && isInputValid(returnDate) && isInputValid(cityName) ) {
     let withinWeek = false;
     let daysFromNow = calculateDaysFromNow(departDate);
     if (daysFromNow <= 7) {
       withinWeek = true;
     }

     let tripLength = calculateTripLength(departDate, returnDate);

     // Utilize the departure date to calculate the next day's date
     // We need this to get info from weatherbit
     let departureDateObj = new Date(Date.parse(departDate));
     let nextDateObj = new Date(departureDateObj);
     nextDateObj.setDate(nextDateObj.getDate() + 1);

     // Format the days for use with Weatherbit
     let departureFormatted = (departureDateObj.getFullYear()-1) + "-" + (departureDateObj.getMonth()+1) + "-" + departureDateObj.getDate();
     let oneDayLater = (nextDateObj.getFullYear()-1) + "-" + (nextDateObj.getMonth()+1) + "-" + nextDateObj.getDate();

     //Build the URL and params to be passed to GET /trip
     let url = new URL('http://localhost:8081/trip?city=' + cityName + '&withinWeek=' + withinWeek + '&departure=' + departureFormatted + '&dayAfter=' + oneDayLater);
     fetch(url)
       .then(res => {
         return res.json()
          .then((data) => {
            // Initialize the data to be displayed in the UI
            data.daysFromNow = daysFromNow;
            data.withinWeek = withinWeek;
            data.cityName = cityName;
            data.tripLength = tripLength;

            if (data.image == null) {
              // If we were unable to retrieve a photo for our location, do another search of the country
              let getPhotoURL = new URL('http://localhost:8081/altPhoto?countryCode=' + data.country_code);
              fetch(getPhotoURL)
                .then(res => {
                  return res.json()
                    .then((stockPhotoData) => {
                        // Set the photo and update the UI
                        data.image = stockPhotoData.image;
                        updateUI(data);
                    })
                }) // End of getting alt-photo fetch
            } else {
              // If in this block, we have everything we need to update our UI
              updateUI(data);
            }
          })
       })
   } else {
     alert("Please ensure you fill in all three fields.");
   }
}

let updateUI = (data) => {
   document.getElementById('app').style.display = 'none';
   document.getElementById('destination-image').src = data.image;
   document.getElementById('destination-description').innerHTML = `Your trip to ${data.cityName}:`;
   document.getElementById('trip-countdown').innerHTML = `..is in ${data.daysFromNow} day(s)`;
   document.getElementById('trip-length').innerHTML = `..will last ${data.tripLength} day(s)`;
   if (data.withinWeek) {
     document.getElementById('destination-temp').innerHTML = `The temperature is currently ${data.temperature}°`;
   } else {
     document.getElementById('destination-temp').innerHTML = `The temperature is typically ${data.temperature}°`;
   }
}

export { handleSubmit }
