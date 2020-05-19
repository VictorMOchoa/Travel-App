import { isDateValid, getTripDuration } from './dateUtils.js'
function handleSubmit(event) {
   let cityName = document.getElementById('city-name').value;
   let departDate = document.getElementById('depart-date').value;
   let returnDate = document.getElementById('return-date').value;
   if ( isDateValid(departDate) ) {
     let withinWeek = false;
     if (getTripDuration(departDate, returnDate) <= 7) {
       withinWeek = true;
     }
     let departureDateObj = new Date(Date.parse(departDate));
     let nextDateObj = new Date(departureDateObj);
     nextDateObj.setDate(nextDateObj.getDate() + 1);

     let departureFormatted = (departureDateObj.getFullYear()-1) + "-" + (departureDateObj.getMonth()+1) + "-" + departureDateObj.getDate();
     let oneDayLater = (nextDateObj.getFullYear()-1) + "-" + (nextDateObj.getMonth()+1) + "-" + nextDateObj.getDate();
     let url = new URL('http://localhost:8081/trip?city=' + cityName + '&withinWeek=' + withinWeek + '&departure=' + departureFormatted + '&dayAfter=' + oneDayLater);
     fetch(url)
       .then(res => {
         return res.json()
          .then((data) => {
            console.log(data)
            if (data.image == null) {
              console.log(data.image)
              let getPhotoURL = new URL('http://localhost:8081/altPhoto?countryCode=' + data.country_code);
              fetch(getPhotoURL)
                .then( res => { console.log(res.json())})
            }
          })
       })
   }



}

export { handleSubmit }
