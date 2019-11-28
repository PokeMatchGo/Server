const User = require('../models/user')
const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
  try {
    const { access_token } = req.headers
    const decoded = verifyToken(access_token, next)

    if (!decoded) {
      throw {
        name: 'Unauthorized',
        status: 401,
        message: 'Unauthorized access!'
      }
    }

    const { payload } = decoded

    User
      .findOne({ email: payload.email })
      .then(user => {
        if (!user) {
          throw {
            name: 'Unauthorized',
            status: 401,
            message: 'Unauthorized access!'
          }
        }

        req.loggedUser = { id: user._id, email: payload.email }
        next()
      })
      .catch(next)
  }
  catch (err) { next(err) }
}