const express = require('express')
const {OAuth2Client} = require('google-auth-library')

require('dotenv').config()

const app = express()
const client = new OAuth2Client(process.env.CLIENT_ID)

const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  })

  const payload = ticket.getPayload()
  const userid = payload['sub']
  return userid
}


app.get('/evm-google-kms/getwallet/', (req, res) => {
  if (!req.body.id_token) {
    return res.json({error: 'No credentials... sorry'})
  } else {
    verify(req.body.id_token).then((uid) => {
      console.log(`Verified user ${uid}`)
      res.json({userID: uid})
    }).catch(console.error)
  }
})


const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`---> kaleido-google-kms started on port ${port}`)
})