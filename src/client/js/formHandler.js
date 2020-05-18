import { isDateValid, getTripDuration } from './dateUtils.js'
function handleSubmit(event) {
   let cityName = document.getElementById('city-name').value;

   // let params = {city: JSON.stringify({ cityName })};
   // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
   let departDate = document.getElementById('depart-date').value;
   let returnDate = document.getElementById('return-date').value;
   if ( isDateValid(departDate) ) {
     let withinWeek = false;
     if (getTripDuration(departDate, returnDate) <= 7) {
       withinWeek = true;
     }
     let departureDateObj = new Date(Date.parse(departDate));
     let returnDateObj = new Date(Date.parse(returnDate));
     let departureFormatted = (departureDateObj.getFullYear()-1) + "-" + (departureDateObj.getMonth()+1) + "-" + departureDateObj.getDate();
     let oneDayLater = (departureDateObj.getFullYear()-1) + "-" + (departureDateObj.getMonth()+1) + "-" + (departureDateObj.getDate()+1);
     let url = new URL('http://localhost:8081/trip?city=' + cityName + '&withinWeek=' + withinWeek + '&departure=' + departureFormatted + '&dayAfter=' + oneDayLater);
     fetch(url)
       .then(res => res.json())
       .then(function(res) {
       })
   }



}

export { handleSubmit }
