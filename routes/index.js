const router = require('express').Router()
const user = require('./user')
const pokemon = require('./pokemon')

router.use('/user', user)
router.use('/pokemon', pokemon)

module.exports = router