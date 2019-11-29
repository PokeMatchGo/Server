const router = require('express').Router()
const user = require('./user')
const pokemon = require('./pokemon')
const address = require('./address')

router.use('/user', user)
router.use('/pokemon', pokemon)
router.use('/address', address)

module.exports = router