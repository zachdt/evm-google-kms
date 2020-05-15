const express = require('express')
const {OAuth2Client} = require('google-auth-library')
const bodyParser = require('body-parser')
const {getWallet} = require('./getWallet/getWallet')

require('dotenv').config()

const app = express()
const client = new OAuth2Client(process.env.CLIENT_ID)
app.use(bodyParser.json())

const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  })

  const payload = ticket.getPayload()


  const userid = payload['sub']
  console.log(`Verified user ${userid}`)
  
  return payload
}


app.post('/evm-google-kms/getwallet/', (req, res) => {
  if (!req.body) {
    return res.json({error: 'No credentials... sorry'})
  } else {
    verify(req.body.id_token).then((payload) => {
      getWallet(payload)
        .then(wallet => res.send(wallet))
        .catch(err => console.log(err))
    }).catch(console.error)
  }
})


const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`---> kaleido-google-kms started on port ${port}`)
})