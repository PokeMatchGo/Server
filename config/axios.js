const axios = require('axios')

const poke = axios.create({
    baseURL : 'test',
    headers : {
        Authorization : `token ${process.env.GITHUB_TOKEN}`,
        Accept : process.env.GITHUB_ACCEPT
    }
})