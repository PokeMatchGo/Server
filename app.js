if (process.env.NODE_ENV === 'development'){ require('dotenv').config() }
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middlewares/errorHandler')
// const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000
const pokemon = require('./routes/pokemon')

require('./config/mongoose')
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use('/', routes)
app.use(errorHandler)

app.listen(port, (_=>{ console.log(`listen to port`, port)}))