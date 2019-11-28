const router = require('express').Router()
const user = require('./user')
const pokemon = require('./pokemon')

console.log('masuk index routes');


router.use('/user', user)
router.use('/pokemon', pokemon)

module.exports = router