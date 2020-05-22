let isInputValid = (userInput) => {
  var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  return (userInput != null && 0 != userInput.trim().length);
}

let isDateValid = (userInput) => {
  var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  return pattern.test(userInput);
}

let calculateDaysFromNow = (arrival) => {
  let arrivalDate = new Date(Date.parse(arrival));
  let now = new Date(Date.now());
  return parseInt( (arrivalDate.getTime() - now.getTime()) / (1000 * 3600 *24) );
}

let calculateTripLength = (departure, arrival) => {
  let departureDate = new Date(Date.parse(departure));
  let returnDate = new Date(Date.parse(arrival));
  return (returnDate.getTime() - departureDate.getTime()) / (1000 * 3600 *24);
}

export { isInputValid, isDateValid, calculateDaysFromNow, calculateTripLength }
