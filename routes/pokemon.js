const routes = require('express').Router()
const axios = require('axios')
require('dotenv').config()

routes.get('/random',(req,res,next)=>{
    let pokemon = {}
    axios({
        method: 'get',
        url: 'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json',
        headers:{
            'x-rapidapi-host' : process.env.RAPID_HOST,
            'x-rapidapi-key' : process.env.RAPID_KEY
        }
    }).then(({data})=>{
        let randomPoke = Math.floor(Math.random() * data.length); 
        pokemon = data[randomPoke]
        return axios({
            method: 'get',
            url: `https://api.pokemontcg.io/v1/cards?name=${pokemon.pokemon_name}`,
        })
    }).then(({data})=>{
        console.log(data.cards[0].imageUrlHiRes)
        pokemon['imageUrl'] = data.cards[1].imageUrlHiRes
        res.status(200).json(pokemon)
    }).catch(next)
})

routes.get('/allCards',(req,res,next)=>{
    axios({
        method : 'get',
        url: 'https://api.pokemontcg.io/v1/cards'
    })
    .then(({ data })=>{
        res.status(200).json(data)
    })
    .catch(next)
})

routes.post('/searchCards',(req,res,next)=>{
    let { name } = req.body
    axios({
        method : 'get',
        url: `https://api.pokemontcg.io/v1/cards?name=${name}`,
    })
    .then(({ data })=>{
        res.status(200).json(data)
    })
    .catch(next)
})

module.exports = routes