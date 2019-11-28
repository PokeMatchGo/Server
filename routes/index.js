const router = require('express').Router()
const address = require('./address')

// router.get('/user', users)

router.use('/address', address)

module.exports = router