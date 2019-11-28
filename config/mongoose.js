const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI || `mongodb://localhost:27017/pokematch`

mongoose.connect(mongoUri,{
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : false,
    useUnifiedTopology : true
},(err)=>{ err ? console.log(`connect to mongodb error!`) : console.log(`connect to mongodb successfuly!`) })