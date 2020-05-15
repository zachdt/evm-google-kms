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
  // Lists key rings
  const path = client.locationPath(process.env.PROJECT_ID, process.env.LOCATION_ID, process.env.KEYRING_ID);
  const [keys] = await client.listCryptoKeys(path);

  if (keys.length >= 10) throw 'too many keys'
  // Display the results
  if (keys.length) {
    console.log('Searching current keys...');
    keys.forEach(key => {
      if (key.name === userid ) {
        return key
      }
    });

    createKey(userid, member).then(key => { return key })
  } else {
    console.log('No key rings found, generating key...')
    createKey(userid, member).then(key => { return key })
  }
}