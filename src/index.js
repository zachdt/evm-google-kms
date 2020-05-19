const express = require('express')
const {getWallet, walletCount} = require('./signIn/getWallet')


const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const {verify} = require('./verfication')

const bodyparser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

let user = {}

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: 'http:localhost:8080/evm-google-kms/login/'
  },
  function(accessToken, refreshToken, process, cb) {
    user.findOrCrete({ googleId: profile.id }, function (err, user) {
      return cb(err, user)
    })
  }

))

app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));
app.post('/evm-google-kms/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/')

  if (!req.body) {
    return res.json({error: 'No credentials... sorry'})
  } else {
    verify(req.body.id_token).then((payload) => {
      user = payload
      res.send({"isVerfied": true})

      console.log(user)
    }).catch(console.error)
  }
})


app.post('/evm-google-kms/signin/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/')

  if (!req.body) {
    return res.json({error: 'No credentials... sorry'})
  } else {
    verify(req.body.id_token).then((payload) => {
      getWallet(payload)
        .then(key => res.send('new user: ' + key))
        .catch(err => {
          if (err == 'existing') {
            res.send('welcome back user ' + payload['sub'])
          }
        })
    }).catch(console.error)
  }
})

app.get('/evm-google-kms/walletcount/', (req, res) => {
  console.log('Getting wallet count...')
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/')

  walletCount().then(count => {
    console.log(count)
    res.json({"count": count})
  }).catch(console.error)
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`---> evm-google-kms started on port ${port}`)
})