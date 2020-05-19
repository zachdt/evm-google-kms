const {OAuth2Client} = require('google-auth-library')

const client = new OAuth2Client(process.env.CLIENT_ID)


exports.verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  })

  const payload = ticket.getPayload().catch(err => {throw 'No ticket'})


  const userid = payload['sub']
  console.log(`Verified user ${userid}`)
  
  return payload
}