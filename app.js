const express = require("express") // On appelle express
const app = express()
const axios = require("axios") // On appelle axios
const bodyParser = require('body-parser');

// Middleware
app.set("view engine", "ejs")
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Constantes
API_KEY = "APetT84BNRPwmHtw"
API_SECRET = "5klcbi9ORwzWGIbgyqJrzO3nFTU2BnzH"

var stateForm = {
    list:{
        countries:"",
        teams:""
    },
    select:{
        team: ""
    }
}

var random = {
    select:{
        team: ""
    }
}

app.get("/", function (req, res){   // quand je suis a la racine j'exécute la fonction
    getCountries().then( res2 => {
        stateForm.list.countries = res2.data.data.country
        res.render("index", {stateForm: stateForm})
    })
})

app.post("/teams",function(req, res){
    let countryID = req.body.country
    getTeams(countryID).then(response => {
        stateForm.list.teams = response.data.data.teams
        res.render("team", {stateForm: stateForm})
    })
})

app.post("/match", function(req, res){
    stateForm.select.team = req.body.team
    getRandomTeam().then(response => {
        random.select.team = response.data.data.team // la
        res.render("match", {stateForm: stateForm, random: random})
    })
})
 
async function getCountries(){
    const listCountries = await axios.get(`http://livescore-api.com/api-client/countries/list.json?key=APetT84BNRPwmHtw&secret=5klcbi9ORwzWGIbgyqJrzO3nFTU2BnzH`)
    return listCountries
}
async function getTeams(countryID){
    const listeTeams = await axios.get(`http://livescore-api.com/api-client/teams/list.json?key=APetT84BNRPwmHtw&secret=5klcbi9ORwzWGIbgyqJrzO3nFTU2BnzH&country_id=${countryID}`)
    return listeTeams
}

async function getRandomTeam(){
    const allTeam = await axios.get(`http://livescore-api.com/api-client/teams/list.json?key=APetT84BNRPwmHtw&secret=5klcbi9ORwzWGIbgyqJrzO3nFTU2BnzH`)
    aleatoireNb();
    return allTeam[unNombre]; // et la
}

async function aleatoireNb() {
    unNombre = (Math.floor((5818)*Math.random()+1));
    return unNombre
    }
    
// app.post("/country", function(req, res){
//     let countryFromID = req.body.country
//     let listeTeams = getTeams(countryFromID)
//         .then(response => {
//             stateForm.list.teams = response.data.data.teams
//             res.render("team", {stateForm: stateForm})
//         })
// })
// app.post("/league", function(req, res){
//     let leagueFromID = req.body.country
//     // console.log(leagueFromID)
// })



app.listen(3000)