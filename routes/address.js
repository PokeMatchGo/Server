const routes = require('express').Router()
const randomController = require('../controllers/address')

routes.get('/random', randomController.randomize)

module.exports = routes