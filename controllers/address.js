const axios = require('axios')
module.exports = {
    randomize(req,res,next){
        axios({
            method: 'get',
            url: `https://randomapi.com/api/?key=${process.env.RANDOM_API_KEY}&ref=${process.env.RANDOM_API_REF}&fmt=pretty&noinfo`
        })
        .then(({data})=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
}