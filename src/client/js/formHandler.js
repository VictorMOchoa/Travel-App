function handleSubmit(event) {
   let cityName = document.getElementById('city-name').value;
   console.log(cityName);
   fetch('http://localhost:8081/trip',
   {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ cityName })
   })
   .then(res => res.json())
   .then(function(res) {
   })

}

export { handleSubmit }
