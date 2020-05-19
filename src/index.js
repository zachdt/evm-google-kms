const express = require('express')
const {getWallet, walletCount} = require('./kms/getWallet')
const {signTrasaction} = require('./signatory/signTrasaction')

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const uuid = require('uuid')

const bodyparser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const app = express()
const session = require('express-session')

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)// use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

app.use(cors())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Credentials", "true")
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
       res.send(200);
   } else {
       next();
   }
  });

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())


app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/wallet/',
  },
  function(request, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
))

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('http://localhost:3000/login');
}

app.get('/login',(req, res, next) => {
  // Save the url of the user's current page so the app can redirect back to it after authorization
// Start OAuth 2 flow using Passport.js

},
passport.authenticate('google', { scope: ['email', 'profile'] })
);


app.get('/api/wallet/', ensureAuthenticated, (req, res) => {
    console.log('Getting wallet...')
    console.log(req.user)
    getWallet(req.user)
      .then(key => res.send('new user: ' + key))
      .catch(err => {
        if (err == 'existing') {
          res.send('welcome back user ' + payload['sub'])
        }
      })
    console.log('/wallet trigger')
    res.json({ "user": req.user})
})

app.get('/api/walletcount/', (req, res) => {
  console.log('Getting wallet count...')
  signTrasaction('')
  walletCount().then(count => {
    console.log(count)
    res.json({"count": count})
  }).catch(console.error)
})



const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`---> evm-google-kms started on port ${port}`)
})