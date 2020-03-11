const express = require("express") // On appelle express
const app = express()
const axios = require("axios") // On appelle axios
const bodyParser = require('body-parser');
//yes   
app.set("view engine", "ejs")
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

API_KEY = "APetT84BNRPwmHtw"
API_SECRET = "5klcbi9ORwzWGIbgyqJrzO3nFTU2BnzH"

var stateForm = {
    list: {
        countries:"",
        leagues:"",
        clubs: ""
    },
    select:{
        country: "",
        league: "",
        club:""
    }
}

app.get("/", function (req, res){   // quand je suis a la racine j'exécute la fonction
    getCountries().then( res2 => {
        stateForm.list.countries = res2.data.data.country
    }).then( () => {
        getLeagues(21).then( res3 => {
            stateForm.list.leagues = res3.data.data.league
        }).then( () => {
            getClubs(21).then( res4 => {
                console.log(res4)
            })
        })
    })
    res.render("index", {stateForm: stateForm})
})

async function getCountries(){
    const listCountries = await axios.get(`http://livescore-api.com/api-client/countries/list.json?key=APetT84BNRPwmHtw&secret=5klcbi9ORwzWGIbgyqJrzO3nFTU2BnzH`)
    return listCountries
}
async function getLeagues(leagueID){
    const listeLeagues = await axios.get(`http://livescore-api.com/api-client/leagues/list.json?key=APetT84BNRPwmHtw&secret=5klcbi9ORwzWGIbgyqJrzO3nFTU2BnzH&country=${leagueID}`)
    return listeLeagues
}
async function getClubs(clubID){
    const listClubs = axios.get(`http://livescore-api.com/api-client/club/list.json?key=APetT84BNRPwmHtw&secret=5klcbi9ORwzWGIbgyqJrzO3nFTU2BnzH&club=${clubID}`)
    return listClubs
}

app.post("/country", function(req, res){
    let countryFromID = req.body.country
    console.log(countryFromID)
})
app.post("/league", function(req, res){
    let leagueFromID = req.body.country
    console.log(leagueFromID)
})
app.post("/club", function(req, res){
    let clubFromID = req.body.country
    console.log(clubFromID)
})

app.listen(3000)