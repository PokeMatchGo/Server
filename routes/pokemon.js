const routes = require('express').Router()
const axios = require('axios')
require('dotenv').config()

routes.get('/random',(req,res,next)=>{
  // console.log('ini rapid key', process.env.RAPID_KEY);
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
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = routes