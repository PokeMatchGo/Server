const axios = require('axios')
module.exports = {
    randomize(req,res,next){
        axios({
            method: 'get',
            url: `https://randomapi.com/api/?key=${process.env.RANDOM_API_KEY}&ref=${process.env.RANDOM_API_REF}&fmt=pretty&noinfo`
        })
        .then(({data})=>{
            res.status(200).json({
                data,
                state : data.results[0].customer.address.state.split(' ').join('%20')
            })
        })
        .catch(next)
    }
}