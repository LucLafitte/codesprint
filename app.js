const express = require("express") // On appelle express
const app = express()
const axios = require("axios") // On appelle axios
const bodyParser = require('body-parser');

app.set("view engine", "ejs")
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

API_KEY = "APetT84BNRPwmHtw"
API_SECRET = "5klcbi9ORwzWGIbgyqJrzO3nFTU2BnzH"

app.get("/", function (req, res){   // quand je suis a la racine j'exécute la fonction
    axios.get(`http://livescore-api.com/api-client/countries/list.json?key=${API_KEY}&secret=${API_SECRET}`) // .get qui va avoir besoin de l'url
    .then(response => { //affichage de la réponse qui nous est transmise
        var listePays = response.data.data.country   
        // console.log(listePays)
        res.render("index", {countries: listePays})
    })
    // res.render("index", { pokemon: pokemonFaker }) // il détecte automatiqueent le ejs
}) 

app.post("/country", function(req, res){
    let countryFromID = req.body.country
    axios.get(`http://livescore-api.com/api-client/leagues/list.json?key=${API_KEY}&secret=${API_SECRET}/&country=${countryFromID}`)
    .then(response => {
        var listeClubs = response.data.data.league
        res.render("index", {clubs: listeClubs})
    })
})

app.get("/contact", function (req, res){   // quand je suis a la racine j'exécute la fonction
    res.render("pages/contact")
}) 

app.listen(3000)