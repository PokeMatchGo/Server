const routes = require('express').Router()
const axios = require('axios')

routes.get('/random',(req,res,next)=>{
    let pokemon = {}
    axios({
        method: 'get',
        url: 'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json',
        headers:{
          'x-rapidapi-host' : 'pokemon-go1.p.rapidapi.com',
          'x-rapidapi-key' : '754fed58femsh983b495aea7e092p16ed9cjsnd63754ca82d6'
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