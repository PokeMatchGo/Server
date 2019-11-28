const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const axios = require('../config/axios')

class ControllerUser {
  static register(req, res, next) {
    const { name, email, password } = req.body
    User
      .create({ name, email, password })
      .then(user => {
        const payload = { id: user._id, name, email }
        const access_token = generateToken(payload)

        res.status(201).json({
          message: 'Successfully registered!',
          access_token, user
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User
      .findOne({ email })
      .then(user => {
        if (!user) throw {
          name: 'NotFound',
          status: 404,
          message: 'Wrong email/password!',
        }

        if (user.role === 'customer' && !comparePassword(password, user.password)) throw {
          name: 'NotFound',
          status: 404,
          message: 'Wrong email/password!',
        }

        const payload = { id: user._id, name: user.name, email: user.email, role: user.role }
        const access_token = generateToken(payload)

        res.status(200).json({
          message: 'Successfully logged in!',
          access_token, user
        })
      })
      .catch(next)
  }

  static findById(req, res, next) {
    User
      .findById(req.loggedUser.id)
      .then(user => {
        if (!user) throw {
          name: 'NotFound',
          status: 404,
          message: 'Cannot find a user!'
        }
        res.status(200).json({ user })
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    const { googleidtoken } = req.headers
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    let payload, name, email, password, picture

    client
      .verifyIdToken({
        idToken: googleidtoken,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        name = payload.name
        email = payload.email
        password = process.env.DEFAULT_USER_PASSWORD
        picture = payload.picture

        return User
          .findOne({ email })
      })
      .then(user => {
        if (!user) {
          User
            .create({
              name, email, password, picture
            })
            .then(user => {
              const id = user.id
              const payload = { email, id }
              const access_token = generateToken(payload)

              res.status(201).json({
                message: 'Successfully registered!',
                access_token, user
              })
            })
            .catch(next)
        }
        else {
          payload = {
            email: payload.email,
            id: user.id
          }
          const access_token = generateToken(payload)

          res.status(200).json({
            message: 'Successfully logged in!',
            access_token, user
          })
        }
      })
      .catch(next)
  }

  // VVV ROUTES YG PERLU DIKERJAIN VVV

  static acquireRandomCard(req, res, next) {
    axios({
      method: 'get',
      url: '/pokemon/random'
    })
    .then(({ data }) => {
      return User
        .findByIdAndUpdate(req.loggedUser.id, {
          $addToSet: {
            cards: data
          }
        }, { new: true })
    })
    .then(user => {
      res.json(user)
    })
    .catch(next)
  }

  static fetchAllCards(req, res, next) {
    User
      .findById(req.loggedUser.id)
      .then(({ cards }) => {
        res.status(200).json(cards)
      })
      .catch(next)
  }

  static findBattle(req, res, next) {
    let opponent = {}
    axios({
      method: 'get',
      url: '/address/random'
    })
      .then(({ data }) => {
        opponent = data.opponent
        return axios({
          method: 'get',
          url: '/pokemon/random'
        })
      })
      .then(({ data }) => {
        res.json({ opponent, card: data })
      })
      .catch(next)
  }
}

module.exports = ControllerUser