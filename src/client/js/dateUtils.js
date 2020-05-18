
let isDateValid = (date) => {
  if (date.length == 0) {
    return false;
  }
  return true;
}

let getTripDuration = (arrival) => {
  let arrivalDate = new Date(Date.parse(arrival));
  let now = new Date(Date.now());
  return (arrivalDate.getTime() - now.getTime()) / (1000 * 3600 *24);
}

export { isDateValid, getTripDuration }
