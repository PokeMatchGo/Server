const router = require('express').Router()
const ControllerUser = require('../controllers/user')
const authenticate = require('../middlewares/authenticate')

router.post('/register', ControllerUser.register)

router.post('/login', ControllerUser.login)

router.post('/googleSignIn', ControllerUser.googleSignIn)

// VVV ROUTES YG PERLU DIKERJAIN VVV

router.get('/cards/random', authenticate, ControllerUser.getRandomCard)

router.get('/cards', authenticate, ControllerUser.fetchAllCards)

router.get('/cards/:id/find-battle', authenticate, ControllerUser.findBattle)

module.exports = router