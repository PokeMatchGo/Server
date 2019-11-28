const router = require('express').Router()
const user = require('./user')
const pokemon = require('./pokemon')

router.get('/user', user)
router.use('/pokemon', pokemon)

export default router