'use strict'

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {createKey} = require('./createKey')
// Instantiates a client
require('dotenv').config()

const client = new KeyManagementServiceClient();

// Build the parent key ring name
exports.getWallet = async(payload) => {
  const userid = payload['sub']
  const member = 'user:' + payload['email']

  console.log('Getting available wallets...')
  // Lists key rings
  const path = client.keyRingPath(process.env.PROJECT_ID, process.env.LOCATION_ID, process.env.KEYRING_ID);
  console.log(path)
  const [keys] = await client.listCryptoKeys({parent: path});
  console.log('Found keyring: ', process.env.KEYRING_ID)

  if (keys.length >= 100) throw 'Too many keys!'
  // Display the results
  if (keys.length) {
    console.log('Searching current keys...');
    let targetPath = path + '/cryptoKeys/' + userid
    keys.forEach(key => {
      console.log(key.name)
      if (key.name == targetPath ) {
        console.log('Found match... for key: ', key.name)
        throw 'existing'
      }
    })

    console.log('No key match, generating key...')
    createKey(userid, member).then(key => { return key })
  } else {
    console.log('No keys found, generating key...')
    createKey(userid, member).then(key => { return key })
  }
}

exports.walletCount = async() => {
  console.log('Reading key ring...')
  const path = client.keyRingPath(process.env.PROJECT_ID, process.env.LOCATION_ID, process.env.KEYRING_ID);
  const [keys] = await client.listCryptoKeys({parent: path});

  console.log('Found keyring: ', process.env.KEYRING_ID)
  let count = keys.length
  return count
}
