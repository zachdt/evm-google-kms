'use strict'
require('dotenv').config()

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {iamAddMember} = require('./assignUser')
// Instantiates a client
const client = new KeyManagementServiceClient();

// Build the parent key ring name
const keyRingName = client.keyRingPath(process.env.PROJECT_ID, process.env.LOCATION_ID, process.env.KEYRING_ID);

exports.createKey = async(uid, member) =>{
  const [key] = await client.createCryptoKey({
    parent: keyRingName,
    cryptoKeyId: keyId,
    cryptoKey: {
      purpose: 'ENCRYPT_DECRYPT',
      versionTemplate: {
        algorithm: 'GOOGLE_SYMMETRIC_ENCRYPTION',
      },
    },
  })

  console.log(`Created symmetric key: ${key.name}`);
  console.log(`Assinging key to userId: ${uid}`)

  iamAddMember(member, uid)
  return key
}
