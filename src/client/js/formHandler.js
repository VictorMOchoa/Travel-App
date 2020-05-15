function handleSubmit(event) {
   let cityName = document.getElementById('city-name').value;
   let url = new URL('http://localhost:8081/trip?city=' + cityName);
   // let params = {city: JSON.stringify({ cityName })};
   // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
   fetch(url)
   .then(res => res.json())
   .then(function(res) {
   })

}

export { handleSubmit }
