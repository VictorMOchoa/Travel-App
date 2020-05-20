let isInputValid = (userInput) => {
  return (userInput != null && 0 != userInput.trim().length);
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

export { isInputValid, calculateDaysFromNow, calculateTripLength }
