const router = require('express').Router()
const ControllerUser = require('../controllers/user')
const authenticate = require('../middlewares/authenticate')

router.post('/register', ControllerUser.register)

router.post('/login', ControllerUser.login)

router.post('/googleSignIn', ControllerUser.googleSignIn)

// VVV ROUTES YG PERLU DIKERJAIN VVV
router.get('/cards/acquire', authenticate, ControllerUser.acquireRandomCard)

router.get('/cards', authenticate, ControllerUser.fetchAllCards)

router.get('/battle', authenticate, ControllerUser.findBattle)

module.exports = router