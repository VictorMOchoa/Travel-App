const dotenv = require('dotenv');
dotenv.config();

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

app.post('/trip', (req, res) => {
    // const location = req.params.location
    console.log("I'm in the body..")
    console.log(res.body)
    //
    // geonamesAPI(location)
    //     .then(coordenate => Promise.all([darkskyAPI(coordenate), pixabayAPI(location)]))
    //     .then(([temperature, photo]) => ({temperature, photo}) )
    //     .then( a => res.send(a))
    //     .catch(error => {
    //         console.log(error);
    //     });
});
